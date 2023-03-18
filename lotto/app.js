const $result = document.querySelector("#result");
const $bonus = document.querySelector("#bonus");
const $form = document.querySelector("#form");
const $input = document.querySelector("#input");
const $lotto_result = document.querySelector("#lotto-result");

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
console.log('winBalls',winBalls);

function checkInput(input){
    //6자리인가
    console.log('input',input);
    if(input.length !== 6){
        alert("숫자 6개 입력하세요.");
    }
    //중복된 숫자가 없는가
    else if(new Set(input).size !== input.length){
        alert("중복된 숫자가 있습니다.");
    }
    return true;
}


function onSubmit(event){
    event.preventDefault();
    let data = $input.value.split(' ').map(Number);
    console.log('data',data);
    let data2 = [...data];
    console.log('data2',data2);
    $input.value = "";

    if(!checkInput(data)){
        return;
    }

    //검사 완료 후
    let sameThings = winBalls.filter(it => data.includes(it));
    console.log('same',sameThings);
    let difference = data2.concat(sameThings).filter(item => !data2.includes(item) || !sameThings.includes(item));
   
    console.log('difference',difference);
    if(sameThings.length == 6){
        $lotto_result.textContent = '축하합니다. 1등! 6개 모두 맞췄습니다.';
    }
    else if(sameThings.length == 5){
        if(difference.includes(bonusBall) == true){
            $lotto_result.textContent = '2등! 5개+보너스볼 맞췄습니다.';
        }else{
            $lotto_result.textContent = '3등! 5개 맞췄습니다.';
        }
    }else if(sameThings.length == 4){
        $lotto_result.textContent = '4등! 4개 맞췄습니다.';
    }else if(sameThings.length == 3){
        $lotto_result.textContent = '5등! 3개 맞췄습니다.';
    }else{
        $lotto_result.textContent = `${sameThings.length}개 맞췄습니다.`;
    }
}
$form.addEventListener("submit",onSubmit);