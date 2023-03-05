const r = document.querySelector(":root"); //Obtenemos el elemento root
const checkBoxVar = document.querySelector(".dark-mode-button"); //Obtenemos el elemento input mediante el nombre de la clase

let matched = window.matchMedia("(prefers-color-scheme: dark)").matches; //Detectamos si el navegador esta en modo oscuro

//Activa el Modo oscuro ejecutando la funcion automaticamente
activeDarkMode();
activarModoOscuroManual();

/*Si modifica aqui tambien obligatorio en el CSS*/
function darkMode() {
  if (checkBoxVar.checked) {
    //Modo Oscuro
    r.style.setProperty("--backColor", "rgb(25, 25, 25)");
    r.style.setProperty("--textColor", "white");
    r.style.setProperty("--mediumTextColor", "rgb(90, 90, 90)");
    r.style.setProperty("--mediumBackColor", "rgb(35, 35, 35)");
    r.style.setProperty("--buttonColor", "rgb(55, 55, 55)");
    r.style.setProperty("--buttonColorHover", "rgb(85, 85, 85)");
    r.style.setProperty("--backgroundNavbarColor", "rgb(70, 70, 70)");
    r.style.setProperty("--imgIconColor", "invert(10%)");
    r.style.setProperty("--strongShadowColor", "rgba(255, 255, 255, 0.1)");
    r.style.setProperty("--mediumShadowColor", "rgba(255, 255, 255, 0.09)");
    r.style.setProperty("--buttonShadowColor", "rgba(255, 255, 255, 0.12)");
    r.style.setProperty("--mapTileColor", "invert(85%)");
    //* URL
    r.style.setProperty("--urlPasswordIcon", "url(../icons/gui/icons8-password-key-24_white.png)");
    r.style.setProperty("--urlEmailIcon", "url(../icons/gui/icons8-mail-24-white.png)");
  } else {
    //Modo Normal (CSS)
    r.style.setProperty("--backColor", "white");
    r.style.setProperty("--textColor", "black");
    r.style.setProperty("--mediumTextColor", "rgb(180, 180, 180)");
    r.style.setProperty("--mediumBackColor", "rgb(240, 240, 240)");
    r.style.setProperty("--buttonColor", "rgb(220, 220, 220)");
    r.style.setProperty("--buttonColorHover", "rgb(190, 190, 190)");
    r.style.setProperty("--backgroundNavbarColor", "rgb(200, 200, 200)");
    r.style.setProperty("--imgIconColor", "invert(90%)");
    r.style.setProperty("--strongShadowColor", "rgba(0, 0, 0, 0.2)");
    r.style.setProperty("--mediumShadowColor", "rgba(0, 0, 0, 0.19)");
    r.style.setProperty("--buttonShadowColor", "rgba(0, 0, 0, 0.32)");
    r.style.setProperty("--mapTileColor", "invert(0%)");
    //*URL
    r.style.setProperty("--urlPasswordIcon", "url(../icons/gui/icons8-password-key-24_black.png)");
    r.style.setProperty("--urlEmailIcon", "url(../icons/gui/icons8-mail-24-black.png)");
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