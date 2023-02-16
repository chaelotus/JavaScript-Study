const $form = document.querySelector("#form");
const $timer = document.querySelector("#timer");
const $tbody = document.querySelector('#table tbody');
const $result = document.querySelector('#result');
//아직 미완성
// const number = parseInt(prompt('몇칸을 하겠습니까?'));
// const landmine = [];

let row;
let cell;
let mine;
let openCount; //내가 몇 칸 열고 있는지 
let startTime;//게임 시작하자마자 초를 잼.
let interval;
let firstClick = true;

const CODE = {
    NOMAL : -1,//닫힌칸(지뢰없음)
    QUESTION : -2,
    FLAG : -3,
    QUESTION_MINE : -4,
    FLAG_MINE : -5,
    MINE : -6,
    OPENED : 0,
}
function onSubmit(event){
    event.preventDefault();
    row = parseInt(event.target.row.value);
    cell = parseInt(event.target.cell.value);
    mine = parseInt(event.target.mine.value);
    //form submit 하면 event.target이 form이 된다. 그 안에 id들 들어있는 것.
    //event.target.row 이렇게 되는 것
    openCount = 0;//다시 하고 싶을 때 submit누르면 값들이 다 초기화 될 수 있게.
    clearInterval(interval);
    $tbody.innerHTML = '';
    drawTable();
    startTime = new Date();
    interval = setInterval(()=>{
        const time = Math.floor((new Date() - startTime)/1000);
        $timer.textContent = `${time}초`;
    },1000);//매초 한칸씩 올려주는 것임
}
$form.addEventListener('submit',onSubmit);

let data;
function plantMine(){
    const candidate = Array(row*cell).fill().map((arr,i)=>{
        return i;
    });
    const shuffle = [];
    while(candidate.length > row * cell - mine){
        const choosen = candidate.splice(Math.floor(Math.random() * candidate.length),1)[0];
        shuffle.push(choosen);
    }
    const data = [];
    for(let i=0;i<row;i++){
        const rowData = [];
        data.push(rowData); 
        for(let j=0;j<cell;j++){
            rowData.push(CODE.NOMAL);
        }
    }
    for(let k=0;k<shuffle.length;k++){
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }
    return data;
}
function OnRightClick(event){
    event.preventDefault();
    const target = event.target;
    const rowIndex = target.parentNode.rowIndex;
    const cellIndex = target.cellIndex;
    const cellData = data[rowIndex][cellIndex];

    if(cellData === CODE.MINE){//지뢰면
        data[rowIndex][cellIndex] = CODE.QUESTION_MINE;
        target.className = 'question';
        target.innerText = '?';
    }
    else if(cellData === CODE.QUESTION_MINE){//물음표 지뢰면
        data[rowIndex][cellIndex] = CODE.FLAG_MINE;
        target.className = 'flag';
        target.innerText = '!';
    }
    else if(cellData === CODE.FLAG_MINE){//깃발지뢰면
        data[rowIndex][cellIndex] = CODE.MINE;
        target.className = '';
        // target.innerText = 'X';
    }

    else if(cellData === CODE.NOMAL){//지뢰아니면
        data[rowIndex][cellIndex] = CODE.QUESTION;
        target.className = 'question';
        target.innerText = '?';
    }
    else if(cellData === CODE.QUESTION){//물음표 지뢰아닌
        data[rowIndex][cellIndex] = CODE.FLAG;
        target.className = 'flag';
        target.innerText = '!';
    }
    else if(cellData === CODE.FLAG){//깃발칸인데 지뢰아니면
        data[rowIndex][cellIndex] = CODE.NOMAL;
        target.className = '';
        target.innerText = '';
    }
     }
