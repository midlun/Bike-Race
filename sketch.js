var road,mC;

var END =0;
var PLAY =1;
var gameState = PLAY;

var op1,op2,op3;

var path,mpI1,mpI2, op1I,op1DI,op2I,op2DI,op3I,op3DI,gOI;
var bellS;

var pinkG,yellowG,redG;
var pink,red,yellow;

var distance=0;

var gO, reset;

function preload()
{
  path = loadImage("images/Road.png");
  
  mpI1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mpI2= loadAnimation("images/mainPlayer3.png");
  
  op1I = loadAnimation("images/opponent1.png","images/opponent2.png");
  op1DI = loadAnimation("images/opponent3.png");
  
  op2I = loadAnimation("images/opponent4.png","images/opponent5.png");
  op2DI = loadAnimation("images/opponent6.png");
  
  op3I = loadAnimation("images/opponent7.png","images/opponent8.png");
  op3DI = loadAnimation("images/opponent9.png");
  
  gOI = loadImage("images/gameOver.png");
  
  bellS = loadSound("sound/bell.mp3");
}

function setup()
{
createCanvas(1200,300);
  
road = createSprite(100,150);
road.addImage(path);
road.velocityX = -5;

//creating boy running
mC  = createSprite(70,150);
mC.addAnimation("cycling",mpI1);
mC.scale=0.07;
  
gO = createSprite(650,150);
gO.addImage("gameOver",gOI);
gO.scale = 0.8;
  
  pinkG = new Group();
  redG = new Group();
  yellowG = new Group();
}

function draw() 
{
  drawSprites();
  
   if(gameState===PLAY)
  {
   gO.visible = false;
     distance = distance + Math.round(getFrameRate()/50);
    road.velocityX = -(6 + 2*distance/150);
    
   mC.y = World.mouseY;
  
   edges= createEdgeSprites();
   mC .collide(edges);
    
    if(road.x < 0 )
  {
    road.x = width/2;
  }
    
    if(keyDown("space"))
      {
        bellS.play()
      }
    
    var sP = Math.round(random(1,3));
    if(World.frameCount % 150 == 0)
      {
        if(sP == 1)
          {
            pinkC();
          }
        else if(sP == 2)
          {
            redC();
          }
        else if(sP == 3)
          {
            yellowC();
          }
      }
    
    if(pinkG.isTouching(mC))
      {
        gameState = END;
        op1.velocityY = 0;
        op1.addAnimation("op1die",op1DI);
      }
    
    if(redG.isTouching(mC))
      {
        gameState = END;
         op2.velocityY = 0;
        op2.addAnimation("op2die",op2DI);
      }
    
    if(yellowG.isTouching(mC))
      {
        gameState = END;
        op3.velocityY = 0;
        op3.addAnimation("op3die",op3DI);
      }
 }
  
  else if(gameState===END)
    {
      gO.visible = true;
    textSize(20);
    fill(255);
    text("PRESS UP_ARROW TO RESTART THE GAME",500,200);
      
      road.velocityX = 0;
      mC.velocityY = 0;
      mC.addAnimation("destroyed",mpI2);
      
      pinkG.setVelocityXEach(0);
      pinkG.setLifetimeEach(-1);
      redG.setVelocityXEach(0);
      redG.setLifetimeEach(-1);
      yellowG.setVelocityXEach(0);
      yellowG.setLifetimeEach(-1);
      
      if(keyDown("UP_ARROW"))
        {
          reset();
        }
    }
  
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
}

function pinkC()
{
  op1 = createSprite(1100,Math.round(random(50,250)))
  op1.scale = 0.06;
  op1.velocityX = -(6 + 2*distance/150);
  op1.addAnimation("player1",op1I);
  op1.lifetime = 170;
  
  pinkG.add(op1);
}

function redC()
{
  op2 = createSprite(1100,Math.round(random(50,250)))
  op2.scale = 0.06;
  op2.velocityX = -(6 + 2*distance/150);
  op2.addAnimation("player2",op2I);
  op2.lifetime = 170;
  
  redG.add(op2);
}

function yellowC()
{
  op3 = createSprite(1100,Math.round(random(50,250)))
  op3.scale = 0.06;
  op3.velocityX = -(6 + 2*distance/150);
  op3.addAnimation("player3",op3I);
  op3.lifetime = 170;
  
  yellowG.add(op3);
}

function reset()
{
  gameState = PLAY;
  gO.visible = false;
  
  pinkG.destroyEach();
  redG.destroyEach();
  yellowG.destroyEach();
  
  distance = 0;
  
  mC.addAnimation(mpI1);
}