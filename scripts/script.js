/*Parte modo oscuro*/
const r = document.querySelector(":root"); //Obtenemos el elemento root
const checkBoxVar = document.querySelector(".Dark_Mode_Button"); //Obtenemos el elemento input mediante el nombre de la clase

let matched = window.matchMedia("(prefers-color-scheme: dark)").matches; //Detectamos si el navegador esta en modo oscuro

//Activa el Modo oscuro ejecutando la funcion automaticamente
activeDarkMode();
activarModoOscuroManual();

function darkMode() {
  if (checkBoxVar.checked) {
    //Modo Oscuro
    r.style.setProperty("--BackColor", "rgb(20, 20, 20)");
    r.style.setProperty("--TextColor", "white");
    r.style.setProperty("--MediunBackColor", "rgb(60, 60, 60)");
    r.style.setProperty("--buttonColor", "rgb(40, 40, 40)");
    r.style.setProperty("--buttonColorHover", "rgb(85, 85, 85)");
    r.style.setProperty("--backgroundHeaderColor", "rgb(70, 70, 70)");
  } else {
    //Modo Normal
    r.style.setProperty("--BackColor", "white");
    r.style.setProperty("--TextColor", "black");
    r.style.setProperty("--MediunBackColor", "rgb(150, 150, 150)");
    r.style.setProperty("--buttonColor", "rgb(210, 210, 210)");
    r.style.setProperty("--buttonColorHover", "rgb(190, 190, 190)");
    r.style.setProperty("--backgroundHeaderColor", "rgb(170, 170, 170)");
  }
}

function activeDarkMode() {
  let modoOscuroManual = localStorage.getItem("modoOscuroManual");
  if (modoOscuroManual == null) {
    if (matched) {
      //Verifica si el navegador tiene el modo oscuro activado
      checkBoxVar.checked = true; //Activa el modo oscuro
    }
  } else {
    checkBoxVar.checked = modoOscuroManual == "true" ? true : false; //Activa/Desactiva el modo oscuro
  }
  darkMode();
}

function activarModoOscuroManual() {
  localStorage.setItem("modoOscuroManual", checkBoxVar.checked);
  //Si el modo oscuro del navegador coincide con el del boton, automaticamente borrará los archivos para que se sincronize con el modo del navegador
  if (matched == checkBoxVar.checked)
    localStorage.removeItem("modoOscuroManual");
}

/*Parte barra de navegacion*/

const botonMenu = document.querySelector(".iconbar");
const botonMenuIcono = document.querySelector(".iconbar i");
const navMenu = document.querySelector(".nav-ul");

botonMenu.addEventListener("click", deplegarMenu);

function deplegarMenu() {
  navMenu.classList.toggle("nav-ul");

  if (!navMenu.classList.contains("nav-ul")) {
    botonMenuIcono.setAttribute("class", "fas fa-times");
  } else {
    botonMenuIcono.setAttribute("class", "fas fa-bars");
  }
}

/*Barra de navegacion movil*/
const eventListBoton = document.querySelector("#eventListBoton");
const mapAndDescriptionBoton = document.querySelector("#mapBoton");
const friendListBoton = document.querySelector("#friendListBoton");

const eventsListElement = document.querySelector("#eventsList");
const mapAndDescriptionElement = document.querySelector("#mapAndDescription");
const friendListElement = document.querySelector("#friendList");

let eventsListElementActivated = "";
let mapAndDescriptionElementActivated = "";
let friendListElementActivated = "";

eventListBoton.addEventListener("click", () => {
  eventsListElementActivated = "block";
  mapAndDescriptionElementActivated = "none";
  friendListElementActivated = "none";
  updateOptionSelected();
});

mapAndDescriptionBoton.addEventListener("click", () => {
  eventsListElementActivated = "none";
  mapAndDescriptionElementActivated = "block";
  friendListElementActivated = "none";
  updateOptionSelected();
});

friendListBoton.addEventListener("click", () => {
  eventsListElementActivated = "none";
  mapAndDescriptionElementActivated = "none";
  friendListElementActivated = "block";
  updateOptionSelected();
});

function updateOptionSelected() {
  eventsListElement.style.display = eventsListElementActivated;
  mapAndDescriptionElement.style.display = mapAndDescriptionElementActivated;
  friendListElement.style.display = friendListElementActivated;
}

window.addEventListener("resize", normalMode);

function normalMode() {
  if (window.innerWidth > 820) {
    eventsListElement.style.display = "block";
    mapAndDescriptionElement.style.display = "block";
    friendListElement.style.display = "block";
  } else {
    eventsListElement.style.display = eventsListElementActivated;
    mapAndDescriptionElement.style.display = mapAndDescriptionElementActivated;
    friendListElement.style.display = friendListElementActivated;
  }
}
