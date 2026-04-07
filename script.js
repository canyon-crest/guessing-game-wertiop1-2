// Document Elements
const playBtn = document.getElementById("playBtn");
const guessBtn = document.getElementById("guessBtn");
const giveUpBtn = document.getElementById("giveUpBtn");
const msg = document.getElementById("msg");
const level = document.getElementsByName("level");
// prompt name
let name = prompt("What is your name?");



// initialize variables for guess game
let num = 0;
let guess = 0;
let guessCnt = 0;
let totalWins = 0;
const scores = [];


// Functions
function play() {
  // Starts a new game: generates random answer, enables inputs, records start time
  
  // Set up
  let range = 0;
  for (let i=0;i<level.length;i++) {
    if (level[i].checked) {
      range = parseInt(level[i].value);
    }
    level[i].disabled = true;
  }


  msg.textContent= "Guess a number 1-"+range;
  playBtn.disabled = true;
  guessBtn.disabled = false;
  giveUpBtn.disabled = false;
  num = Math.floor(Math.random() * range) + 1; 

  // reset to old values
  guessCnt = 0;

}

function makeGuess() {
  // Handles a guess: compares to answer, shows feedback, tracks guess count
}

function giveUp() {
  // Ends the round, sets score to range value, updates all stats
}

function time() {
  // Returns a formatted date/time string with month name, day suffix, and live time with seconds
}

function updateScore() {
  // Updates wins, average score, and leaderboard after a win or give up
}

function updateTimers(endMs) {
  // Calculates round time, updates fastest game and average time
}

// Event Listeners
playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);
giveUpBtn.addEventListener("click", giveUp);