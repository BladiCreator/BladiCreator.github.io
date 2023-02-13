const contentElement = document.querySelector("#content");
const navbarElement = document.querySelector("#navbar");
const navbarMobileElement = document.querySelector("#navbar-mobile");


let height = 0;
//TODO: obtner los pixeles de los elementos navbar
let navbarHeight = navbarElement.clientHeight;
let navbarMobileHeight = navbarMobileElement.clientHeight;
resizeContent()
window.addEventListener("resize", resizeContent);
function resizeContent() {
  //console.log(navbarHeight);
  console.log(window.innerHeight)
  if (window.innerHeight < 510) {
    height = String(window.innerHeight - (48 + 55));
    contentElement.style.height = height + "px";
  }else 
    contentElement.style.removeProperty('height');
}