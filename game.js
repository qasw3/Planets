var sketchProc = function(ProcessingInstance){
  with(ProcessingInstance){
    size(600,600);
      
var curLevel = 1;
var blocks = [];
var keys=[];
var R=1000;
var rho = 0.1;
var G=0.001;
var levels=[];
var messages=[];
var levelStart=true;
var cps=0;
var counts=[];
var levelLoad=0;
frameRate(60);
for(var i=0;i<100;i++){
    counts.push(0);
}
var dispCps=0;
var radParticles=[];
function level(r,dens,map){
    this.r=r;
    this.dens=dens;
    this.map=map;
}
function message(r,t,txt){
    this.r=r;
    this.t=t;
    this.txt=txt;
}
message.prototype.draw= function() {
    pushMatrix();
    rotate(this.t+90);
    translate(0,-this.r);
    textAlign(CENTER,CENTER);
    fill(0);
    textSize(10);
    text(this.txt,0,0);
    popMatrix();
};
/**
 * BLOCKS:
 * -1: Spawn
 * 0: Air
 * 1: Ground
 * 2: Fake
 * 3: Sticky Block
 * 4: Radiation Source 1 (low energy)
 * 5: Radiation Source 2 (high energy)
 * 6: Lead
 * 7: Radiation Gun
 * 8: End Cannon
**/

levels.push(new level(200,0.5,[
    [6,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
    [6,6,6,6,6,0,0,0,0,0,0,0,0,0,0,0,1,1],
    [1,6,6,6,1,4,1,1,1,1,1,1,1,0,0,0,0,1],
    [1,1,4,1,1,1,1,1,4,1,1,1,4,1,1,1,1,1,1,1,1,1,1,4,1,1,1,1,1,1,1,1,0,0,0,1],
    [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2],
    [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,6,6,6,1,1,1,1,1,1,1,1,3,3,3,1,1,2],//Surface
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,6,7,0,0,0,0,0,8,0,0,0,0,0,0,4],
    [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [0,1,1,1,1,5,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//Edge of space
    ]));
var l=18;
var d=160;
var m=[];
for(var i=0;i<100;i++){
    if(i===d/20){
        l*=2;
        d*=2;
    }
    m[i]=[];
    for(var j=0;j<l;j++){
        m[i][j]=round(random(0,7));
    }
}
m[m.length-1][m[m.length-1].length-1]=-1;
levels.push(new level(20000,0.0025,m));
    
for(var i=0;i<levels.length;i++){
    messages.push([]);
}
messages[0].push(new message(125, 50, "Welcome to Planets!"));

var bkg;
var loaded = false;
function load(){
pushMatrix();
//scale(600/10000);
background(255,0);
size(6000,6000,0);
for(var i=0;i<1000;i++){
    if(i<500){
        fill(0,(200/2)*i/500+55,200*i/500+55,(i/25));
    }
    else{
        fill(100);
    }
    
    noStroke();
    ellipse(3000,3000,6000-6*i,6000-6*i);
}
bkg=get(0,0,6000,6000);
popMatrix();
size(600,600,0);
loaded=true;
}
background(0);
for(var i=0;i<1000;i++){
    fill(255);
    noStroke();
    var d=random(1,5);
    ellipse(random(0,600),random(0,600),d,d);
}

var space=get(0,0,600,600);
//}
function rdist(n1, n2){
    var num1=n1;
    var num2=n2;
    while(num1>360){
        num1-=360;
    }
    while(num1<0){
        num1+=360;
    }
    while(num2>360){
        num2-=360;
    }
    while(num2<0){
        num2+=360;
    }
    
    if(num1>num2){
        if(num1-num2<180){
        return num1-num2;
        }
        else if(num2-360-num1<180){
            return (num2+360-num1);
        }
    }
    else{
        if(num2-num1<180){
        return num2-num1;
        }
        else if(num1-360-num2<180){
            return (num1+360-num2);
        }
    }
}
function radCounter(cps,x,y,size){
    var t=constrain(cps/2+195,195,345);
    
    strokeWeight(1);
    textFont(createFont("monospace"));
    textAlign(CENTER, CENTER);
    rectMode(CORNER);
    stroke(0);
    fill(150);
    rect(x,y,2*size,3*size);
    fill(255);
    rect(x+0.1*size,y+0.1*size,1.8*size, 1.8*size);

    fill(255, 0, 0);
    arc(x+size,y+size*1.2,size*1.8,size*1.8,320,360);
    fill(0,255, 0);
    arc(x+size,y+size*1.2,size*1.8,size*1.8,180,220);
    fill(255,255, 0);
    arc(x+size,y+size*1.2,size*1.8,size*1.8,220,320);
    
   
    
    fill(255);
    arc(x+size,y+size*1.2,size*1.3,size*1.3,180,360); 
    
    stroke(0);
    strokeWeight(5);
    strokeCap(BEVEL);
    line(x+size,y+size*1.2,x+size+size*0.7*cos(t),y+size*1.2+size*0.7*sin(t));
    strokeWeight(1);
    
    fill(255, 0, 0);
    textSize(size/5);
    text("RadCounter 1000",x+size,y+size*2.1);
    fill(255);
    rect(x+0.1*size,y+1.2*size,1.8*size, 0.7*size);
    fill(0);
    textSize(size/3);
    text(cps+" cps", x+size, y+size*1.6);
    fill(150);
    rect(x+size*0.1,y+size*1.2,size*1.8,size*0.1);
    rectMode(CENTER);
}

rectMode(CENTER);

var player={
    r:1010,
    t:0,
    w:12,
    h:12,
    rs:0,
    ts:0,
    health:100,
    right:true,
    left:true,
    onGround:false,
    canJump:true,
    draw:function(){
        fill(0,255,255);
        stroke(0);
        if(this.ts>0.5/(2*Math.PI/360*(this.r))){
            this.ts-=0.5/(2*Math.PI/360*(this.r));
        }
        else if(this.ts<-0.5/(2*Math.PI/360*(this.r))){
            this.ts+=0.5/(2*Math.PI/360*(this.r));
        }
        else{
            this.ts=0;
        }
        
        pushMatrix();
        rotate(this.t-90);
        translate(0,this.r);
        rect(0,0,this.w, this.h);
        popMatrix();
        
        var g=0;
        if(this.r<=R){
            g=G*4/3*Math.PI*rho*this.r;
        }
        else{
            g=G*4/3*Math.PI*pow(R,3)*rho/pow(this.r,2);
        }
        
        if(this.r<0){
            this.r=-this.r;
            this.t=this.t+180;
            this.rs=-this.rs;
        }
        if(this.t>360){
            this.t-=360;
        }
        if(this.t<0){
            this.t+=360;
        }
        if(!this.onGround){
        this.rs+=g;
        }
        this.r-=this.rs;
        this.t+=this.ts;
        
        
        if(keys[RIGHT]&&this.right){
            this.ts=5/(2*Math.PI/360*(this.r));
        }
        if(keys[LEFT]&&this.left){
            this.ts=-5/(2*Math.PI/360*(this.r));
        }
        if(keys[UP]){
            if(this.onGround&&this.canJump){
            this.rs-=5;
            }
        }
        if(this.health<=0){
            levelStart=true;
        }
    }
};

function gamma(r,t,dir,energy){
    this.r=r;
    this.t=t;
    this.dir=dir;
    this.energy=energy;
}
gamma.prototype.move=function(){
    var x = this.r*cos(this.t);
    var y = this.r*sin(this.t);
    x+=5*cos(this.dir);
    y+=5*sin(this.dir);
    
    this.t=atan(y/x);
    this.r=y/sin(this.t);
    
    var p={
        w:player.w,
        h:player.h,
        x:player.r*cos(player.t),
        y:player.r*sin(player.t),
    };
    
    if(abs(p.x-x)<p.w/2&&abs(p.y-y)<p.h/2){
        player.health-=this.energy;
        cps+=this.energy*100;
        this.energy=0;
        
    }
    if(dist(x,y,p.x,p.y)>600){
        this.energy=0;
    }
    if(this.r<0){
        this.r=-this.r;
        this.t=this.t-180;
        //println(this.r);
    }
    if(this.t<0){
        this.t+=360;
    }
    if(this.t>360){
        this.t-=360;
    }
    
};
function block(r, t, w, h, type) {
    this.r=r;
    this.t=t;
    this.w=w;
    this.h=h;
    this.col=0;
    this.type=type;
    this.solid=true;
    this.attenuation=0.1;
    switch(type){
        case 2:
            this.solid=false;
            this.attenuation=0;
            break;
        case 3:
            this.col=color(155,155,0);
            break;
        case 4:
            this.attenuation=0.15;
            break;
        case 5:
            this.attenuation=0.05;
            break;
        case 6:
            this.attenuation=0.75;
            this.col=50;
            break;
        case 7:
            this.attenuation=0;
            this.col=color(255,255,255,0);
            this.solid=false;
            break;
        case 8:
            this.col=color(0,255,0);
            break;
    }
}

block.prototype.draw = function() {
    if(this.type===1&&this.r===R){
        //this.col=color(92, 52, 3);
    }
    if(this.type===4){
        radParticles.push(new gamma(this.r, this.t, random(0,360), 0.5));
    }
    else if(this.type===5){
        radParticles.push(new gamma(this.r, this.t, random(0,360), 2));
    }
    else if(this.type===7&&frameCount%5===0){
        radParticles.push(new gamma(this.r, this.t, -atan2((this.r*cos(this.t))-(player.r*cos(player.t)),(this.r*sin(this.t))-player.r*sin(player.t))+random(-5,5)-90, 5));
    }
    fill(this.col);
    stroke(this.col);
    beginShape();
    for(var i=this.t-this.w/2;i<this.t+this.w/2+this.w/20;i+=this.w/20){
        vertex((this.r+this.h/2)*cos(i),(this.r+this.h/2)*sin(i));
    }
    for(var i=this.t+this.w/2;i>this.t-this.w/2-this.w/20;i-=this.w/20){
        vertex((this.r-this.h/2)*cos(i),(this.r-this.h/2)*sin(i));
    }
    endShape(CLOSE);
    if(this.type===7){
        fill(255, 230, 0);
        ellipse(this.r*cos(this.t),this.r*sin(this.t),20,20);
        fill(0);
        arc(this.r*cos(this.t),this.r*sin(this.t),18,18,0,60);
        arc(this.r*cos(this.t),this.r*sin(this.t),18,18,120,180);
        arc(this.r*cos(this.t),this.r*sin(this.t),18,18,240,300);
        fill(255,230,0);
        ellipse(this.r*cos(this.t),this.r*sin(this.t),5,5);
        fill(0);
        ellipse(this.r*cos(this.t),this.r*sin(this.t),3,3);
        
    }
};
block.prototype.collide=function(){
    
    var p={
        r:player.r,
        t:player.t,
        w:player.w/(2*Math.PI/360*(player.r)),
        h:player.h
    };
    if(this.solid){
    if((p.t+p.w/2>(this.t-this.w/2))&&(p.t-p.w/2<this.t+this.w/2)){
        if(p.r-p.h/2-player.rs<=this.r+this.h/2&&p.r>this.r&&player.rs>=0&&p.r-p.h/2>=this.r+this.h/2){
            player.rs=0;
            player.r=this.r+player.h/2+this.h/2;
            player.onGround=true;
            if(this.type!==3&&rdist(this.t,player.t)<this.w/2*0.99){
                player.canJump=true;
            }
            if(this.type===8){
                player.rs=-20;
            }
            //this.col=color(0,255,0);
            return;
        }
        else if(p.r+p.h/2-player.rs>=this.r-this.h/2&&p.r<this.r&&player.rs<0&&p.r+p.h/2<=this.r-this.h/2){
            player.r=this.r-player.h/2-this.h/2;
            player.rs=0;
            //this.col=color(255,0,0);
            return;
        }
        
    }
    if(p.r+p.h/2>this.r-this.h/2&&p.r-p.h/2<this.r+this.h/2){
        if(p.t+p.w/2+player.ts>=this.t-this.w/2&&p.t<this.t&&player.ts>0&&p.t+p.w/2<=this.t-this.w/2){
            player.ts=0;
            player.t=this.t-this.w/2-p.w/2;
            player.right=false;
            //this.col=color(0,100,255);
            return;
        }
        else if(p.t-p.w/2+player.ts<=this.t+this.w/2&&p.t>this.t&&player.ts<0&&p.t-p.w/2>=this.t+this.w/2){
            player.ts=0;
            player.t=this.t+this.w/2+p.w/2;
            player.left=false;
            //this.col=color(0,100,255);
            return;
        }
    }
    if(p.r+p.h/2>this.r-this.h/2&&p.r-p.h/2<this.r+this.h/2&&p.t+p.w/2>(this.t-this.w/2)&&(p.t-p.w/2<this.t+this.w/2)){
        switch(min(min(abs(p.r+p.h/2-(this.r-this.h/2)),abs(p.r-p.h/2-(this.r+this.h/2))),min(abs(p.t+p.w/2-(this.t-this.w/2)),abs(p.t-p.w/2-(this.t+this.w/2))))){
            case abs(p.r+p.h/2-(this.r-this.h/2)):
                player.r=this.r-player.h/2-this.h/2;
            player.rs=0;
            //this.col=color(255,0,0);
                break;
            case abs(p.r-p.h/2-(this.r+this.h/2)):
                player.rs=0;
            player.r=this.r+player.h/2+this.h/2;
            player.onGround=true;
            if(this.type!==3){
                player.canJump=true;
            }
            //this.col=color(0,255,0);
                break;
            case abs(p.t+p.w/2-(this.t-this.w/2)):
                player.ts=0;
            player.t=this.t-this.w/2-p.w/2;
            player.right=false;
            //this.col=color(0,100,255);
                break;
            case abs(p.t-p.w/2-(this.t+this.w/2)):
                player.ts=0;
            player.t=this.t+this.w/2+p.w/2;
            player.left=false;
            //this.col=color(0,100,255);
                break;
            default:
                println("Collision Error");
        }
        
    }
    return;
    }
    if(this.type===2){
    this.col=0;
    }
    if(p.t+p.w/2>(this.t-this.w/2)&&(p.t-p.w/2<this.t+this.w/2)&&p.r+p.h/2>this.r-this.h/2&&p.r-p.h/2<this.r+this.h/2){
        if(this.type===2){
        this.col=100;
        }
    }
    
};

/**
var mult = 1;
var it = 160;
for(var j=80;j<R;j+=20){
    if(j===it){
        mult*=2;
        it*=2;
    }
for(var i = 10/mult; i < 360; i += 20/mult) {
    if(random()>0.75||j===80){
    blocks.push(new block (j, i, 20/mult, 20));
    }
    }
}**/
var core=new block(40,45,360,60,6);
 var mult=1;
    var it = 160;
    var j1=0;
    var i1=0;
draw= function() {
    if(loaded===false){
        load();
    }
    else{
    if(levelStart){
        rho=levels[curLevel].dens;
        R=levels[curLevel].r;
        blocks=[];
        player.health=100;
        for(var i=10;i<360;i+=20){
            blocks.push(new block (80, i, 20, 20, 6));
        }
        levelStart=false;
        levelLoad=0;
        mult=1;
        it=160;
        j1=0;
        i1=0;
    }
    else if(levelLoad<15){
        background(255);
        fill(0);
        rect(300,300,100,50);
        fill(0,255,0);
        rect(300,300,j1/levels[curLevel].map.length*100,50);
        text(j1,300,100);
        for(var k=0;k<1000;k++){
            if(j1>=levels[curLevel].map.length){
                levelLoad=15;
                break;
            }
            else{
            var r=j1*20+100;
            if(r===it){
            mult*=2;
            it*=2;
            }
            if(i1>=levels[curLevel].map[j1].length){
            j1++;
            i1=0;
            }
            else{
                var t=i1*20/mult+10/mult;
                var m=levels[curLevel].map[j1][i1];
                switch(m){
                    case 0:
                        
                        break;
                    case -1:
                        player.r=r;
                        player.t=t;
                        break;
                    default:
                        blocks.push(new block(r,t,20/mult,20,m));
                }
                i1++;
            }
            }
        }
        //levelLoad++;
    }
    else{
    println(radParticles.length);
    if(frameCount%1===0){
        dispCps=0;
        for(var i=counts.length-1;i>=0;i--){
            dispCps+=counts[i]*60/100;
            if(i<counts.length-1){
            counts[i+1]=counts[i];
            }
        }
        dispCps=floor(dispCps);
        counts[0]=cps;
        cps=0;
    }
    image(space,0,0,600,600);
    pushMatrix();
    translate(300,300+player.r*2);
    rotate(-player.t-90);
    scale(2);
    image(bkg,-R*2,-R*2,R*4,R*4);
    if(player.r>R*2){
        noStroke();
        fill(255,100);
        ellipse(player.r*cos(player.t), player.r*sin(player.t), 70,70);
    }
    player.onGround=false;
    player.canJump=false;
    player.right=true;
    player.left=true;
    /*
        var g=0;
    for(var i=0;i<1600;i++){
        if(i<60){
            g=0;
        }
        else if(i<=R){
            g=G*4/3*Math.PI*rho*i;
        }
        else{
            g=G*4/3*Math.PI*pow(R,3)*rho/pow(i,2);
        }
        noFill();
        stroke(255-(g*300));
        ellipse(0,0,2*i,2*i);
    }
    //Gravity map*/
    
    core.draw();
        core.collide();
    for(var i=0; i<blocks.length; i++){
        if(((rdist(blocks[i].t,player.t)/(2*Math.PI/360*(blocks[i].r)))<200&&abs(blocks[i].r-player.r)<200)||player.r<300&&blocks[i].r<300){
        blocks[i].draw();
        if(rdist(blocks[i].t,player.t)<20&&abs(blocks[i].r-player.r)<40){
        blocks[i].collide();
        }
        }
    }
    
    player.draw();
    if(player.r>R*2){
        player.health-=0.01;
        cps+=1;
    }
    
    if(player.r>R*3){
        levelStart=true;
        curLevel++;
    }
    player.health+=0.01/60;
    fill(255, 0, 0);
    for(var i=0;i<radParticles.length;i++){
    noStroke();
    //ellipse(radParticles[i].r*cos(radParticles[i].t),radParticles[i].r*sin(radParticles[i].t),sqrt(radParticles[i].energy*10),sqrt(radParticles[i].energy*10));
    radParticles[i].move();
    var p=radParticles[i];
    if(radParticles[i].r>R*3||radParticles[i].energy<=0.01){
        radParticles.splice(i,1);
    }
    for(var j=0;j<blocks.length;j++){
        var b=blocks[j];
        if(rdist(p.t,b.t)>b.w/2||abs(p.r-b.r)>b.h/2){
            continue;
        }
        p.energy-=b.attenuation*p.energy;
        break;
    }
    }
    for(var i=0;i<messages[curLevel].length;i++){
        messages[curLevel][i].draw();
    }
    popMatrix();
    stroke(0);
    fill(255,100);
    rect(525,10,140,10,10);
    noStroke();
    fill(0,255,0);
    rect(526-(138*(1-player.health/100))/2,10,(138*player.health/100),9,10);
    
    radCounter(dispCps,10,10,50);
    }
    }
};

keyPressed=function(){
    keys[keyCode]=true;
};
keyReleased=function(){
    keys[keyCode]=false;
};



  }
};
