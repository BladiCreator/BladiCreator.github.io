//Obtenemos el elemento root
const r = document.querySelector(':root');

let darksMode = false;//Verificamos si ya esta en modo oscuro o no

function darkMode() {
    if(!darksMode){//Modo Oscuro
        r.style.setProperty('--BackColor', 'rgb(20, 20, 20)');
        r.style.setProperty('--TextColor', 'white');
        r.style.setProperty('--MediunBackColor', 'rgb(60, 60, 60)');
        r.style.setProperty('--buttonColor', 'rgb(40, 40, 40)');
        r.style.setProperty('--buttonColorHover', 'rgb(80, 80, 80)');
        darksMode = true;
    }else {//Modo Normal
        r.style.setProperty('--BackColor', 'white');
        r.style.setProperty('--TextColor', 'black');
        r.style.setProperty('--MediunBackColor', 'rgb(150, 150, 150)');
        r.style.setProperty('--buttonColor', 'rgb(210, 210, 210)');
        r.style.setProperty('--buttonColorHover', 'rgb(190, 190, 190)');
        darksMode = false;
    }
}