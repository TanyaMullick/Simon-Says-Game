let gameSeq=[];
let userSeq=[];

let btns=["red","blue","green","yellow"];

let level=0;
let started=false;

let h3=document.querySelector("h3");

document.addEventListener("keypress",function(){ 
    if(started == false){
        console.log("Key Game is started");
        started=true;

        levelUp();
    }
});

//Flash buttons and level up
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

//user flash
function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);
}
function levelUp(){
    userSeq=[];

    level++;
    h3.innerText="Level "+level;

    // random button flash
    let randIdx=Math.floor(Math.random()*3);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector("."+randColor);
    // console.log(randBtn);
    // console.log(randIdx);
    // console.log(randColor);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

//Check answer
function checkAns(idx){
    //console.log("curr level :",level)
    //let idx=level-1;
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length===gameSeq.length){
            setTimeout(levelUp,1000);
                
        }
            
    }else{    
        //score
        h3.innerHTML=`Game Over!Your score is <b>${level}</b>. <br>Press Any Key to Restart`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.body.style.backgroundColor="white";
        },500);
        reset();
    }
}

//Button Event Listener
function btnPress(){
    let btn=this;
    userFlash(btn);

    userColor=btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
allBtns.forEach(function(btn){
    btn.addEventListener("click",btnPress);
});

//reset
function reset(){
    level=0;
    gameSeq=[];
    userSeq=[];
    started=false;
}

//highest score
let highScore=0;
function updateHighScore(){
    if(level>highScore){
        highScore=level;
    }
    document.querySelector(".high-score").innerText="High Score: "+highScore;
}