const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const lineWidth = document.getElementById("line-width");
const inputValue = document.getElementById("input_value");
const colorSelect = document.getElementById("color");
const InputText = document.getElementById("text");
//font
const fontSize = document.getElementById("font-size");
const fontType = document.getElementById("font-type");
const fontWeight = document.getElementById("font-weight");
//btn
const pencilBtn = document.getElementById("pencil-btn");
const paintBtn = document.getElementById("paint-btn");
const recBtn = document.getElementById("rec-btn");
const circleBtn = document.getElementById("circle-btn");
const textBtn = document.getElementById("text-btn");
const eraseBtn = document.getElementById("eraser-btn");
const emptyBtn = document.getElementById("destroy-btn");
//file-btn
const fileBtn = document.getElementById("filelabel");
const fileSaveBtn = document.getElementById("save");

const CANVAS_WIDTH = 925;
const CANVAS_HEIGHT = 620;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

let mode =1;
let isPainting = false;
let isFelling = false;

let Recx = 0;
let Recy = 0;
let StartX = 0;
let StartY = 0;


function onMove(event){
    if(isPainting){
        if(mode === 1){
            ctx.lineTo(event.offsetX,event.offsetY);
            ctx.stroke();
            return;
        }else if(mode === 6){
            ctx.strokeStyle = "white";
            ctx.lineTo(event.offsetX,event.offsetY);
            ctx.stroke();
            return;
        }
        else if(mode === 3){
            const x = event.offsetX;
            const y = event.offsetY;
            Recx = x - StartX ;
            Recy = y - StartY;
            ctx.fillRect(StartX,StartY,Recx,Recy);
        }else if(mode === 4){
            const r = (event.offsetY - StartY) / 2;
            ctx.arc(StartX,StartY,r,0,Math.PI*2);
            ctx.fill();
        }
    }
    
    ctx.beginPath();
    ctx.moveTo(event.offsetX,event.offsetY);
}
function onMovedown(event){
    isPainting = true;
    if(mode === 3 || mode === 4){
        StartX = event.offsetX;
        StartY = event.offsetY;
        console.log(StartX,StartY);
    }
}
function onMoveup(){
    isPainting = false;
}
function onCanvasClick(event){
    if(mode === 2){
        ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    }else if(mode === 7){
        ctx.fillStyle = "white";
        ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    }
}
function onDbClick(event){
    if(mode === 5){
        if(InputText.value !== ""){
            ctx.save();
            ctx.font = `${fontWeight.value} ${fontSize.value}px ${fontType.value}`;
            ctx.fillText(InputText.value, event.offsetX,event.offsetY);
            ctx.restore();
        }else{
            alert("텍스트를 입력해주세요");
        }
    }
}
function handlelineWidth(event){
    const size = event.target.value;
    inputValue.innerText = size;
    ctx.lineWidth = size;
}
function onColorClick(event){
    ctx.strokeStyle = event.target.dataset.color;
    ctx.fillStyle = event.target.dataset.color;
    colorSelect.value = event.target.dataset.color;
}
function handlePen(){
    mode = 1;
    canvas.style.cursor = "url(cursor/pencil.cur) 4 32, auto";
}
function handlePaint(){
    mode = 2;
    canvas.style.cursor = "url(cursor/paint.cur), auto";
}
function handleRec(){
    mode = 3;
    canvas.style.cursor = "crosshair";
}
function handleCircle(){
    mode = 4;
    canvas.style.cursor = "crosshair";
}
function handleText(){
    mode = 5;
    canvas.style.cursor = "url(cursor/text.cur), auto";
}
function handleErase(){
    mode = 6;
    canvas.style.cursor = "url(cursor/erase.cur)4 25, auto";
}
function handleEmpty(){
    mode = 7;
    canvas.style.cursor = "url(cursor/erase.cur), auto";
}
function onfileChange(event){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    console.log(url);
    const image = new Image();
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image,0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    }
}
function onfileSave(){
    const url = canvas.toDataURL();
    const a = document.createElement('a');
    a.href = url;
    a.download = "myPainting.png";
    a.click();
}
canvas.addEventListener("mousemove",onMove);
canvas.addEventListener("mousedown",onMovedown);
canvas.addEventListener("mouseup",onMoveup);
canvas.addEventListener("mouseleave",onMoveup);
canvas.addEventListener("click",onCanvasClick);
canvas.addEventListener("dblclick",onDbClick);

colorOptions.forEach((color) => color.addEventListener("click",onColorClick));

lineWidth.addEventListener("change",handlelineWidth);
pencilBtn.addEventListener("click", handlePen);
paintBtn.addEventListener("click", handlePaint);
recBtn.addEventListener("click", handleRec);
circleBtn.addEventListener("click", handleCircle);
textBtn.addEventListener("click",handleText);
eraseBtn.addEventListener("click",handleErase);
emptyBtn.addEventListener("click",handleEmpty);
fileBtn.addEventListener("change",onfileChange);
fileSaveBtn.addEventListener("click",onfileSave);