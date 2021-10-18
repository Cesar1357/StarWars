var gameState = 1;
var obstacle;
var laserr;
var nave, navei,nave2i;
var ground, invisibleGround, groundImage;

var laserrsGroup,laserrsGroup2, laserrImage,asteroidsi;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, asteroids;

var score=0;
var hight=0;

var gameOver, restart;
var nochei;
var obsjetosgroup;
var resetgroup;
var enemigoGroup,enemigoGroup2;
var asteroidsGroup;
var gameOverImg,restartImg;
var edges;
var laser;
var recarga;
var calentamiento = 0;
var enemigo,enemigo2;
var music;
var explocion;
var friends,friends2;
var friendsGroup;
var dificult = 10;
var enunciado = 0;



function preload(){
  nochei = loadImage("noche.jpg");
  music = loadSound("music.mp3");
  explocion = loadAnimation("explocion.png");
  
  asteroidsi = loadAnimation("meteorito4.png");
  navei = loadAnimation("nave.png");  
  nave2i = loadAnimation("nave2.png")
  laserrImage = loadImage("laser.png");
  
  obstacle1 = loadImage("meteorito1.png");
  obstacle2 = loadImage("meteorito2.png");
  obstacle3 = loadImage("meteorito3.png");
  



  laser = loadSound("laser.mp3")
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gameState = 0;


  nave = createSprite(windowWidth/2,height/2+200,20,50);
  nave.setCollider("circle",0,0,200);
  nave.addAnimation("nave",navei);
  nave.addAnimation("explocion",explocion);

  nave.scale = 0.1;

  recarga = createSprite(windowWidth-30,windowHeight-500,20,300);
  recarga.shapeColor = "red";

enemigo = createSprite(-100,-10,20,20);
enemigo2 = createSprite(-100,-20,20,20);

  
friends = createSprite(-100,height+100,10,40);
friends2 = createSprite(-100,height+100,10,40);


  
  
  
  enemigoGroup = new Group();
  enemigoGroup2 = new Group();
  laserrsGroup = new Group();
  obstaclesGroup = new Group();
  obsjetosgroup = new Group();
  resetgroup = new Group();
  laserrsGroup2 = new Group();
  asteroidsGroup = new Group();
  friendsGroup = new Group();


  
  invisibleGround = createSprite(50000,height/2+200,100000000,10);
  invisibleGround.visible = false;
 
  music.play();

  nave.changeAnimation("nave",navei);

  score = 0;
}

