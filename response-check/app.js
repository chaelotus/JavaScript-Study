const $screen = document.querySelector('#screen');
const $result = document.querySelector('#result');

//getSeconds, getMinutes
let startTime;
let endTime;
const records = [];
let timeoutId;

function OnClickScreen(event){
    random = Math.floor(Math.random()*1000)+2000;
    console.log(random);
    //파랑
    if(event.target.classList.contains('waiting')){
        $screen.classList.replace('waiting','ready');
        $screen.textContent = '초록색이 되면 클릭하세요.';
        timeoutId = setTimeout(()=>{
            startTime = new Date();
            $screen.classList.replace('ready','now');
            $screen.textContent = '클릭하세요!';
            //첫 시간재기
        },random);
    }
    //빨강
    else if(event.target.classList.contains('ready')){
        clearTimeout(timeoutId);
        alert('성급했습니다.!');
        $screen.classList.replace('ready','waiting');
        return;
    }
    //초록
    else if(event.target.classList.contains('now')){
        //끝 시간 재기 
        endTime = new Date();
        const current = endTime - startTime;
        records.push(current);
        const average = records.reduce((a,b) => (a+b) / records.length);
        $result.textContent = `현재 ${current}ms, 평균 : ${average}`;

        const topfive = records.sort((p,c) => p-c).slice(0,5);
       
        topfive.forEach((value,index) => {
            $result.append(
                document.createElement('br'),
                `${index+1}위 : ${value}ms`,
            );
        });
  
        startTime = null;
        endTime = null;
        $screen.classList.replace('now','waiting');
        $screen.textContent = '클릭해서 시작하세요';
    }

}

$screen.addEventListener("click",OnClickScreen);