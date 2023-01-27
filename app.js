const {body} = document;
//const { body } = document; = const body = document.body;
//구조분해할당, 개체안의 속성이름과 변수 이름이 같을 때 사용가능
//const [one,two,three,four,five] = arr;
const $table = document.createElement('table');
const $result = document.createElement('div');
let turn = 'O';
const rows = [];
//[
//[td,td,td]
//[td,td,td]
//[td,td,td]
//]
function checkWinner(target){
    const rowIndex = target.parentNode.rowIndex;
    const cellIndex = target.cellIndex;
    //ri,ci => index 몇번째 칸인지 알려주는

    let hasWinner = false;
    //승부판단 세로 세 줄 가로 세 줄 대각선 두 줄 일 떄 이김.
    //가로줄
    if(rows[rowIndex][0].textContent === turn &&
        rows[rowIndex][1].textContent === turn &&
        rows[rowIndex][2].textContent === turn){
        hasWinner = true;
    }
    //세로줄
    if(rows[0][cellIndex].textContent === turn &&
        rows[1][cellIndex].textContent === turn &&
        rows[2][cellIndex].textContent === turn){
        hasWinner = true;
    }
    //대각선
    if(rows[0][0].textContent === turn &&
        rows[1][1].textContent === turn &&
        rows[2][2].textContent === turn){
        hasWinner = true;
    }
    if(rows[0][2].textContent === turn &&
        rows[1][1].textContent === turn &&
        rows[2][0].textContent === turn){
        hasWinner = true;
    }
    return hasWinner;

}
function checkWinnerAndDraw(target){
    if(checkWinner(target)){
        $result.textContent = `${turn}님이 승리!`;
        $table.removeEventListener('click',callback);
        return;
    }
    //무승부(칸이 꽉 찼으면)
    if(rows.flat().every((cell) => cell.textContent)){
        $result.textContent = '무승부';
    }
    turn = turn === 'X' ? 'O' : 'X';
}
let clickable = true;
const callback = (event) => {
    if(!clickable) return;
    if(event.target.textContent !== ''){//칸이 이미 채워져 있는가?
        console.log('빈칸이 아닙니다.');
        return;
    }
    console.log('빈칸입니다.');
    event.target.textContent = turn;
    //승부확인
    
    checkWinnerAndDraw(event.target);
  
    if(turn === 'X'){
        clickable = false;
        let emptycell = rows.flat().filter((v)=>!v.textContent);
        let randomcell = emptycell[Math.floor(Math.random()*emptycell.length)];
        //o가 아닌 곳에 랜덤으로
        setTimeout(()=>{
            randomcell.textContent = turn;
            checkWinnerAndDraw(event.target);
            clickable = true;
        },1000);
    }
};

for(let i=1;i<=3;i++){
    const $tr = document.createElement('tr');
    const cells = [];
    for(let j=1;j<=3;j++){
        const $td = document.createElement('td');
        cells.push($td);
        $tr.append($td);
    }
    $table.append($tr);
    rows.push(cells);
}
$table.addEventListener("click",callback);

body.append($table);
body.append($result);


