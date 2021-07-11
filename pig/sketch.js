const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var pig,pig_running;
var backGround,bgImage,invisibleGround;
var cloudsGroup, cloudImage;
var waterssGroup, waterImage;

var score=0;

function preload(){
  pig_running=loadAnimation("p1.png","p2.png","p3.png");
  bgImage=loadImage("backgroundImage.png");
  cloudImage = loadImage("cloud.png");
  waterImage = loadImage("water.png");
  piggie=loadImage("p2.png")
}

function setup() {
  createCanvas(1000, 400);

 backGround=createSprite(10,10,10,10);
 backGround.addImage("ground",bgImage);
 backGround.scale=0.3;
 backGround.velocityX=-3;
 

 invisibleGround = createSprite(0,330,2000,20);
 invisibleGround.visible = false;

 pig=createSprite(70,250,10,10);
  pig.addAnimation("pigRunning",pig_running);
  pig.scale=0.3;

 cloudsGroup = new Group();
 watersGroup = new Group();
}

function draw() {
  background(220);
  score = score + Math.round(getFrameRate()/60);
  textSize(20);
  text("Score: "+ score,500,50);

  if (backGround.x<0){
    backGround.x=500;
    //backGround.x=background.width/2;
    }
  
  //jump when the space key is pressed
  if(keyDown("space")&& pig.y >= 100) {
    pig.velocityY = -12;

  }
  
  //add gravity
 pig.velocityY = pig.velocityY + 0.8;
 pig.collide(invisibleGround);
pig.display();
spawnClouds();
spawnWater();

if (watersGroup.isTouching(pig)){
  //pig.addImage(piggie)
  text("GAME OVER",500,200);
textSize(1000);
  backGround.velocityX=0;
  pig.velocityY=0;
  pig.visible=false;
  watersGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
//text("GAME OVER",500,200);
//textSize(1000);
}

  drawSprites()
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(10,180));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = pig.depth;
    pig.depth = pig.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}
function spawnWater() {
  //write code here to spawn the clouds
  if (frameCount % 400 === 0) {
    var water = createSprite(1000,350,40,10);
    water.addImage(waterImage);
    water.scale = 0.3;
    water.velocityX = -3;
    
     //assign lifetime to the variable
    water.lifetime = 1000;
    
    //adjust the depth
    water.depth = pig.depth;
    pig.depth = pig.depth + 1;

    /*if (waterssGroup.isTouching(pig)){
      backGround.velocityX=0;
      pig.velocityY=0;
    text("GAME OVER",500,200)
    }*/
    
    //add each cloud to the group
    watersGroup.add(water);
  }
  
}