function draw() {
  

  background(nochei);
  textSize(20);
  fill("white")
  text("Puntuación: "+ score, camera.x+300,camera.y-300);
  text("HI: "+ hight,camera.x+500,camera.y-300);
  text("Calentamiento",windowWidth-150,130);


  console.log(gameState)


  if (gameState===0){
    if (keyDown("SPACE")){
      gameState = 1;
    }
    textSize(width/40);
     fill("white")
  text("Presiona la tecla espacio para empezar",width/4+80,height/2-50);
    
    
   
  }
  
  if (gameState===1){
    textSize(width/90);

  //if(calentamiento <= 200){
    if (keyDown("SPACE")) {
      calentamiento = calentamiento + 5;
  }
//}

if(frameCount % 200 === 0){
    dificult = dificult - 1;
}

if(dificult < 1){
  dificult = dificult + 1;
}



if (keyDown("1")){
    reset2();
}


  calentamiento = calentamiento - 1;

  if(calentamiento < 1){
    calentamiento = calentamiento + 1;
  }

  if(calentamiento > 300){
    calentamiento = 300;
  }

recarga.height = calentamiento;
if(enunciado === 0){
  if(score < 10){
    textSize(width/40);
    fill("white")
    text("Destruye a los meteoritos y a las otras naves!",windowWidth/5,300);

  }
}
  
   

    if (keyDown("RIGHT_ARROW")){
      nave.x = nave.x + 20;
 
     }
     if (keyDown("LEFT_ARROW")){
      nave.x = nave.x - 20;
 
     }

     if(nave.x > windowWidth){
        nave.x = 0;
    }

     if(nave.x < 0){
      nave.x = windowWidth;

    }
     

    if(enemigo.x > windowWidth){
      enemigo.x = 0;
  }
   
   
   
  
    nave.collide(invisibleGround);
    spawnlaserrs();
    spawnObstacles();
    spawnenemis();
    spawnlasersenemi();
    spawnlasersenemi2();
    spawnlaserrsfriends();
    spawnlaserrsfriends2();
    spawnasteroids();
    spawnenemis2();
    spawnfriends();
    
    
    
  
    if(obstaclesGroup.isTouching(nave)){
        gameState = 2;

    }

    if(asteroidsGroup.isTouching(nave)){
      gameState = 2;

  }

    if(enemigoGroup.isTouching(nave)){
      gameState = 2;

  }

  if(enemigoGroup2.isTouching(nave)){
    gameState = 2;

}

  if(laserrsGroup.collide(obstaclesGroup)){
      score = score + 10;
      obstacle.lifetime = 1;
      laserr.lifetime = 1;
    
  }

  if(laserrsGroup.collide(asteroidsGroup)){
    score = score + 10;
    asteroids.lifetime = 1;
    laserr.lifetime = 1;
  
}

  if(laserrsGroup.collide(laserrsGroup2)){
    score = score + 1;
    laserr.lifetime = 1;
  
}

  if(laserrsGroup2.collide(nave)){
    gameState = 2;
  
  }

  if(laserrsGroup2.collide(friends)){
    friends.visible = false;
    friends = createSprite(-100,-10,20,20);
  }

  if(laserrsGroup2.collide(friends2)){
    friends2.visible = false;
    friends2 = createSprite(-100,-20,20,20);
  }

  if(laserrsGroup.collide(enemigoGroup)){
    score = score + 100;
    enemigo.lifetime = 1;
    laserr.lifetime = 1;
    enemigo = createSprite(-100,-20,20,20);

    enemigo2.lifetime = 1;
  }

if(laserrsGroup.collide(enemigoGroup2)){
  score = score + 100;
  enemigo2.lifetime = 1;
  laserr.lifetime = 1;
  enemigo2 = createSprite(-100,-20,20,20);




  }

if(friends.y < nave.y+30){
    friendsGroup.setVelocityYEach(0);
    friends2.velocityY = 0;
}

if(friends.x < -5){
friendsGroup.destroyEach();
}

friends.x = nave.x-100;
friends2.x = nave.x+100;


}
   else if(gameState === 2) {
    
    gameOver = createSprite(windowWidth/2,height/2-100);
    gameOver.addImage(gameOverImg);
  
    restart = createSprite(windowWidth/2,height/2-50);
    restart.addImage(restartImg);

    resetgroup.add(restart);
    obsjetosgroup.add(gameOver);

    nave.collide(invisibleGround);    
    nave.changeAnimation("explocion",explocion);



    
    
    if (score>hight){
      
          hight=score;

    }
    enemigoGroup.setVelocityXEach(0);
    enemigoGroup.setVelocityYEach(0);
    enemigoGroup2.setVelocityYEach(0);
    obstaclesGroup.setVelocityYEach(0);
    laserrsGroup.setVelocityYEach(0);
    laserrsGroup2.setVelocityYEach(0);
    laserrsGroup2.setVelocityXEach(0);
    asteroidsGroup.setVelocityYEach(0);
    friendsGroup.setVelocityYEach(0);
    friendsGroup.setVelocityXEach(0);





    
    enemigoGroup.setLifetimeEach(-1);
    enemigoGroup2.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    laserrsGroup.setLifetimeEach(-1);
    laserrsGroup2.setLifetimeEach(-1);
    asteroidsGroup.setLifetimeEach(-1);

    
    if(mousePressedOver(restart)) {      
      reset();
    }
  }
  

  
  drawSprites();
  
}

function spawnlaserrs() {
  if(calentamiento <= 200){
  if (keyDown("SPACE")) {
    laserr = createSprite(nave.x,nave.y,40,10);


    laserr.addImage(laserrImage);
    laserr.scale = 0.2;
    laserr.velocityY = -10;
    laser.play();

    laserr.lifetime = height+10;
    
    laserr.depth = nave.depth;
    nave.depth = nave.depth + 1;
    
    laserrsGroup.add(laserr);
  }

} 
}

function spawnlaserrsfriends(){
if(friends.y < nave.y+200){
  if(calentamiento <= 200){
    if (keyDown("SPACE")) {
      laserr = createSprite(friends.x,friends.y,40,10);
  
  
      laserr.addImage(laserrImage);
      laserr.scale = 0.2;
      laserr.velocityY = -10;
      laser.play();
  
      laserr.lifetime = height+10;
      
      laserr.depth = nave.depth;
      nave.depth = nave.depth + 1;
      
      laserrsGroup.add(laserr);
    }
  } 
 }
}

function spawnlaserrsfriends2(){
  if(friends.y < nave.y+200){
  if(calentamiento <= 200){
    if (keyDown("SPACE")) {
      laserr = createSprite(friends2.x,friends2.y,40,10);
  
  
      laserr.addImage(laserrImage);
      laserr.scale = 0.2;
      laserr.velocityY = -10;
      laser.play();
  
      laserr.lifetime = height+10;
      
      laserr.depth = nave.depth;
      nave.depth = nave.depth + 1;
      
      laserrsGroup.add(laserr);
    }
  
  } 
}
}

function spawnlasersenemi() {
  if(enemigo.y > 0){

  if (frameCount % 10 === 0) {
    laserr = createSprite(enemigo.x,enemigo.y,40,10);

    laserr.addImage(laserrImage);
    laserr.scale = 0.2;
    laserr.velocityY = 10;

    laserr.lifetime = height;
    
    laserr.depth = nave.depth;
    nave.depth = nave.depth + 1;
    
    laserrsGroup2.add(laserr);
  

  }  
 }
}

