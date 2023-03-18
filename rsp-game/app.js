const $computer = document.querySelector("#computer");
const $score = document.querySelector("#score");
const $scissors = document.querySelector("#scissors");
const $rock = document.querySelector("#rock");
const $papaer = document.querySelector("#paper");
const IMG_URL = './rsp.png';
// $computer.style.background = `url(${IMG_URL})`;
const rspX = {
    scissors:'0',
    rock:'-220px',
    paper:'-440px',
};
let computerChoice = 'scissors';
const changeComputerHand = () => {
    if(computerChoice === 'paper'){
        computerChoice = 'scissors';
    }else if(computerChoice === 'rock'){
        computerChoice = 'paper';
    }else if(computerChoice === 'scissors'){
        computerChoice = 'rock';
    }
    $computer.style.background = `url(${IMG_URL}) ${rspX[computerChoice]} 0`;
    $computer.style.backgroundSize = 'auto 200px';
    //이 자리에 setTimeout(changeComputerHand,50); 재귀함수로 가능.  
} 
//setInterval은 setTimeout으로 대체 가능. 
//but setInterval, setTimeout 둘 다 정확한 시간을 보장해주진 않음.
let intervalId = setInterval(changeComputerHand,50);

const scoreTable = {
    rock:0,
    scissors:1,
    paper:-1,
};
let clickable = true;//플래그 변수
let score = $score.innerText;

let count = 0;
let Computer = 0;
let Me = 0;
const clickButton = (event) => {
    if(clickable){
        clearInterval(intervalId);
        clickable = false;
        const myChoice = event.target.textContent === '바위'
        ? 'rock'
        : event.target.textContent === '가위'
        ? 'scissors'
        :'paper';
        let diff = scoreTable[myChoice] - scoreTable[computerChoice];

        //2,-1은 승리조건이고 -2,1은 패배조건.
        let message;

        if([1,-2].includes(diff)){
            message = '패배';
            score -= 1;
            Computer += 1;
        }else if([-1,2].includes(diff)){
            message = '승리';
            score += 1;
            Me += 1;
        }else{
            message = '무승부';
        }
        if(Me >= 3){
            $score.textContent = `나의 승리 ${Me}:${Computer}`;
        }else if(Computer >= 3){
            $score.textContent = `컴퓨터의 승리 ${Me}:${Computer}`;
        }else{ 
            $score.textContent = `${message} ${Me}:${Computer}`;
            setTimeout(() => {
                clickable = true;
                intervalId = setInterval(changeComputerHand,50)
            },1000);
        }
    }
};
$rock.addEventListener("click",clickButton);
$papaer.addEventListener("click",clickButton);
$scissors.addEventListener("click",clickButton);