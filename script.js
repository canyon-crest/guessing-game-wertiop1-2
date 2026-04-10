//#region Document Elements
const playBtn = document.getElementById("playBtn");
const guessBtn = document.getElementById("guessBtn");
const giveUpBtn = document.getElementById("giveUpBtn");
const msg = document.getElementById("msg");
const level = document.getElementsByName("level");
const guessNum = document.getElementById("guess");
const wins = document.getElementById("wins");
const avgScores = document.getElementById("avgScore");
const lb = document.getElementsByName("leaderboard");
const date = document.getElementById("date");
//#endregion

//#region prompt name
let playerName = prompt("What is your name?").toLowerCase();
playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1);
//#endregion

//#region initialize variables for guess game
let num = 0;
let range = 0;
let guessCnt = 0;
const scores = [];

let startMs = 0;
let gameTimes = [];

let totalGames = 0;
//#endregion

//#region Functions
function play() {
  // Starts a new game: generates random answer, enables inputs, records start time
  startMs = new Date().getTime()

  totalGames++;
  // Set up
  for (let i=0;i<level.length;i++) {
    if (level[i].checked) {
      range = parseInt(level[i].value);
    }
    level[i].disabled = true;
  }


  if (range === 1000) {
    msg.textContent= playerName + ", Guess a float 1-"+range;
    num = Math.random() * range + 1;
  } else {
    msg.textContent= playerName + ", Guess a number 1-"+range;
    num = Math.floor(Math.random() * range) + 1; 
  }
  



  playBtn.disabled = true;
  guessBtn.disabled = false;
  giveUpBtn.disabled = false;
  

  // reset to old values
  guessCnt = 0;

}

function makeGuess() {
  // Handles a guess: compares to answer, shows feedback, tracks guess count

  let guess = (range == 1000) ? guessNum.value : parseInt(guessNum.value);
  
  if (isNaN(guess) || guess < 1 || guess > range) {
    msg.textContent = "Please enter a valid number";
    return;
  }
  guessCnt++;
  if (guess === num) {
    msg.textContent = "Correct " + playerName + "! It took " + guessCnt + " tries.";
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
    msg.textContent = "Too low! " + playerName + " you are " + hcwText + ".";
  } else {
    msg.textContent = "Too high! " + playerName + " you are " + hcwText + ".";
  }
  

}

function giveUp() {
  // Ends the round, sets score to range value, updates all stats
  updateScore(range);
  reset()
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

  winRate.textContent = "Win Rate: " + parseInt(scores.length) * 100 / totalGames + "%";
  scores.sort(function(a,b){return a-b;});

  for (let i = 0; i < lb.length; i++) {
    if (i < scores.length) {
      lb[i].textContent = scores[i];
    }
  }

  updateTimers(new Date().getTime());
}

function reset() {
  playBtn.disabled = false;
  guessBtn.disabled = true;
  giveUpBtn.disabled = true;
  for (let i=0;i<level.length;i++) {
    level[i].disabled = false;
  }
}


function time() {
  // Returns a formatted date/time string with month name, day suffix, and live time with seconds
  let now = new Date();
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let suffix = "";
  if (now.getDate % 10 == 1) {
    suffix = "st";
  } else if (now.getDate % 10 == 2) {
    suffix = "nd";
  } else if (now.getDate % 10 == 3) {
    suffix = "rd";
  } else {
    suffix = "th";
  }
  let curTime = months[now.getMonth()] +", " + now.getDate() + suffix + ", " + now.getFullYear() + " " + now.getHours() + ":" +now.getMinutes() + ":" + now.getSeconds();
  return curTime;

}
date.textContent=time();
const intervalId = setInterval(()=> {
  date.textContent=time();
},1000
)

function updateTimers(endMs) {
  let gameTime = endMs - startMs;
  gameTimes.push(gameTime);
  let t1 = 0;
  for (let i = 0; i < gameTimes.length; i++) {
    t1 += gameTimes[i];
  }
  avgTime.textContent = "Average Time: " + (gameTime/parseInt(gameTimes.length))/1000;
  gameTimes.sort(function(a,b){return a-b;});
  fastest.textContent = "Fastest Time: " + gameTimes[0] / 100;
}
//#endregion



//#region Event Listeners
playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);
giveUpBtn.addEventListener("click", giveUp);
//#endregion