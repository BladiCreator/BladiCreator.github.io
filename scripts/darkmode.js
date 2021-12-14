//Obtenemos el elemento root
var r = document.querySelector(':root');

var darkMode = true;//Verifiacmos si ya esta en modo oscuro o no

function darkMode() {
    //var bodyElement = document.body;
    //var navbarElement = document.getElementById("navbar")
    
    /*if(darkMode){

    }else { }*/

    r.style.setProperty('--DarkTextColor', 'black');
    r.style.setProperty('--DarkBackColor', 'white');

    //bodyElement.classList.toggle("dark-mode");
    //navbarElement.classList.toggle("dark-navbar");
}