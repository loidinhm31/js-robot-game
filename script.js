// declare variables
var doorImg = document.getElementsByClassName("reset-door");
var doorImgs = [...doorImg];

var conElement = document.getElementsByClassName("game-door");
var conElements = [...conElement];


var openedDoors = [];


var restartBtn = document.getElementById("restart-btn");
var currStreak = document.getElementById("curr");
var bestStreak = document.getElementById("best");

var score = 0;
var bestScore = 0;

//

function openDoor() {
    this.children[0].classList.add("show-img");
    doorActive(this);

};

// main function

function doorActive(door) {
    // append element (door opened) to the array
    openedDoors.push(door);

    // compare result of door opened
    let robot = "images/robot.svg";

     //check open 2 doors first
    if (openedDoors[0].children[0].getAttribute("src") === robot || openedDoors[1].children[0].getAttribute("src") === robot) {
        // recognize score
        score = 0;
        bestScore = this.bestScore;
        currStreak.innerHTML = score;

        // change content of button
        restartBtn.innerHTML = "Game Over! <br> Play Again?";

    } else if (openedDoors[2].children[0].getAttribute("src") === robot) {
    //the last door is win
        //regconize score
        score++;
        if (bestScore > score) {
            bestScore = this.bestScore;
        } else {
            bestScore = this.score;
        };

        currStreak.innerHTML = score;
        bestStreak.innerHTML = bestScore;

        // change content of button
        restartBtn.innerHTML = "You Win! Play Again?";

        // remove event click door, satisfy root if/else condition above
        for (var i = 0; i < conElements.length; i++) {
            conElements[i].removeEventListener("click", openDoor);
        };
    };

};


// shuffle the order of doors before starting game
function shuffle(array) {
    let currIndex = array.length;
    let tempValue;
    let randIndex;

    while (currIndex !== 0) {
        randIndex = Math.floor(Math.random() * currIndex);
        currIndex -= 1;
        tempValue = array[currIndex];
        array[currIndex] = array[randIndex];
        array[randIndex] = tempValue;
    };

    return array;
};




function startGame() {
    // create shuffle action for array of door images
    let shuffledImages = shuffle(doorImgs);

    for(let i=0; i < shuffledImages.length; i++) {
        //remove all images from previous games from each door (if any)
        conElements[i].innerHTML = "";

        //add the shuffled images to each door
        conElements[i].appendChild(shuffledImages[i]);

        //remove all extra classes for game play
        conElements[i].children[0].classList.remove("show-img");

    };

    //remove check if/else doorActive func
    openedDoors = [];
    restartBtn.innerHTML = "Good luck!"


    for (var i = 0; i < conElements.length; i++) {
        conElements[i].addEventListener("click", openDoor);
    };

};


function tryAgain() {
    startGame();
}


// add event for clicking door
for (var i = 0; i < conElements.length; i++) {
    conElements[i].addEventListener("click", openDoor);
};

// add event for clicking red button
restartBtn.addEventListener("click", tryAgain);

startGame();