const images = ["1.jpeg","2.jpeg","3.jpeg"];

const bgimg = document.createElement("img");
bgimg.src = `img/${images[Math.floor(Math.random() * images.length)]}`;
bgimg.id = "background-image";
document.body.appendChild(bgimg);

// const body = document.querySelector("body");
// const IMAGE_NUM = 3;

// function PaintBgImg(imgnumber){
//    const IMAGE = new Image();//객체생성
//    IMAGE.src = `img/${imgnumber+1}.jpeg`;
//     IMAGE.classList.add("bgimage");
//     body.appendChild(IMAGE);
// }
// function getRandomNumber(){
//     const number = Math.floor(Math.random() * IMAGE_NUM);
//     return number;
// }
// function init(){
//     const randomNumber = getRandomNumber();
//     PaintBgImg(randomNumber);
// }
// init();