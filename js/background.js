const images = ["01.jpeg","02.jpeg","03.jpeg"];

const chosenImages = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");
bgImage.src = `img/${chosenImages}`;

document.body.appendChild(bgImage);