const $result = document.querySelector("#result");
const $bonus = document.querySelector("#bonus");
const candiate = Array(45).fill(1).map((element,index) => {return element+index});
const shuffle = [];
//피셔-예이츠 셔플 알고리즘
while(candiate.length > 0){
    const random = Math.floor(Math.random() * candiate.length);
    const spliceArray = candiate.splice(random,1);
    const value = spliceArray[0];
    shuffle.push(value); 
}
//shuffle.splice(0,6).sort((a,b)=> a-b);
const winBalls = shuffle.splice(0,6).sort((a,b) => {return a-b;});
const bonusBall = shuffle[6];

const showBallStyle = (num,tar) => {
    if(num<10){
        tar.style.backgroundColor = 'red';
        tar.style.color = 'white';
    }else if(num<20){
        tar.style.backgroundColor = 'orange';
    }else if(num<30){
        tar.style.backgroundColor = 'yellow';
    }else if(num<40){
        tar.style.backgroundColor = 'blue';
        tar.style.color = 'white';
    }else{
        tar.style.backgroundColor = 'green';
        tar.style.color = 'white';
    }
};
const showBall = (number, target) => {
    const $ball = document.createElement('div');
    $ball.className = 'ball';
    $ball.textContent = number;
    target.appendChild($ball); 
    showBallStyle(parseInt(number),$ball);
};

for(let i=0;i<winBalls.length ;i++){
    setTimeout(() => {
        showBall(winBalls[i],$result);
    },1000 * (i+1));
}
setTimeout(() => {
    showBall(bonusBall,$bonus);
},7000);
console.log(winBalls);