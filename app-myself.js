const $form = document.querySelector("#form");
const $input = document.querySelector("#input");
const $logs = document.querySelector("#logs");

const answer = [];

for(let i=0;i<4;i++){
    randomNum = Math.floor(Math.random()*9)+1;
    if(answer.indexOf(randomNum) === -1){
        answer.push(randomNum);
    }else{
        i--;
    }
}
console.log(answer);
let tries = [];
let out = 0;

function checkInput(input){
    if(input.length !== 4){
        alert("4자리 숫자 입력해주세요.");
    }else if(new Set(input).size !== 4){
        alert("중복된 숫자가 있습니다.");
    }else if(tries.includes(input)){
        alert("이미 시도한 숫자입니다.");
    }
    return true;
}

function onFormSubmit(event){
    event.preventDefault();
    const value = $input.value;
    $input.value = "";
    if(!checkInput(value)){
        return;
    }
    //value 이상 없을 때
    //홈런
    if(answer.join('') === value){
         // [3,1,4,6]을 뽑았을 때 join을 하면 '3146' 이라는 문자열로 바뀜 
        //배열을 문자열로 바꾸는 함수가 join 
        //('')을 안 쓰면 '3,1,4,6' 이렇게 콤마가 붙음
        //반대로 split() 하면 배열로 바뀜. 
        $logs.innerText = '홈런';
        return;
    }
    //10번 이상 시도 했을 때
    if(tries.length >= 9){
        const message = document.createTextNode(`패배! 정답은 ${answer.join()} 이었습니다.`);
        $logs.appendChild(message);
        return;
    }

    let ball = 0;
    let strike = 0;
    for(let i=0;i<value.length;i++){
        const index = value.indexOf(answer[i]); 
        if(index > -1){
            if(index === i){
                strike++;
            }else{
                ball++;
            }
            }
        }

        if(ball === 0 && strike === 0){
            out++;
            $logs.append(`${out} out`,document.createElement('br'));
         
        }else{
            $logs.append(`${value} : ${strike} 스트라이크, ${ball}  볼`,document.createElement('br'));
     
        }
     if(out === 3){ 
        $logs.append(`패배입니다. 정답은 ${answer} 입니다.`);
        $form.removeEventListener("submit",onFormSubmit);
    }
    tries.push(value);
    console.log(tries);
}
$form.addEventListener("submit",onFormSubmit);