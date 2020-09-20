//Global Variables
var monkey, monkeyimg ,monkey_still ;
var jungle, jungleimg ;
var ground;
var banana, bananaimg, bananagroup ;
var stone, stoneimg ;
var eat, score, stonegroup ;
var restart, restartimg, gameOver, gameimg ;
var gameState, buttons ;
var energybar;

function preload(){
  
  // to load images and animations(moving images)
  jungleimg = loadImage("iiiii.jpg");
  stoneimg = loadImage("stone.png");
  bananaimg = loadImage("Banana.png");
  restartimg = loadImage("restart.png");
  gameimg = loadImage("gameOver.png");
  monkey_still=loadImage("Monkey_03.png");
  monkeyimg = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png",
                            "Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
}

function setup() {
  
  createCanvas(displayWidth,displayHeight-130);

  // jungle=createSprite(displayWidth/4,displayHeight/4);
  // jungle.addImage(jungleimg);
  // // jungle.velocityX=-4;
  // jungle.scale=2.4;
  
  ground = createSprite(displayWidth/2,displayHeight/2+170,100000000000,10);
  ground.visible=false;

  monkey = createSprite(displayWidth/2,displayHeight/2+150,0,0);
  monkey.addAnimation("running",monkeyimg);
  monkey.scale=0.14;
  monkey.velocityX=0;
  monkey.addAnimation("still",monkey_still);

  restart = createSprite(monkey.x,displayHeight/2-50,0,0);
  restart.addImage(restartimg);
  gameOver = createSprite(monkey.x,displayHeight/2,0,0);
  gameOver.addImage(gameimg);
  gameOver.visible=false;
  restart.visible=false;
  
  bananagroup = new Group();
  stonegroup = new Group();
  
  gameState = "intro";
  
  eat = 0;
  score = 0;

  energybar=createSprite(700,75,1,25);
  energybar.shapeColor="yellow";

  buttons=new Form;
  
}

function draw(){

  background(jungleimg);

  camera.x=monkey.x;
  restart.x=monkey.x;
  gameOver.x=monkey.x;

  image(jungleimg,0,0,displayWidth*7,displayHeight);
  image(jungleimg,displayWidth*7,0,displayWidth*7,displayHeight);
  image(jungleimg,displayWidth*14,0,displayWidth*7,displayHeight);
  image(jungleimg,displayWidth*21,0,displayWidth*7,displayHeight);
  image(jungleimg,displayWidth*28,0,displayWidth*7,displayHeight);
  image(jungleimg,displayWidth*35,0,displayWidth*7,displayHeight);

 if(keyDown("space")&&monkey.collide(ground)&& gameState==="play"){
    monkey.velocityY=-16;
  }
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(ground);
  
  if(monkey.y<300){
    monkey.changeAnimation("still",monkey_still);
  }else{
    monkey.changeAnimation("running",monkeyimg);
  }

  //for conditions when game state is in play
 if(gameState==="play"){

  this.buttons.button.hide();

  monkey.velocityX=(6+score/20);

   if(eat===0 &&stonegroup.isTouching(monkey)===true){
     energybar.shapeColor="red";
     energybar.width=35;
     energybar.x=monkey.x+150;
   }else if(eat===0 &&stonegroup.isTouching(monkey)===false){
     energybar.shapeColor="yellow";
     energybar.width=75;
     energybar.x=monkey.x+160;
   }else{
    energybar.shapeColor="blue";
    energybar.width=150;
    energybar.x=monkey.x+200;
   }
  
  //  if (jungle.x < 200){
  //   jungle.x = jungle.width/2;
  // }
  // jungle.velocityX=-(6+score/13);
   
   //to spawn bananas
  if(frameCount%120===0){
    bananas();     
  } 
  
   //to spawn rocks
  if(frameCount%200===0){
    obstacles();  
  } 
  
  //for winning and loosing conditions
   
  if(bananagroup.isTouching(monkey)){
     bananagroup.destroyEach();
     eat=eat+2;
  }
  
  if(stonegroup.isTouching(monkey)){
    
    stonegroup.destroyEach();
    
    if(eat===0){
      gameState="end";  
    }
    
    if(eat>0){
     eat=0;    
    }
     
  }
  
  switch (eat){
  
    case 0:
      monkey.scale=0.14;
      break;
      
    case 10:
      monkey.scale=0.17;
      break;
      
    case 20:
      monkey.scale=0.2;
      break;
  
  }

  if(monkey.x>displayWidth*35){
    gameState="won";
  }
   
 }else if(gameState==="end"){
  
   monkey.velocityX=0;
   banana.velocityX=0;
   
   score=0;
   
   monkey.changeAnimation("still",monkey_still);
   
   gameOver.visible=true;
   restart.visible=true;
   
 }else if(gameState==="intro"){

   monkey.changeAnimation("still",monkey_still);
   fill("brown");
   textSize(20);
   text("INSTRUCTIONS :-",75,50);
   text("1. This is a single-player unlimited game.",75,85);
   text("2. You need to collect the bananas to increase the energy bar and size.",75,110);
   text("3. Avoid stones and junp over it by -spacebar- .",75,135);
   text("4. The energy bar should not go red and should be blue.",75,160);
   text("5. You win when you cross the end line.",75,185);
   text("6. & most importantly don't forget to enjoy",75,210);

   buttons.display();
 
 }else if(gameState==="won"){
  monkey.velocityX=0;
  banana.velocityX=0;

  fill("brown");
  textSize(30);
  text("You Won !!",85,210);
  
  score=0;
  
  monkey.changeAnimation("still",monkey_still);
  
  gameOver.visible=true;
  restart.visible=true;
 }
  
  //   to restart the game
  if(mousePressedOver(restart) &&  gameState==="end"){
    
   gameState="play";
   monkey.changeAnimation("running",monkeyimg); 
   gameOver.visible=false;
   restart.visible=false;
   monkey.x=displayWidth/2
   //jungle.velocityX=-6; 
   eat=0;
   score=0;
   
 }
  
  drawSprites();  
  
  //for displaying score
  fill("yellow");
  textSize(20);
  if(frameCount%10===0&&gameState==="play"){
     score=score+1;
  }
  if(gameState==="play"||gameState==="end"){
  text("Score= "+score,monkey.x,30 ); 
  text("Banana's Eaten : "+ eat,monkey.x,55);
  text("Energy Level: ",monkey.x,82);
  }
  
}

function bananas(){
  
 banana =  createSprite(monkey.x+650,random(315,415),0,0);
 banana.addImage(bananaimg); 
 banana.scale=0.06;
 banana.velocityX=-1;
 banana.lifetime=220;
 bananagroup.add(banana); 
  
}

function obstacles(){
  
  stones = createSprite(monkey.x+650,520,0,0);
  stones.addImage(stoneimg);
  stones.scale=0.2;
  stones.velocityX=-1;
  stones.lifetime=220;
  stonegroup.add(stones);

}  