//*Parte barra de navegacion
const botonMenu = document.querySelector(".iconbar");
const botonMenuIcono = document.querySelector(".iconbar img");
const navMenu = document.querySelector(".nav-ul");

const CLOSE_IMG_URL = "./Icons/gui/close_256.png";
const ROW_IMG_URL = "./Icons/gui/row_256.png";

const CLOSE_IMG_URL_OPTIONAL = "../Icons/gui/close_256.png";
const ROW_IMG_URL_OPTIONAL = "../Icons/gui/row_256.png";

const closeImg = new Image();
const rowImg = new Image();

let fileName = getPageNmae();

closeImg.onload = rowImg.onload = iniciarMenu;
closeImg.onerror = rowImg.onerror = function () {
  initRute(fileName);
};

initRute(fileName);

botonMenu.addEventListener("click", deplegarMenu);

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

function initRute(fileName){
  if (fileName === "index") {
    closeImg.src = CLOSE_IMG_URL;
    rowImg.src = ROW_IMG_URL;
  } else {
    closeImg.src = CLOSE_IMG_URL_OPTIONAL;
    rowImg.src = ROW_IMG_URL_OPTIONAL;
  }
}

function getPageNmae() {
  // Obtener la ruta y el nombre de archivo de la página actual
  let pathName = window.location.pathname;

  // Extraer solo el nombre de archivo (sin la extensión)
  let fileName = pathName
    .substring(pathName.lastIndexOf("/") + 1)
    .replace(".html", "");

  return fileName;
}