function spawnlasersenemi2() {
  if(enemigo2.y > 0){

  
  if (frameCount % 10 === 0) {
    laserr = createSprite(enemigo2.x,enemigo2.y,40,10);

    laserr.addImage(laserrImage);
    laserr.scale = 0.2;
    laserr.velocityY = 10;

    laserr.lifetime = height;
    
    laserr.depth = nave.depth;
    nave.depth = nave.depth + 1;
    
    laserrsGroup2.add(laserr);
  

  }
}
}

function spawnObstacles(){ 
if (frameCount % 50 === 0) {
 
    obstacle = createSprite(20,camera.y-500,10,40);
    obstacle.x = Math.round(random(0,windowWidth));

    obstacle.velocityY = 10;
   


    
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
    }
    
    obstacle.scale = 0.5;
    obstacle.lifetime = height+5;
    obstaclesGroup.add(obstacle);

    
    
   
  
  
    
  
  }
  

  
}

function spawnenemis(){ 
  if (frameCount % 500 === 0) {
   
      enemigo = createSprite(20,camera.y-500,10,40);
      enemigo.x = Math.round(random(0,windowWidth));
  
      enemigo.velocityY = 2;
      enemigo.velocityX = 10;
      
      

     
      enemigo.addAnimation("enemigo",nave2i);

      
      enemigo.lifetime = height;
      
      enemigo.scale = 0.2;
      enemigoGroup.add(enemigo);
      
    
    }
    
  
    
  }

  function spawnenemis2(){ 

    if (frameCount % 1300 === 0) {
     
        enemigo2 = createSprite(nave.x,camera.y-500,10,40);
    
        enemigo2.velocityY = 2;
        
        
  
       
        enemigo2.addAnimation("enemigo",nave2i);
  
        
        enemigo2.lifetime = height;
        
        enemigo2.scale = 0.2;
        enemigoGroup2.add(enemigo2);
        
      
      }enemigo2.x = nave.x

    
      
    }


  function spawnasteroids(){ 
    if (frameCount % dificult === 0) {
     
        asteroids = createSprite(20,camera.y-500,10,40);
        asteroids.x = Math.round(random(0,windowWidth));
    
        asteroids.velocityY = 10;
        
        
  
       
        asteroids.addAnimation("asteroids",asteroidsi);
  
        
        asteroids.lifetime = height;
        
        asteroids.scale = 0.2;
        asteroidsGroup.add(asteroids);
      
      }
      
    }

    function spawnfriends(){ 
      if (frameCount % 500 === 0) {
       
          friends = createSprite(nave.x-100,height,10,40);
          friends2 = createSprite(nave.x+100,height,10,40);

          friends.velocityY = -7;
          friends2.velocityY = -7;

          
          
    
         
          friends.addAnimation("nave",navei);
          friends2.addAnimation("nave",navei);

          
          //friends.lifetime = height;
          
          friends.scale = 0.1;
          friends2.scale = 0.1;

          friendsGroup.add(friends,friends2);
        deletefriends();
        }
        
      }

      function deletefriends(){ 
        if (frameCount % 500 === 0) {
         
            friends.velocityX = -7;
            friends2.velocityX = 7;
  
  
            
    
          
          }
          
        }
  
  





function reset(){
  gameState = 1;
  gameOver.visible = false;
  restart.visible = false;
  
  resetgroup.destroyEach();
  obsjetosgroup.destroyEach();
  enemigoGroup.destroyEach();
  obstaclesGroup.destroyEach();
  laserrsGroup.destroyEach();
  laserrsGroup2.destroyEach();
  asteroidsGroup.destroyEach();
  enemigoGroup2.destroyEach();


  dificult = 10;
  score = 0;
  nave.x = windowWidth/2;
 calentamiento = 1;
  

 enemigo.lifetime = 100;
 enemigo.velocityY = 2;


 enemigo = createSprite(-100,-10,20,20);
 enemigo2 = createSprite(-100,-20,20,20);
 nave.changeAnimation("nave",navei);
 friendsGroup.destroyEach();

 friends = createSprite(-100,-10,20,20);
 friends2 = createSprite(-100,-20,20,20);

 enunciado = enunciado + 1;

};
    

function reset2(){
  nave.changeAnimation("nave",navei);
dificult = 10;
  
  resetgroup.destroyEach();
  obsjetosgroup.destroyEach();
  enemigoGroup.destroyEach();
  enemigoGroup2.destroyEach();
  obstaclesGroup.destroyEach();
  laserrsGroup.destroyEach();
  laserrsGroup2.destroyEach();
  asteroidsGroup.destroyEach();
  friendsGroup.destroyEach();

 
  enemigo = createSprite(-100,-10,20,20);
  enemigo2 = createSprite(-100,-20,20,20);

  friends = createSprite(-100,-10,20,20);
  friends2 = createSprite(-100,-20,20,20);
  

  enunciado = enunciado + 1;

};
    











