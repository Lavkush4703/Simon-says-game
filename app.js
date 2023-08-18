let gameSeq = [];
let userSeq = [];
let score = [];

let btns = ["red", "yellow", "green", "purple"];

let h2 = document.querySelector("h2");
let started = false;
let level = 0;

document.addEventListener("keypress",function(event){
    if(event.code == "Enter"){
    if(started == false){
        // console.log("game started");
        started = true;

        setTimeout(levelUp, 300);
    }
}
});

function gameFlash(btn){
    btn.classList.add("gameflash");
    setTimeout(function(){
        btn.classList.remove("gameflash");
    },250);
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    
    let btnIdx = Math.floor(Math.random()*3);
    let randCol = btns[btnIdx];
    let randBtn = document.querySelector(`.${randCol}`);
    gameSeq.push(randCol);
    console.log(gameSeq);
    gameFlash(randBtn);
}
function cheakAns(idx){
    // let idx = level - 1;
    if(userSeq[idx] === gameSeq[idx]){
       if(userSeq.length == gameSeq.length){
        setTimeout(levelUp, 1000);
       }
    }else{
        score.push(level);
        let highScore = 0;
        for(let i=0; i<score.length; i++){
            if(highScore < score[i]){
                highScore = score[i];
            }
        }
        h2.innerHTML = `Game over! Your score was <b>[${level}]<b> <br> Highest Score <b>${highScore} <b> <br> Press (Enter) to Restart!`; 
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        startAgain();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    userCol = btn.getAttribute("id");
    userSeq.push(userCol);

    cheakAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
   btn.addEventListener("click", btnPress);
}

function startAgain(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
