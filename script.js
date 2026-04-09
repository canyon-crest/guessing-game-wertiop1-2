// Document Elements
const playBtn = document.getElementById("playBtn");
const guessBtn = document.getElementById("guessBtn");
const giveUpBtn = document.getElementById("giveUpBtn");
const msg = document.getElementById("msg");
const level = document.getElementsByName("level");
const guessNum = document.getElementById("guess");
const wins = document.getElementById("wins");
const avgScores = document.getElementById("avgScore");
const lb = document.getElementsByName("leaderboard");


// prompt name
let playerName = prompt("What is your name?").toLowerCase();
playerName[0].toUpperCase();
console.log(playerName);



// initialize variables for guess game
let num = 0;
let range = 0;
let guessCnt = 0;
const scores = [];


// Functions
function play() {
  // Starts a new game: generates random answer, enables inputs, records start time
  
  // Set up
  for (let i=0;i<level.length;i++) {
    if (level[i].checked) {
      range = parseInt(level[i].value);
    }
    level[i].disabled = true;
  }


  msg.textContent= "Guess a number 1-"+range;
  num = Math.floor(Math.random() * range) + 1; 


  playBtn.disabled = true;
  guessBtn.disabled = false;
  giveUpBtn.disabled = false;
  

  // reset to old values
  guessCnt = 0;

}

function makeGuess() {
  // Handles a guess: compares to answer, shows feedback, tracks guess count

  let guess = parseInt(guessNum.value);
  
  if (isNaN(guess) || guess < 1 || guess > range) {
    msg.textContent = "Please enter a valid number";
    return;
  }
  guessCnt++;
  if (guess === num) {
    msg.textContent = "Correct" + playerName + "! It took " + guessCnt + " tries.";
    updateScore(guessCnt);
    reset();
    return;
  }
  let diff = Math.abs(guess-num);
  let hcwText = "";
  if (diff <= 2) {
    hcwText = "hot";
  } else if (diff <= 5) {
    hcwText = "warm";
  } else {
    hcwText = "cold";
  }
  if (guess < num) {
    msg.textContent = "Too low! " + playerName + " are " + hcwText + ".";
  } else {
    msg.textContent = "Too high! " + playerName + " are " + hcwText + ".";
  }
  


}

function giveUp() {
  // Ends the round, sets score to range value, updates all stats
  updateScore(range);
  reset()
}

function time() {
  // Returns a formatted date/time string with month name, day suffix, and live time with seconds
}

function updateScore(score) {
  // Updates wins, average score, and leaderboard after a win or give up
  scores.push(score);
  wins.textContent = "Total wins: " + parseInt(scores.length);
  let totalScore = 0;
  for (let i = 0; i < scores.length; i++) {
    totalScore += scores[i];
  }
  console.log(totalScore);
  avgScores.textContent = "Average Score: " + totalScore/parseInt(scores.length);

  scores.sort(function(a,b){return a-b;});

  for (let i = 0; i < lb.length; i++) {
    if (i < scores.length) {
      lb[i].textContent = scores[i];
    }
  }
}

function updateTimers(endMs) {
  // Calculates round time, updates fastest game and average time
}

function reset() {
  playBtn.disabled = false;
  guessBtn.disabled = true;
  giveUpBtn.disabled = true;
  for (let i=0;i<level.length;i++) {
    level[i].disabled = false;
  }
}

// Event Listeners
playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);
giveUpBtn.addEventListener("click", giveUp);