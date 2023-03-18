const $form = document.querySelector("#form");
const $answer = document.querySelector("#answer");
const $result = document.querySelector("#result");

let answer = [];
let tries = [];

function randomNum(){
    let num = Array(9).fill().map((x,i)=>x=i+1);
    for(let i=0;i<4;i++){
        const value = num.splice(Math.floor(Math.random()*num.length),1)[0];
        answer.push(value);
    }
}
randomNum();
console.log('answer',answer);
function onStartGAme(event){
    event.preventDefault();
    let $input = event.target.input.value;
    $input = $input.split(' ').map((i)=> Number(i));
    console.log('input',$input);
    if($input.length !== 4){
        alert('숫자 4개만 입력해주세요');
        return;
    }
    if(new Set($input).size !== 4){
        alert('중복되는 숫자가 있습니다.');
        return;
    }
    if(answer.join('') === $input.join('')){
        $result.textContent = '홈런!';
        return;
    }
    if(tries.length === 10){
        $result.innerText(`패배! 정답은 ${answer.join()}입니다.!`);
        return;
    }

    if(tries.includes($input.join())){
        alert('이미 시도한 값입니다.');
        return;
    }
    tries.push($input.join());
    console.log('tries',tries);
    
    if(tries.length === 10){
        $result.textContent = `패배! 10번기회 소진하였습니다. 정답은 ${answer.join()}입니다!`;
        return;
    }
    let ball = 0;
    let strike = 0;
    for(let i=0;i<4;i++){
        if(answer.includes($input[i])){
            if(answer[i]===$input[i]){
                strike++;
                continue;
            }
            ball++;
        }
    }
    $result.textContent = `${ball}ball ${strike}strike`;

}
$form.addEventListener('submit',onStartGAme);
