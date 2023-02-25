let email = "developer@dev.com";
let password = "M123456";

const userEmailKey = "userEmail";
const userPasswordKey = "userPassword";
const credentialKey = "credential";

const formElement = document.querySelector(".loginForm");
const emailElement = document.querySelector("#email-LogIn");
const passwordElement = document.querySelector("#password-LogIn");
const savePasswordElement = document.querySelector(".hidden-xs-up");
const googleLoginElement = document.querySelector("#google-LogIn");
const otherLoginElement = document.querySelector("#other-LogIn");

startCredential();

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  login();
});

let elementosVacios = emailElement.value == "" || passwordElement.value == "";
function login() {
  elementosVacios = emailElement.value == "" || passwordElement.value == "";
  if (!elementosVacios) {
    if (emailElement.value == email && passwordElement.value == password) {
      openApp();
      //Guardar la credencial
      if (savePasswordElement.checked) {
        localStorage.setItem(credentialKey, "true");
      }
    }
  } else {
    if (elementosVacios)
        alert("No puede haber espacio vacío")
    else 
        alert("No puedes acceder al menos que tengas un código de desarrollador");
    //!Cambiar la alerta
  }
}

function startCredential() {
  let credential = localStorage.getItem(credentialKey);
  if (credential == "true") openApp();
}

function openApp() {
  window.open("pages/mapflip.html", "_self");
}
