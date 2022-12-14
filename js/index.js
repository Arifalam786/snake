// game constants & variable
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('point.ogg');
const gameOverSound = new Audio('die.ogg');
const moveSound = new Audio('swoosh.ogg');
const musicSound = new Audio('bg music1.mp3');
const musicSound2 = new Audio('bg music2.mp3');

let speed = 3;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 7 }




// Game Function
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}

function isCollide(snake) {
    // when snake bite itself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    };
    // when the snake colloid with the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }



}

function gameEngine() {
    // Part 1: Updating the snake array & Food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        speed = 3;
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press any key to play again!");
        snakeArr = [{ x: 13, y: 15 }];
        // musicSound.play();
        score = 0;
    }
    // when snake eaten the food, increment the score and regenerate the food randomly
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        speed += 0.25;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem('hiscore', JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "Hi Score: " + hiscoreval;
        }
        scoreBox.innerHTML = 'Score: ' + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y }); // add one into snake in the moving dir
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }

    };
    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {

        snakeArr[i + 1] = {...snakeArr[i] };

    };

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // Part 2: Display the snake and Food
    // display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head')

        } else {
            snakeElement.classList.add('snake')
        }

        board.appendChild(snakeElement);

    });
    // display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}

// Main logic starts here

let hiscore = localStorage.getItem('hiscore');
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem('hiscore', JSON.stringify(hiscoreval));
} else {
    hiscoreval = JSON.parse(hiscore)
    hiscoreBox.innerHTML = "Hi Score: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } // Start the game
    musicSound.play();
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }

});