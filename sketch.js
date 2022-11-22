var PLAY = 1;
var END = 0;
var gameState = PLAY;

var flappy, flappyImg

var ground, invisibleGround, groundImage

var obstacle, obstacleImg

let backgroundImg, background1;

var score;
var gameOverImg, restartImg
var jumpSound, checkPointSound, dieSound

function preload() {
  restartImg = loadImage('restart.png')
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  flappyImg = loadImage('flappybird.png')
  backgroundImg = loadImage('flappyBackground.png')
  obstacleImg = loadImage('obstacle.png')
  gameOverImg = loadImage('gameOver.png')
}

function setup() {
  createCanvas(2200, 1300);

  gameOver = createSprite(300, 100);
  gameOver.addImage(gameOverImg);

  restart = createSprite(300, 140);
  restart.addImage(restartImg);

  flappy = createSprite(100, 200)
  flappy.addImage(flappyImg)
  flappy.scale = .06
  flappy.velocityX = 2

  obstacle = createSprite(2000, 650)
  obstacle.addImage(obstacleImg)
  obstacle.scale = 1.7
  obstacle.velocityX = -3


  background1 = createSprite(800, 500)
  background1.addImage(backgroundImg)
  background1.scale = 1.5
  background1.velocityX = -3


  gameOver.scale = 0.5;
  restart.scale = 0.5;

  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  score = 0;

}

function draw() {
  background('gray');

  //displaying score
  text("Score: " + score, 500, 50);

  obstacle.debug = true
  flappy.debug = true

  if (gameState === PLAY) {
    gameOver.visible = false;
    restart.visible = false;
  }

  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
  }

  if (background1.x < 700) {
    background1.x = background1.width / 2
  }


  if (mousePressedOver(restart)) {
    reset();
  }

  if (flappy !== false) {
    flappy.velocityY = 5
  }

  if (keyDown('space')) {
    flappy.velocityY = -5
  }

  if (flappy.isTouching(obstacle)) {
    flappy.visible = false;
  }

  flappy.depth = background1.depth
  flappy.depth = flappy.depth + 1

  obstacle.depth = background1.depth
  obstacle.depth = obstacle.depth + 1

  drawSprites();
}

function reset() {


}


function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 165, 10, 40);
    obstacle.velocityX = -(6 + score / 100);

    //generate random obstacles
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1: obstacle.addImage(obstacle1);
        break;
      case 2: obstacle.addImage(obstacle2);
        break;
      case 3: obstacle.addImage(obstacle3);
        break;
      case 4: obstacle.addImage(obstacle4);
        break;
      case 5: obstacle.addImage(obstacle5);
        break;
      case 6: obstacle.addImage(obstacle6);
        break;
      default: break;
    }

  }
}


