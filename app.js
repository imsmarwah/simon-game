let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let btns = ['red','green','orange','purple'];

let highscore = localStorage.getItem("highscore") || 0;
document.getElementById("highscore").innerText = highscore;

const levelDisplay = document.getElementById("level");
const status = document.getElementById("status");
const startBtn = document.getElementById("startBtn");

// Start button
startBtn.addEventListener("click", function(){
    if(!started){
        started = true;
        startBtn.style.display = "none";
        levelUp();
    }
});

function levelUp(){
    userSeq = [];
    level++;
    levelDisplay.innerText = level;
    status.innerText = "Watch carefully...";

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    gameSeq.push(randColor);

    let randBtn = document.querySelector(`.${randColor}`);
    gameFlash(randBtn);
}

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(()=> btn.classList.remove("flash"),300);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(()=> btn.classList.remove("userflash"),200);
}

// Button click
let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(btn=>{
    btn.addEventListener("click", btnPress);
});

function btnPress(){
    if(!started) return;

    let btn = this;
    userFlash(btn);

    let userColor = btn.id;
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        gameOver();
    }
}

function gameOver(){
    status.innerHTML = `Game Over!`;
    document.body.style.background = "crimson";

    if(level > highscore){
        highscore = level;
        localStorage.setItem("highscore", highscore);
        document.getElementById("highscore").innerText = highscore;
    }

    setTimeout(()=>{
        document.body.style.background = "linear-gradient(135deg, #1f1c2c, #928dab)";
    },300);

    reset();
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    levelDisplay.innerText = 0;
    startBtn.style.display = "inline-block";
}