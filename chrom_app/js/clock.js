const clock = document.querySelector("#clock");

function printTime(){
    const date = new Date();
    const hours = String(date.getHours()).padStart(2,"0");
    const minute = String(date.getMinutes()).padStart(2,"0");
    const seconds = String(date.getSeconds()).padStart(2,"0");

    clock.innerText = `${hours}:${minute}:${seconds}`;

}
printTime();
setInterval(printTime,1000);