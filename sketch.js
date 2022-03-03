var  b1,b2,b3,b4,boy, boysp;
var d1,d2,d3,dog,dogsp;
var obs,obssp;
var bg;
var coin;
var x1 = 0;
var x2 = 0;
var scrollSpeed = 2;
var invisibleG;
var totScore, bScore, dScore;
var soundbg;
var coinGroup, obsGroup;
var PLAY =  1;
var END = 0;
var gameState = PLAY; 
var boy,dog;

function preload(){
boy = loadAnimation("img/b1.png","img/b2.png","img/b3.png","img/b4.png");
dog = loadAnimation("img/d1.png","img/d2.png","img/d3.png");
obs = loadImage('img/rock.png');
bg = loadImage('img/ground.jpg');
coin = loadImage('img/coin.jpg');
obs = loadImage("img/rock.png");
soundbg = loadSound("sound/bark.wav");
boy = loadImage("img/boy.png");
dog = loadImage("img/dog.png");

}
function setup() {
 createCanvas(1200,600)
x2 = width;
 boysp = createSprite(600,400,20,50)
 boysp.addAnimation("running", boy)

 dogsp = createSprite(100,450,70,70);
 dogsp.addAnimation("running", dog)
 
 invisibleG = createSprite(0, 490, 2200, 10)
 invisibleG.visible = (false);

 coinGroup = new Group();
 obsGroup = new Group()

bScore = 0;
dScore = 0;
 totScore = 0;
}//END of setup


function draw() {
    if(gameState === PLAY){
 //background(bg);
image(bg, x1, 0, width,height)
image(bg,x2, 0, width,height)

x1 = x1 - scrollSpeed
x2 = x2 - scrollSpeed

if(x1 < - width){
    x1 = width
}
if(x2 < - width){
    x2 = width
}


dogsp.velocityX = 0.2;
dogsp.depth = boysp.depth;

if (keyDown("space") && boysp.y>= 400 ){
    boysp.velocityY = -15
}
boysp.velocityY = boysp.velocityY+0.8;

if (keyDown("UP_ARROW") && dogsp.y>= 400 ){
    dogsp.velocityY = -18

}
dogsp.velocityY = dogsp.velocityY+0.8;

if (invisibleG.x < 0){
    invisibleG.x = invisibleG.width/2;
}
if ( dogsp >1200){
    dogsp.x = 100;
}

if (coinGroup.isTouching(boysp)){
    bScore = bScore+1;
    coinGroup[0].destroy()
}

if (coinGroup.isTouching(dogsp)){
    dScore = dScore+1;
    coinGroup[0].destroy()
    soundbg.play();
}
 

spawnObstacles();
spawnCoin();

 boysp.collide(invisibleG);
 dogsp.collide(invisibleG);
 
 if(totScore === 20){
     gameState = END;
}
 textSize(20)
 fill('blue')
 text("BoyScore : " + bScore + "/" + totScore, 1000,40)
 text ("DogScore : " + dScore + "/" + totScore,1000,60)
}// ENDofif
  
else if(gameState === END){
    if(bScore > dScore){
        textSize(30)
        fill('blue')
        text("Boy wins : ", 600,300)
             
    }
    else{
        textSize(30)
        fill('blue')
        text("dog wins : ", 600,300)
             
    }
    coinGroup.setVelocityXEach(0);
    coinGroup.setLifetimeEach(-1);

}
 drawSprites()

}

function spawnObstacles(){
 if(frameCount % 60 === 0){
  obssp = createSprite(800,450,200,100);
  obssp.addImage(obs);
 }
}

function spawnCoin(){
 if (frameCount  % 15 === 0){
     totScore  += 1;
     var coinsp = createSprite(900,120,40,10);
    coinsp.y = Math.round(random(180,240))
    coinsp.addImage(coin);
    coinsp.scale = 0.1;
    coinsp.velocityX = -3;
    coinsp.lifetime  = 300;
    
    coin.depth = boysp.depth;
    boysp.depth = boysp.depth  +1

    coinGroup.add(coinsp);
    
 }

}