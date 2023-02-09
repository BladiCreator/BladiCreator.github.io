/*Parte modo oscuro*/
const r = document.querySelector(":root"); //Obtenemos el elemento root
const checkBoxVar = document.querySelector(".Dark_Mode_Button"); //Obtenemos el elemento input mediante el nombre de la clase

let matched = window.matchMedia("(prefers-color-scheme: dark)").matches; //Detectamos si el navegador esta en modo oscuro

//Activa el Modo oscuro ejecutando la funcion automaticamente
activeDarkMode();

function darkMode() {
  if (checkBoxVar.checked) {
    //Modo Oscuro
    r.style.setProperty("--BackColor", "rgb(20, 20, 20)");
    r.style.setProperty("--TextColor", "white");
    r.style.setProperty("--MediunBackColor", "rgb(60, 60, 60)");
    r.style.setProperty("--buttonColor", "rgb(40, 40, 40)");
    r.style.setProperty("--buttonColorHover", "rgb(80, 80, 80)");
  } else {
    //Modo Normal
    r.style.setProperty("--BackColor", "white");
    r.style.setProperty("--TextColor", "black");
    r.style.setProperty("--MediunBackColor", "rgb(150, 150, 150)");
    r.style.setProperty("--buttonColor", "rgb(210, 210, 210)");
    r.style.setProperty("--buttonColorHover", "rgb(190, 190, 190)");
  }
}

function activarModoOscuroManual() {
  localStorage.setItem("modoOscuroManual", checkBoxVar.checked);
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
