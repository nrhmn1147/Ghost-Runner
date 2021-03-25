var towerImage, tower;
var doorImage, door, doorsGroup;
var climberImage, climber, climbersGroup;
var ghostImage, ghost;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";
var spookySound;

function preload() {
  
  towerImage = loadImage("tower.png")
  doorImage = loadImage("door.png")
  climberImage = loadImage("climber.png")
  ghostImage = loadImage("ghost-standing.png")
  spookySound = loadSound("spooky.wav")
}

function setup () {
  
  createCanvas(600,600)
  
  tower = createSprite(300, 300)
  tower.addImage("tower", towerImage);
  tower.velocityY = 1
  
  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage("ghost", ghostImage);
  ghost.scale = 0.3;

  spookySound.loop();
  
  invisibleBlockGroup = new Group();  
  doorsGroup = new Group();
  climbersGroup = new Group();
}

function draw () {
  
  background(0);
  
  if(gameState === "play") {
    
    if (tower.y>400) {
      tower.y=300;
    }

    if(keyDown("space")) {
      ghost.velocityY = -5;
    }

    ghost.velocityY = ghost.velocityY+0.8;

    if(keyDown("left_arrow")) {
      ghost.x = ghost.x-3;
    }

    if(keyDown("right_arrow")) {
      ghost.x = ghost.x+3;
    }

    if(climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }

    if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600) {
      ghost.destroy();
      gameState = "end";
    }


    spawnDoors();
    drawSprites();  
  }

  if(gameState === "end") {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230, 250);
  }
  
}

function spawnDoors() {

  if(frameCount%240 === 0) {
    door = createSprite(200, -50);
    door.addImage("doorImage", doorImage);
    door.x = Math.round(random(120, 400));
    door.velocityY = 1;
    door.lifetime = 800;
    doorsGroup.add(door);
    
    climber = createSprite(200, 10);
    climber.addImage("climberImage", climberImage);
    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifetime = 800;
    climbersGroup.add(climber);
    
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlockGroup.add(invisibleBlock);
    //invisibleBlock.debug = true;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
  }
  
  
}

