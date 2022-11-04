const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";


function onLoginSubmit(event){
    event.preventDefault();
    localStorage.setItem(USERNAME_KEY,loginInput.value);
    paintgreeting();
}
function paintgreeting(){
    const username = localStorage.getItem(USERNAME_KEY);
    greeting.innerText = `Hello ${username}`;
    loginForm.classList.add(HIDDEN_CLASSNAME);
    greeting.classList.remove(HIDDEN_CLASSNAME);
}
const savedusername = localStorage.getItem(USERNAME_KEY);

if(savedusername === null){
    loginForm.addEventListener("submit",onLoginSubmit);
}else{
    paintgreeting();
}