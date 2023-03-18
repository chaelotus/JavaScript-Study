const $wrapper = document.querySelector("#wrapper");
const total = parseInt(prompt('카드 갯수 입력해주세요(최대20)'));
console.log(total);
const colors = ['red','orange','yellow','green','white','pink'
                ,'cyan', 'violet', 'gray', 'black'];
let colorSlice = colors.slice(0,total/2);
let colorCopy = colorSlice.concat(colorSlice);//두쌍 씩 있어야 하니깐
let shuffled = []; 
let clicked = [];
let completed = [];
let clickable = false;
let startTime;
function shuffle(){//피셔-예이츠 셔플
    while(colorCopy.length>0){
        const randomIndex = Math.floor(Math.random()*colorCopy.length);//무작위로 뽑고
        const spliced = colorCopy.splice(randomIndex,1);//뽑은거 넣고
        shuffled.push(spliced[0]);
    }
}

function createCard(i){//div.card > div.card-inner > (div.card-front, div.card-back)
    const card = document.createElement('div');
    card.className = 'card';
    const cardInner = document.createElement('div');
    cardInner.className = 'card-inner';
    const cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    const cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.style.backgroundColor = shuffled[i];
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    return card;
}
function OnClickCard(){
    if(!clickable || completed.includes(this) || clicked[0] === this){
        return;
    }
    this.classList.toggle('flipped');
    clicked.push(this);

    if(clicked.length !== 2){
        return;
    }
    const firstCard = clicked[0].querySelector('.card-back').style.backgroundColor;
    const secondCard = clicked[1].querySelector('.card-back').style.backgroundColor;

    if(firstCard === secondCard){
        completed = completed.concat(clicked);
        clicked = [];
        if(completed.length !== total){
            return;
        }
        const endTime = new Date();
        setTimeout(()=>{
            alert(`축하합니다. ${(endTime - startTime)/1000}초 걸렸습니다.!`);
            resetGame();
        },1000);
        return;
    }
    clickable = false;

    setTimeout(()=>{
        clicked[0].classList.remove('flipped');
        clicked[1].classList.remove('flipped');
        clicked = [];
        clickable = true;
    },500);

}
function startGame(){
    clickable = false;
    shuffle();
    for(let i=0;i<total;i++){
        const card = createCard(i);
        card.addEventListener('click',OnClickCard);
        $wrapper.appendChild(card); 
    }
    document.querySelectorAll('.card').forEach((card, index)=>{//초반 카드 공개
        setTimeout(()=>{
            card.classList.add('flipped');
        }, 1000 + 100 * index);
    });
    setTimeout(()=>{//카드 감추기  
        document.querySelectorAll('.card').forEach((card)=>{
            card.classList.remove('flipped');
        }); 
        clickable = true;
        startTime = new Date();
    },5000);
}
startGame();

function resetGame(){
    $wrapper.innerHTML = '';
    //원본 바뀌는 것들 : push, pop, unshift, shift, splice, sort...
    //안 바뀌ㄴ 것들 : concat, slice, filter, every, map, forEach, some, find, fineindex, includes, indexof...
    colorCopy = colorSlice.concat(colorSlice);
    completed = [];
    shuffled = [];
    startGame();
}
