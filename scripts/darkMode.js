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
		r.style.setProperty("--mediumTextColor", "hsl(0, 0%, 35%)");
		r.style.setProperty("--mediumBackColor", "hsl(0, 0%, 14%)");
		r.style.setProperty("--buttonColor", "hsl(0, 0%, 22%)");
		r.style.setProperty("--buttonColorHover", "hsl(0, 0%, 33%)");
		r.style.setProperty("--backgroundNavbarColor", "hsl(0, 0%, 27%)");
		r.style.setProperty("--imgIconColor", "invert(10%)");
		r.style.setProperty("--strongShadowColor", "hsla(0, 0%, 100%, 0.1)");
		r.style.setProperty("--mediumShadowColor", "hsla(0, 0%, 100%, 0.09)");
		r.style.setProperty("--buttonShadowColor", "hsla(0, 0%, 100%, 0.12)");
		r.style.setProperty("--mapTileColor", "invert(85%)");
		//* URL
		r.style.setProperty("--urlPasswordIcon", "url(../Icons/gui/password_key_24_white.png)");
		r.style.setProperty("--urlEmailIcon", "url(../Icons/gui/mail_24_white.png)");
	} else {
		//Modo Normal (CSS)
		r.style.setProperty("--backColor", "white");
		r.style.setProperty("--textColor", "black");
		r.style.setProperty("--mediumTextColor", "hsl(0, 0%, 71%)");
		r.style.setProperty("--mediumBackColor", "hsl(0, 0%, 94%)");
		r.style.setProperty("--buttonColor", "hsl(0, 0%, 86%)");
		r.style.setProperty("--buttonColorHover", "hsl(0, 0%, 75%)");
		r.style.setProperty("--backgroundNavbarColor", "hsl(0, 0%, 78%)");
		r.style.setProperty("--imgIconColor", "invert(90%)");
		r.style.setProperty("--strongShadowColor", "hsla(0, 0%, 0%, 0.2)");
		r.style.setProperty("--mediumShadowColor", "hsla(0, 0%, 0%, 0.19)");
		r.style.setProperty("--buttonShadowColor", "hsla(0, 0%, 0%, 0.32)");
		r.style.setProperty("--mapTileColor", "invert(0%)");
		//*URL
		r.style.setProperty("--urlPasswordIcon", "url(../Icons/gui/password_key_24_black.png)");
		r.style.setProperty("--urlEmailIcon", "url(../Icons/gui/mail_24_black.png)");
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
	if (matched == checkBoxVar.checked) localStorage.removeItem("modoOscuroManual");
}

// Obtener todos los enlaces de la barra de navegación
const navLinks = document.querySelectorAll(".nav-ul a");

// Iterar a través de los enlaces y agregar la clase activa al enlace correspondiente a la página actual
navLinks.forEach((link) => {
	if (link.href === window.location.href) {
		link.classList.add("active");
	} else {
		link.classList.remove("active");
	}
});
