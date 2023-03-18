let numOne = '';
let operator = '';
let numTwo = '';

const $operator = document.querySelector('#operator');
const $result = document.querySelector('#result');

const onClickNumber = (event) =>{
    //화살표 함수는 중괄호와 return이 만나면 생략 가능.
    //(number)=>()=> : 함수 안에 함수가 있다 or  함수가 함수를 return하고 있구나. => 고차함수라고 함.(high order fundtion)
    if(!operator){//연산자가 없을 때.
        numOne += event.target.textContent;
         $result.value += event.target.textContent; 
        return;
    }
    if(!numOne && operator==='-'){//첫 입력이 -값일 때
        numOne += (event.target.textContent * -1);
        $result.value += (event.target.textContent * -1); 
        operator = '';
        return;
    }

    if(!numTwo){//두번쨰 숫자 없을 때
        $result.value = '';
    }

    numTwo += event.target.textContent;
    $result.value += event.target.textContent; 
    };

document.querySelector('#num-0').addEventListener("click",onClickNumber);
document.querySelector('#num-1').addEventListener("click",onClickNumber);
document.querySelector('#num-2').addEventListener("click",onClickNumber);
document.querySelector('#num-3').addEventListener("click",onClickNumber);
document.querySelector('#num-4').addEventListener("click",onClickNumber);
document.querySelector('#num-5').addEventListener("click",onClickNumber);
document.querySelector('#num-6').addEventListener("click",onClickNumber);
document.querySelector('#num-7').addEventListener("click",onClickNumber);
document.querySelector('#num-8').addEventListener("click",onClickNumber);
document.querySelector('#num-9').addEventListener("click",onClickNumber);

const onClickOperator = (op) => () =>{
    if(numOne && numTwo){
        calculate();
    }
    if(numOne){
        operator = op;
        $operator.value = op;
    }    
    else if(!numOne && op === '-'){
        operator = op;
    }
    else{
        alert("숫자를 먼저 입력해주세요.");
    }
}
document.querySelector('#plus').addEventListener("click",onClickOperator('+'));
document.querySelector('#divide').addEventListener("click",onClickOperator('/'));
document.querySelector('#minus').addEventListener("click",onClickOperator('-'));
document.querySelector('#multiply').addEventListener("click",onClickOperator('*'));
document.querySelector('#clear').addEventListener("click",()=>{
    numOne = '';
    numTwo = '';
    operator = '';
    $result.value = '';
    $operator.value = '';
});
function calculate(){
    if(numTwo){
        switch(operator){
            case '+':
                $result.value = parseInt(numOne) + parseInt(numTwo);
                break;
            case '-':
                $result.value = numOne - numTwo;
                break;
            case '*':
                $result.value = numOne * numTwo;
                break;
            case '/':
                $result.value = numOne / numTwo;
                break;
        }
        $operator.value = '';
        numOne = $result.value;
        numTwo = '';
    }else{
        alert('숫자를 먼저 입력하세요.');
    }
}
document.querySelector('#Calculate').addEventListener("click",calculate);
