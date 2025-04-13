var sketchProc = function(ProcessingInstance){
  with(ProcessingInstance){
    size(600,600);
      

var curLevel = 0;
var blocks = [];
var keys=[];
var R=1000;
var rho = 0.1;
var G=0.001;
var levels=[];
var messages=[];
var crystals=[];
var levelStart=true;
var cps=0;
var counts=[];
var levelLoad=0;
frameRate(60);
for(var i=0;i<100;i++){
    counts.push(0);
}
//{
    var tColl=function(x1,y1,x2,y2,x3,y3,x,y){
    return y<=y2&&x-x1<=(x3-x1)-((x3-x2)/(y2-y3))*(y-y3)&&
    x-x1>=(x3-x1)+((x1-x3)/(y2-y3))*(y-y3)
    ;
};
    var rColl=function(rec,tri){
    for(var i=rec.x;i<rec.x+rec.w;i++){
        for(var j=rec.y;j<rec.y+rec.h;j++){
            if(tColl(tri.x1,tri.y1,tri.x2,tri.y2,tri.x3,tri.y3,i,j)){
                return true;
            }
        }
    }
    return false;
};
    var stringArray=function(input){
    var out=[];
    var i=1;
    var inSeg=-1;
    var layer=0;
    while(i<input.length-1){
        var g=false;
        if(inSeg===-1){
            var q=i;
            var f="";
            
            if(input[i]==="["){
                var n=0;
                    while(q<input.length){
                        if(input[q]==="["){
                            n++;
                        }
                        else if(input[q]==="]"){
                            n--;
                        }
                        q++;
                        if(n===0){
                            break;
                        }
                    }
                }
                else{
            while(input[q]!==","&&q<input.length&&input[q]!=="]"){
                
                q++;
            }
                }
            for(var j=i;j<q;j++){
                f+=input[j];
            }
            out.push(f);
            i=q;
        
        }
        if(g===false){
        i++;
        }
    }
    return out;
};
    var roundTo=function(num,digit){
    if(digit===0){
        return num;
    }
    else{
        var n1=num*pow(10,digit);
        var n2;
        if(n1>=floor(n1)+0.5){
            n2=ceil(n1);
        }
        else{
            n2=floor(n1);
        }
        var n=n2/pow(10,digit);
        if((n-floor(n)).toString().length>digit){
            //println(0);
           return n;
        }
        //println(pow(10,-digit));
        return n;
    }
};
    var contract=function(number){
        if(number>=0){
        return number<1000?number:number<1000000?roundTo(number/1000,1)+"K":number<1000000000?roundTo(number/1000000,1)+"M":roundTo(number/1000000000,1)+"B";
        }
        else{
            return -number<1000?number:-number<1000000?roundTo(number/1000,1)+"K":-number<1000000000?roundTo(number/1000000,1)+"M":roundTo(number/1000000000,1)+"B";
        }
        
    };
    String.prototype.toTitleCase=function(){
        var f=this.split(" ");
        for(var i=0;i<f.length;i++){
        f[i]=f[i][0].toUpperCase()+f[i].split("").splice(1,f[i].length-1).join("").toLowerCase();
        }
    return f.join(" ");
};
    String.prototype.deQuote=function(){
    var car=this;
    if((this[0]==="\""&&this[this.length-1]==="\"")||(this[0]==="\'"&&this[this.length-1]==="\'")){
        car=[];
        for(var i=1;i<this.length-1;i++){
            car.push(this[i]);
        }
        car=car.join("");
    }
    return car;
};
    var encryptData=function(input){
    var car="";
    var alphanumeric="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+={}[]|:;'<,>.? /-ΑΒΓΔΕΖΗΘΙͿΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ`";
    alphanumeric["."]="\\";
    var key=round(random(0,alphanumeric.length-10));
    //var convert=function(inp){
        if(typeof input=== typeof 0){
            input=input.toString();
            car="\"";
            //println(floor(input/36));
            for(var i=0;i<input.length;i++){
                    car+=alphanumeric[alphanumeric.length-key-1-input[i]];
                }
            car+="~n~"+key+"\"";
        }
        else if(typeof input===typeof "a"){
            car="\"";
            key=round(random(0,alphanumeric.length-27));
            for(var i=0;i<input.length;i++){
                    for(var j=0;j<alphanumeric.length-1;j++){
            if(alphanumeric[j]===input[i]){
                    car+=j+key+"`";
            }
                }
                }
                car=car.split("");
                car.splice(car.length-1,1);
                car=car.join("");
                car+="~s~"+key+"\"";
        }
        else if(typeof input===typeof true){
            car='"'+alphanumeric[alphanumeric.length-key-1-input]+"~b~"+key+'"';
        }
        else if(input instanceof Array){
            car+="[";
            for(var i=0;i<input.length;i++){
                car+=encryptData(input[i])+",";
            }
            car+="]";
        }
        else if(typeof input===typeof function(){}){
            car="\"";
                car+=encryptData(input.toString()+";").deQuote();
            car+="\"";
        }
        else if(typeof input===typeof {}){
            car+="{";
            for(var i in input){
                car+=encryptData(i)+":"+encryptData(input[i])+",";
            }
            car+="}";
        }
        //return inp;
    //};'
    //println(typeof input);
    //input=carry;
    return car;
};
    var decryptData=function(input){
    var alphanumeric="`ΩΨΧΦΥΤΣΠΡΟΞΝΜΛΚͿΙΘΗΖΕΔΓΒΑ-/ ?.>,<';:|][}{=+_)(*&^%$#@!ZYXWVUTSRQPONMLKJIHGFEDCBAzyxwvutsrqponmlkjihgfedcba9876543210";
    var z;
    var car="";
    if(input instanceof Array){
        car="[";
        for(var i=0;i<input.length;i++){
            car+=decryptData(input[i])+",";
        }
        car+="]";
    }
    else if(typeof input===typeof {}){
            car+="{";
            for(var i in input){
                car+=decryptData(i)+":"+decryptData(input[i])+",";
            }
            car+="}";
        }
    else{
        z=input.split("~");
        if(z[1]==="n"){
    input=z[0];
    for(var i=0;i<input.length;i++){
        if(input[i]+input[i+1]+input[i+2]+input[i+3]+input[i+4]+input[i+5]+input[i+6]+input[i+7]+input[i+8]+""==="undefined"){
            i+=8;
            car+=".";
            continue;
        }
        for(var j=0;j<alphanumeric.length;j++){
            if(alphanumeric[j]===input[i]){
                    car+=j-z[2];
            }
                }
    }
    car=parseFloat(car);
    }
        else if(z[1]==="b"){
        input=z[0];
        for(var j=0;j<alphanumeric.length;j++){
            if(alphanumeric[j]===input){
                    car=j-z[2];
            }
                }
        car=car===1?true:false;
    }
        else if(z[1]==="s"){
        input=z[0];
        var cars=z[0].split("`");
        for(var i=0;i<cars.length;i++){
            car+=alphanumeric[alphanumeric.length-(cars[i]-z[2]+1)];
        }
    }
    }
    
    
    //println(typeof car-0);
    return car;
    
};
    var start=function(){
    this[["KAInfiniteLoopCount"]]=-Infinity;
};
    var neg=function(col){
    return blendColor(color(255,255,255),col,SUBTRACT);
};
    var chooseRandom=function(array){
    return array[floor(random(0,array.length))];
};
    Array.prototype.calcTotal=function(property,property2){
    var g=0;
    if(property2){
        for(var i=0;i<this.length;i++){
            if(this[i]&&this[i][property]){
            g+=this[i][property][property2];
            }
        }
    }
    else if(property){
        for(var i=0;i<this.length;i++){
            if(this[i]){
            g+=this[i][property];
            }
        }
        
    }
    else{
        for(var i=0;i<this.length;i++){
            if(this[i]){
            g+=this[i];
            }
        }
    }
    return g;
};
    start();
//}//Utilities
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
 * 9: Crystal
**/
//Width doubles at r=1, 7, 18, 41, 87, 179, 362, 729

levels.push(new level(200,0.5,[
    [6,-1,0,0,9,0,0,0,0,0,0,0,0,0,0,1,1,1],
    [6,6,6,6,6,6,6,6,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
    [1,1,6,6,6,6,6,6,1,1,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1],
    [1,1,4,1,1,1,1,1,4,1,1,1,4,1,1,1,1,1,1,1,1,1,1,4,1,1,1,1,1,1,1,1,0,0,0,1],
    [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2],
    [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,6,6,6,1,1,1,1,1,1,1,1,3,3,3,1,1,2],//Surface
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,6,7,0,0,0,0,0,8,0,0,0,0,0,9,4],
    [4,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6,0,0,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
    [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [0,1,1,1,1,5,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//Edge of space
    ]));
var l=1;
var d=160;
var m=[];
for(var i=0;i<1000;i++){
    if((i*20+100)*20/l*2*Math.PI/360>=40){
                l*=2;
                println(i);
            }
            if(i<350){
                m[i]=[0];
                continue;
            }
    m[i]=[];
    for(var j=0;j<18*l;j++){
        var n=noise((i*20+100)*0.1,((j+1)*360/(18*l))*0.1*2*Math.PI*(i*20+100)/360);
        var v=0;
        if(n<0.40){
            v=2;
        }
        else if(n<0.55){
            v=1;
        }
        else if(n<0.58){
            v=4;
        }
        else if(n<0.60){
            v=5;
        }
        else if(n<0.7){
            v=6;
        }
        else if(n<0.75){
            v=7;
        }
        m[i][j]=v;
    }
}
m[m.length-1][m[m.length-1].length-1]=-1;
var ll=m[m.length-2].length;
m.push([]);
for(var i=0;i<m[m.length-2].length;i++){
    m[m.length-1].push(0);
}
for(var j=0;j<2;j++){
    m.push([]);
for(var i=0;i<m[m.length-2].length;i++){
    m[m.length-1].push(0);
}
}
var rand1=round(random(10,m[m.length-2].length-10));
//rand1=10;
for(var j=1;j<2;j++){
    m[m.length-1-j][rand1]=1;
}
m[m.length-1][rand1]=8;
println(rand1/m[m.length-2].length*360);
levels.push(new level(20080,0.002,m));
    
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
for(var i=0;i<1200;i++){
    if(i<400){
        fill(0,(200/2)*i/400+55,200*i/400+55,(i/25));
    }
    else{
        fill(100);
    }
    
    noStroke();
    ellipse(3000,3000,6000-5*i,6000-5*i);
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
            if(this.canJump){
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
    if(dist(x,y,p.x,p.y)>300){
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
    if(this.t>=360){
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
    
    
    if(this.type===8){
        this.col=color(157, 0, 255);
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
    if(this.type===8){
        if(crystals.length===0){
            this.col=color(0,255,0);
        }
        else{
            this.col=color(255, 0, 0);
        }
        ellipse(this.r*cos(this.t),this.r*sin(this.t),10,10);
        
    }
};
block.prototype.collide=function(){
    
    var p={
        r:player.r,
        t:player.t,
        w:player.w/(2*Math.PI/360*(player.r)),
        h:player.h
    };
    if(this.t-this.w/2<=0&&p.t>=360+(this.t-this.w/2)-p.w/2){
        p.t-=360;
    }
    if(this.t+this.w/2>=360&&p.t<=0+((this.t+this.w/2)-360)+p.w/2){
        p.t+=360;
    }
    if(this.solid){
    if((p.t+p.w/2>(this.t-this.w/2))&&(p.t-p.w/2<this.t+this.w/2)){
        if(p.r-p.h/2-player.rs<=this.r+this.h/2&&p.r>this.r&&player.rs>=0&&p.r-p.h/2>=this.r+this.h/2){
            player.rs=0;
            player.r=this.r+player.h/2+this.h/2;
            player.onGround=true;
            if(this.type!==3){
                player.canJump=true;
            }
            if(this.type===8&&crystals.length===0){
                player.rs=-100;
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
        player.canJump=true;
        //println("Revert");
        player.rs=0.1;
        switch(min(min(abs(p.r+p.h/2-(this.r-this.h/2)),abs(p.r-p.h/2-(this.r+this.h/2))),min(abs(p.t+p.w/2-(this.t-this.w/2))*(2*Math.PI/360*(this.r)),abs(p.t-p.w/2-(this.t+this.w/2))*(2*Math.PI/360*(this.r))))){
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
            case abs(p.t+p.w/2-(this.t-this.w/2))*(2*Math.PI/360*(this.r)):
                player.ts=0;
            player.t=this.t-this.w/2-p.w/2*1.01;
            player.right=false;
            //this.col=color(0,100,255);
                break;
            case abs(p.t-p.w/2-(this.t+this.w/2))*(2*Math.PI/360*(this.r)):
                player.ts=0;
            player.t=this.t+this.w/2+p.w/2*1.01;
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

function crystal(r, t) {
    this.r=r;
    this.t=t;
    this.w=12/(2*Math.PI/360*(r));
    this.h=20;
    this.coll=false;
}
crystal.prototype.draw = function() {
    fill(20, 250, 192);
    noStroke();
    beginShape();
    vertex((this.r+this.h/2)*cos(this.t),(this.r+this.h/2)*sin(this.t));
    vertex((this.r)*cos(this.t-this.w/2),(this.r)*sin(this.t-this.w/2));
    vertex((this.r-this.h/2)*cos(this.t),(this.r-this.h/2)*sin(this.t));
    vertex((this.r)*cos(this.t+this.w/2),(this.r)*sin(this.t+this.w/2));
    endShape(CLOSE);
    fill(0, 247, 255);
    beginShape();
    vertex((this.r+this.h/4)*cos(this.t),(this.r+this.h/4)*sin(this.t));
    vertex((this.r)*cos(this.t-this.w/2),(this.r)*sin(this.t-this.w/2));
    vertex((this.r-this.h/4)*cos(this.t),(this.r-this.h/4)*sin(this.t));
    vertex((this.r)*cos(this.t+this.w/2),(this.r)*sin(this.t+this.w/2));
    endShape(CLOSE);
};
crystal.prototype.collide=function(){
    
    var p={
        r:player.r,
        t:player.t,
        w:player.w/(2*Math.PI/360*(player.r)),
        h:player.h
    };
    if(p.t+p.w/2>(this.t-this.w/2)&&(p.t-p.w/2<this.t+this.w/2)&&p.r+p.h/2>this.r-this.h/2&&p.r-p.h/2<this.r+this.h/2){
        this.coll=true;
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
try{
draw= function() {
    if(loaded===false){
        load();
    }
    else{
    if(levelStart){
        rho=levels[curLevel].dens;
        R=levels[curLevel].r;
        blocks=[[]];
        crystals=[];
        player.health=100;
        player.rs=0;
        player.ts=0;
        blocks[-1]=[];
        for(var i=10;i<360;i+=20){
            blocks[-1].push(new block (80, i, 20, 20, 6));
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
        for(var k=0;k<2000;k++){
            if(j1>=levels[curLevel].map.length){
                levelLoad=15;
                break;
            }
            else{
            var r=j1*20+100;
            if(r*20/mult*2*Math.PI/360>=40){
                mult*=2;
            }
            if(i1>=levels[curLevel].map[j1].length){
            j1++;
            blocks[j1]=[];
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
                    case 9:
                        crystals.push(new crystal(r,t));
                        break;
                    default:
                        blocks[j1][i1]=(new block(r,t,20/mult,20,m));
                }
                i1++;
            }
            }
        }
        //levelLoad++;
    }
    else{
    //println(radParticles.length);
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
    image(bkg,-R*1.5,-R*1.5,R*3,R*3);
    if(player.r>R*1.5){
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
    try{
    for(var i=-1; i<blocks.length-1; i++){
        if(!blocks[i]){
            continue;
        }
        if((i+5)<floor((player.r-150)/20)){
            i=floor((player.r-150)/20)-5;
        }
        if((i+4)>ceil((player.r+150)/20)){
            break;
        }
        if(i<6){
            for(var j=0; j<blocks[i].length;j++){
            if(!blocks[i][j]){
                continue;
            }
            blocks[i][j].draw();
            blocks[i][j].collide();
        }
        }
        else{
        for(var j=floor((player.t/360*blocks[i].length))-8; j<ceil((player.t/360*blocks[i].length))+8;j++){
            if(!blocks[i][j]){
            }
        else{
        blocks[i][j].draw();
        blocks[i][j].collide();
        }
        }
        if(ceil((player.t/360*blocks[i].length))+8>blocks[i].length){
            for(var j=0; j<ceil((player.t/360*blocks[i].length))+8-blocks[i].length;j++){
            if(!blocks[i][j]){
                continue;
            }
        else{
        blocks[i][j].draw();
        blocks[i][j].collide();
        }
        }
        }
        else if(floor((player.t/360*blocks[i].length))-8<0){
            for(var j=(blocks[i].length-floor((player.t/360*blocks[i].length))-8); j<blocks[i].length;j++){
            if(!blocks[i][j]){
                continue;
            }
        else{
        blocks[i][j].draw();
        blocks[i][j].collide();
        }
        }
        }
        }
    }
    }
    catch(e){
        //println(e+" in world rendering");
    }
    
    for(var i=0;i<crystals.length;i++){
        crystals[i].draw();
        crystals[i].collide();
        if(crystals[i].coll){
            crystals.splice(i,1);
        }
    }
    player.draw();
    if(player.r>R*1.5){
        player.health-=0.01;
        cps+=1;
    }
    
    if(player.r>R*2.5){
        levelStart=true;
        curLevel++;
    }
    player.health+=0.01/60;
    fill(255, 0, 0);
    try{
    for(var i=0;i<radParticles.length;i++){
    noStroke();
    //ellipse(radParticles[i].r*cos(radParticles[i].t),radParticles[i].r*sin(radParticles[i].t),sqrt(radParticles[i].energy*10),sqrt(radParticles[i].energy*10));
    radParticles[i].move();
    radParticles[i].energy-=radParticles[i].energy*0.01;
    var p=radParticles[i];
    if(radParticles[i].r>R*2.5||radParticles[i].energy<=0.01){
        radParticles.splice(i,1);
    }
    
    for(var j=floor((p.r-20)/20)-4;j<ceil((p.r+20)/20)-4;j++){
        if(j<-1||j>blocks.length-1){
            continue;
        }
        for(var k=floor(p.t/360*blocks[j].length)-1;k<ceil(p.t/360*blocks[j].length)+1;k++){
        if(!blocks[j][k]){
            continue;
        }
        var b=blocks[j][k];
        if(rdist(p.t,b.t)>b.w/2||abs(p.r-b.r)>b.h/2){
            continue;
        }
        p.energy-=b.attenuation*p.energy;
        break;
        }
    }
    
    }
    }
    catch(e){
        println(e+" in radiation simulation");
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
    if(keys[SHIFT]){
        println(player.r+",  "+player.t);
    }
};
}
catch(e){
    println(e);
}

keyPressed=function(){
    keys[keyCode]=true;
};
keyReleased=function(){
    keys[keyCode]=false;
};






  }
};
