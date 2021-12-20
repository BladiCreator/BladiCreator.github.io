const r = document.querySelector(':root');//Obtenemos el elemento root
const checkBoxVar = document.querySelector('input[class="Dark_Mode_Button"]');//Obtenemos el elemento input mediante el nombre de la clase

let matched = window.matchMedia('(prefers-color-scheme: dark)').matches;//Detectamos si el navegador esta en modo oscuro

function darkMode() {
    if(checkBoxVar.checked){//Modo Oscuro
        r.style.setProperty('--BackColor', 'rgb(20, 20, 20)');
        r.style.setProperty('--TextColor', 'white');
        r.style.setProperty('--MediunBackColor', 'rgb(60, 60, 60)');
        r.style.setProperty('--buttonColor', 'rgb(40, 40, 40)');
        r.style.setProperty('--buttonColorHover', 'rgb(80, 80, 80)');
    }else {//Modo Normal
        r.style.setProperty('--BackColor', 'white');
        r.style.setProperty('--TextColor', 'black');
        r.style.setProperty('--MediunBackColor', 'rgb(150, 150, 150)');
        r.style.setProperty('--buttonColor', 'rgb(210, 210, 210)');
        r.style.setProperty('--buttonColorHover', 'rgb(190, 190, 190)');
    }
}

function activeDarkMode(){
	if(matched){//Verifica si el navegador tiene el modo oscuro activado
        checkBoxVar.checked=true;//Activa el modo oscuro
        darkMode();
	}
}