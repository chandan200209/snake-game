// Game constants and variables
let inputDir = { x: 0, y: 0 };
const gameOverSound = new Audio("./music/gameover.mp3");
const foodSound = new Audio("./music/food.mp3");
const moveSound = new Audio("./music/move.mp3");
const backgroundMusicSound = new Audio("./music/music.mp3");
backgroundMusicSound.volume = 0.40;

let speed = 6;
let lastPaintTime = 0;
let score = 0;
let highscoreval;
let snakeArr = [{
    x: 13, y: 15
}]
let food = {
    x: 16, y: 8
}

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < (1 / speed)) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollided(snakeArray) {
    // If you bump into yourself
    for (let i = 1; i < snakeArray.length; i++) {
        if (snakeArray[i].x === snakeArray[0].x && snakeArray[i].y === snakeArray[0].y) {
            return true;
        }
    }
    // If you bump into the wall
    if (snakeArray[0].x >= 18 || snakeArray[0].x <= 0 || snakeArray[0].y >= 18 || snakeArray[0].y <= 0) {
        return true;
    }
}
function gameEngine() {
    // Part 01 : Update the snake array and food
    if (isCollided(snakeArr)) {
        backgroundMusicSound.pause();
        gameOverSound.play();
        inputDir = { x: 0, y: 0 };
        alert("Game Over!! Press OK to play again.");
        score = 0;
        scoreGame.innerHTML = "Score : 0";
        snakeArr = [{ x: 13, y: 15 }];
        backgroundMusicSound.play();
    }
    // If you've eaten the food, increment the score and regenerate the food
    if ((snakeArr[0].x === food.x) && (snakeArr[0].y === food.y)) {
        score += 1;
        scoreGame.innerHTML = "Score : " + score;
        if (score > highscoreval) {
            highscoreval = score;
            localStorage.setItem("Highscore", JSON.stringify(highscoreval));
            highScoreGame.innerHTML = "Highscore : " + highscoreval;
        }
        foodSound.play();
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }
    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        // const element = snakeArr[i];
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 02 : Display the snake and food
    // displaying the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    // displaying the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Game Main Logic
let highscore = localStorage.getItem("highscore");
if (highscore === null) {
    highscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval));
}
else {
    highscoreval = JSON.parse(highscore);
    highScoreGame.innerHTML = "Highscore : " + highscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };
    moveSound.play();
    backgroundMusicSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log('ArrowUp');
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log('ArrowDown');
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log('ArrowLeft');
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log('ArrowRight');
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})