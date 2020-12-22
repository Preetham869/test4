var PLAY = 0;
var END;
var gameState = PLAY;
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup;
var score = 0;
var ground,background,backgroundImage;
var GameOver;
var restart;
var cheeringSound;

function preload() {

monkey_running = loadAnimation("sprite_0.png","sprite_1.png",
         "sprite_2.png","sprite_3.png","sprite_4.png",
         "sprite_5.png","sprite_6.png","sprite_7.png",
         "sprite_8.png")
bananaImage = loadImage("banana-1.png");
obstacleImage = loadImage("obstacle.png");
GameOverImage= loadImage("game-over.png");
restartImage = loadImage("restart.png"); 
backgroundImage = loadImage("Background.png");
cheeringSound = loadSound("applause7.mp3")

}

function setup() {

 canvas = createCanvas(displayWidth - 320,displayHeight - 50);  
  
monkey = createSprite(100,605,10,10);
monkey.addAnimation("running",monkey_running);
monkey.scale = 0.25;
  
ground = createSprite(700,680,1260,15);

background = createSprite(0,408);
background.scale = 1.03;
background.depth = monkey.depth - 100
background.velocityX = -6 
background.addImage(backgroundImage)
background.x = background.width/2;

GameOver = createSprite(640,250)
GameOver.addImage(GameOverImage)
GameOver.scale = 0.8;
GameOver.visible = false;
 
restart = createSprite(640,300);
restart.addImage(restartImage)
restart.scale = 0.6;
restart.visible = false;

obstacleGroup = new Group();
bananaGroup = new Group();
  
}

function draw () {

if (gameState===PLAY){

background.velocityX = -6 
ground.visible = false;
monkey.visible = true;
score = score + Math.round(getFrameRate()/60);
ground.velocityX = -(6 + 1 * score/100);
  
if(keyDown("space") && monkey.y >= 320) {

monkey.velocityY = -10;

}

if(score > 0 && score % 200 === 0){
  
 //cheering.addImage(cheeringImage) 
 cheeringSound.play() 

 }

monkey.velocityY = monkey.velocityY + 1
  
if (background.x < 400){

background.x = background.width/2;

}  

if (ground.x < 700){

 ground.x = ground.width/2;
    
}      

monkey.collide(ground);  
  
spawnBanana();
spawnObstacle();
 
if (bananaGroup.isTouching(monkey)) {
 
bananaGroup.destroyEach();
 
} 
  
if(obstacleGroup.isTouching(monkey)){
       
gameState = END;

}

}
  
else if (gameState === END) {
   
GameOver.visible = true;
restart.visible = true;
background.visible = false;
textSize(50);
text("😩                            " + "😞!!!", 375,265)

textSize(50);
fill("red")
text("Survival Time: "+ score,780,100);

monkey.visible = false;
background.velocityX = 0;
bananaGroup.destroyEach();
obstacleGroup.destroyEach();
ground.visible = false;
monkey.velocityY = 0;
obstacleGroup.setVelocityXEach(0);
bananaGroup.setVelocityXEach(0);
 
obstacleGroup.setLifetimeEach(-1);
bananaGroup.setLifetimeEach(-1);  
  
if(mousePressedOver(restart)) {
    
reset();

} 
  
} 
   
drawSprites() 
  
}

function spawnObstacle() {

if (frameCount % 150 === 0) {
 
obstacle = createSprite(1200,645,20,20)
obstacle.x = Math.round(random(1200,1200));
obstacle.addImage(obstacleImage);
obstacle.scale = 0.15
obstacle.velocityX = -(6 + score/100);
obstacle.lifetime = 200;
obstacleGroup.add(obstacle);  
  
}  
  
}

function spawnBanana() {

if (frameCount % 160 === 0) {

banana = createSprite(1200,380)  
banana.x = Math.round(random(1200,1200)); 
banana.addImage(bananaImage)
banana.scale = 0.6;
banana.velocityX = -(6 + score/100);
banana.lifetime = 200;
bananaGroup.add(banana);  
  
}
  
}

function reset() {

background.visible = true;
gameState = PLAY;
GameOver.visible = false;
restart.visible = false;
obstacleGroup.destroyEach();
bananaGroup.destroyEach();
score = 0;
  
}




