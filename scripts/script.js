//*Parte barra de navegacion
const botonMenu = document.querySelector(".iconbar");
const botonMenuIcono = document.querySelector(".iconbar img");
const navMenu = document.querySelector(".nav-ul");

botonMenu.addEventListener("click", deplegarMenu);
//En caso de que la dirección de los ficheros sean distintos se cambiarán
botonMenuIcono.onerror = function () {
  closeImg.src = "icons/gui/Close-256.png";
  rowImg.src = "icons/gui/Row-256.png";
  iniciarMenu();
};

var closeImg = new Image();
var rowImg = new Image();

//*Aparecerá dos errores de tipo: ERR_FILE_NOT_FOUND, pero ese error no tiene importancia por que se auto-arregla
closeImg.src = "../icons/gui/Close-256.png";
rowImg.src = "../icons/gui/Row-256.png";

function deplegarMenu() {
  navMenu.classList.toggle("nav-ul");

  iniciarMenu();
}

function iniciarMenu() {
  if (!navMenu.classList.contains("nav-ul")) {
    botonMenuIcono.setAttribute("id", "close-icon");
    botonMenuIcono.setAttribute("src", closeImg.src);
  } else {
    botonMenuIcono.setAttribute("id", "menu-icon");
    botonMenuIcono.setAttribute("src", rowImg.src);
  }
}

//*Area barra de navegación

