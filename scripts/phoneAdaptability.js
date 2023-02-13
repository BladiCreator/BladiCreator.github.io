const contentElement = document.querySelector("#content");
const navbarElement = document.querySelector("#navbar");
const navbarMobileElement = document.querySelector("#navbar-mobile");

let height = 0;
let navbarHeight = navbarElement.offsetHeight;
let navbarMobileHeight = navbarMobileElement.offsetHeight;
window.onload = resizeContent
window.addEventListener("resize", resizeContent);
function resizeContent() {
  if (window.innerWidth <= 820) {
    navbarHeight = navbarElement.offsetHeight;
    navbarMobileHeight = navbarMobileElement.offsetHeight;
    
    height = String(window.innerHeight - (navbarHeight + navbarMobileHeight));
    contentElement.style.height = height + "px";
  } else contentElement.style.removeProperty("height");
}