function countMine(rowIndex, cellIndex){
    const mines = [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE];
    //A && B => 앞에것이 존재하면 뒤에것을 실행해라.
    //A || B => 앞에것이 존재하지 않으면 뒤에것을 실행해라.
    let i = 0;
    mines.includes(data[rowIndex-1]?.[cellIndex-1]) && i++;
    mines.includes(data[rowIndex-1]?.[cellIndex]) && i++;
    mines.includes(data[rowIndex-1]?.[cellIndex+1]) && i++;
    mines.includes(data[rowIndex][cellIndex-1]) && i++;
    mines.includes(data[rowIndex][cellIndex+1]) && i++;
    mines.includes(data[rowIndex+1]?.[cellIndex-1]) && i++;
    mines.includes(data[rowIndex+1]?.[cellIndex]) && i++;
    mines.includes(data[rowIndex+1]?.[cellIndex+1]) && i++;
    return i;
}
function open(rowIndex, cellIndex){

    if(data[rowIndex]?.[cellIndex] >= CODE.OPENED) return; //누른칸이 열려져 있는 값보다 크면, 이미 열었으면 더 열려고 하지 말고 return
     
    const target = $tbody.children[rowIndex]?.children[cellIndex];
    if(!target){
        return;
    }
    const count = countMine(rowIndex,cellIndex);
    target.textContent = count || '';
    target.className = 'opened';
    data[rowIndex][cellIndex] = count;
    openCount++;
    console.log(openCount);
    if(openCount === row * cell - mine){
        const time = (new Date() - startTime) / 1000;
        clearInterval(interval);
        $tbody.removeEventListener('contextmenu',OnRightClick);
        $tbody.removeEventListener('click',OnLeftClick);
        setTimeout(()=>{
            alert(`승리했습니다. ${time}초가 걸렸습니다.`); //마지막이 열리기 전에 alert가 뜰 수 있어서 setTimeout으로 해줌.
        },500);
    }
    return count;
}
function openAround(rI,cI){
    //open의 리턴값으로 주변 값 갯수 받는다.
    //재귀함수로 openAround를 하면  Maximum call stack size exceeded 이라는 에러가 뜬다.
    //호출스택에 계속 함수가 쌓이면서 초과하는 것인데 이것을 백그라운드와 태스트큐를 이용하여
    //setTimeout을 사용한다. 그런데 이렇게 하고 나서도 페이지가 너무 느려지고 클릭도 안된다.
    setTimeout(()=>{
        const count = open(rI,cI);
        if(count === 0){
            openAround(rI - 1, cI - 1);
            openAround(rI - 1,cI);
            openAround(rI - 1,cI + 1);
            openAround(rI, cI - 1);
            openAround(rI, cI + 1);
            openAround(rI + 1,cI - 1);
            openAround(rI + 1,cI);
            openAround(rI + 1,cI + 1);
        }
    },0);
}
let normalCellFound = false;
let searched;

function transferMine(rI, cI){
    if(normalCellFound) return; //이미 빈칸을 찾았다면

}
function OnLeftClick(event){
    event.preventDefault();
    const target = event.target;
    const rowIndex = target.parentNode.rowIndex;
    const cellIndex = target.cellIndex;
    const cellData = data[rowIndex][cellIndex];
    if(firstClick){
        firstClick = false;
        searched = Array(row).fill().map(()=>[]);
        if(cellData === CODE.MINE){//첫 클릭이 지뢰면
            transferMine(rowIndex,cellIndex);
            data[rowIndex][cellIndex] = CODE.NOMAL;//지금칸을 빈칸으로
            cellData = CODE.NOMAL;// 참조

        }
    }
    if(cellData === CODE.NOMAL){//지뢰가 아니고 닫힌칸이면
        openAround(rowIndex,cellIndex);
    }
    else if(cellData === CODE.MINE){//폭탄인가?
        //펑
        target.textContent = '펑';
        data[rowIndex][cellIndex] = CODE.MINE;
        target.className = 'opened';
        clearInterval(interval);
        $tbody.removeEventListener('contextmenu',OnRightClick);
        $tbody.removeEventListener('click',OnLeftClick);
    }
    //물음표나 깃발은 무시ㄴ
}
function drawTable(){
    data = plantMine();
    data.forEach((row)=> {
        const $tr = document.createElement('tr');
        row.forEach((cell)=>{
            const $td = document.createElement('td');
            if(cell === CODE.MINE){
                // $td.innerText = 'X'; //개발 편의를 위해
            }
            $tr.appendChild($td);
        });
        $tbody.appendChild($tr);
        $tbody.addEventListener('contextmenu',OnRightClick); //td칸을 눌랴도 이벤트버블링 때문에
        $tbody.addEventListener('click',OnLeftClick);
    });
}

