import "./style.css";

const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const bird = document.getElementById("bird");
const scoreText = document.getElementById("scoreText");

let score = 0;
setText("click to start!");

let isJumping = false;
let gameOver = true;
const birdHeight = 150;
const cactusHeight = 55;
let cactusDuration = 2.5;
let birdDuration = 4.5;
let speed = 1.0;

document.addEventListener("mousedown", () => jump());

setInterval(function () {
  update();
}, 10);

function update() {
  if (gameOver == false) {
    score = score + 1;
    setText("Score: " + score);

    checkGameOver();
  }

  increaseSpeed();
}

function increaseSpeed() {
  speed += 0.0003;

  cactusDuration = 3.5 / speed;
  birdDuration = 5.5 / speed;

  if (speed >= 2) {
    speed = 2;
  }

  cactus?.style.setProperty("--cactus-dur", cactusDuration.toString() + "s");
  bird?.style.setProperty("--bird-dur", birdDuration.toString() + "s");
}

function jump() {
  if (gameOver == false) {
    if (isJumping == false) {
      isJumping = true;
      dino?.classList.add("jump");
      setTimeout(removeJump, 500);
    }
  } else {
    startGame();
  }
}

function removeJump() {
  dino?.classList.remove("jump");
  isJumping = false;
  //mainLoop = mainLoop //bug fix?
}

function removeObstacles() {
  cactus?.classList.remove("cactusMove");
  bird?.classList.remove("birdMove");
}

function checkGameOver() {
  if (gameOver == false && dino != null && cactus != null && bird != null) {
    //get is dinosaur jumping
    const dinoTop = parseInt(
      window.getComputedStyle(dino).getPropertyValue("top")
    );

    //get cactus position
    const cactusleft = parseInt(
      window.getComputedStyle(cactus).getPropertyValue("left")
    );

    //get bird position
    const birdleft = parseInt(
      window.getComputedStyle(bird).getPropertyValue("left")
    );

    //detect collision
    if (
      (dinoTop >= birdHeight && Math.abs(cactusleft) < 7) ||
      (dinoTop <= cactusHeight && Math.abs(birdleft) < 11)
    ) {
      //end game
      console.log("player died!");
      setText("Final Score: " + score + "! Click To Play Again!");
      gameOver = true;

      //reset player
      removeJump();

      //reset cactus
      removeObstacles();
    }
  }
}

function startGame() {
  console.log("Game started!");
  gameOver = false;
  score = 0;
  cactus?.classList.add("cactusMove");
  bird?.classList.add("birdMove");
}

function setText(s: string) {
  if (scoreText) {
    scoreText.textContent = s;
  }
}
