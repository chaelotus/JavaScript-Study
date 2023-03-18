const weatherForm = document.querySelector("#weather");
const city = document.querySelector("#weather span:first-child");
const weather = document.querySelector("#weather span:last-child");

const API_KEY = '82643d6b318cc6008f2aca60615e06b2';

function success(position){
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const url =
     `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
    fetch(url).then(response => response.json())
    .then(data =>{
        city.innerText = data.name;
        weather.innerText = `${data.main.temp} / ${data.weather[0].main}`;
    }
    )
}
function error(){
    alert("Can't find you, No weather for you.");
}
navigator.geolocation.getCurrentPosition(success,error);
