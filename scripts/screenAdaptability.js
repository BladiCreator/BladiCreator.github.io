const contentElement = document.querySelector("#content, .content-login");
const headerElement = document.querySelector(".header");
const navbarMobileElement = document.querySelector(".navbar-mobile");

/*const eventListButton = document.querySelector("#eventListBoton");
const mapButton = document.querySelector("#mapBoton");
const friendsButton = document.querySelector("#friendListBoton");*/

let height = 0;
//let buttonWidth = 0;
let headerHeight = 0;
let navbarMobileHeight = 0;
try {
  
} catch (error) {
  print(error)
}

//let navbarMobileWidth = navbarMobileElement.offsetWidth;
window.onload = resizeContent;
window.addEventListener("resize", resizeContent);
function resizeContent() {

    //if (window.innerWidth <= 820) {
      headerHeight = headerElement.offsetHeight;
      navbarMobileHeight = navbarMobileElement==null ? 0:navbarMobileElement.offsetHeight;
      /*navbarMobileWidth = navbarMobileElement.offsetWidth;
  
      buttonWidth = Math.ceil((navbarMobileWidth / 3)/3);
      console.log(buttonWidth);
      eventListButton.style.paddingLeft = buttonWidth+"px";
      eventListButton.style.paddingRight = buttonWidth+"px";
      mapButton.style.paddingLeft = buttonWidth+"px";
      mapButton.style.paddingRight = buttonWidth+"px";
      friendsButton.style.paddingLeft = buttonWidth+"px";
      friendsButton.style.paddingRight = buttonWidth+"px";*/
  
      height = String(window.innerHeight - (headerHeight + navbarMobileHeight));
      contentElement.style.height = height + "px";
    //} else contentElement.style.removeProperty("height");

}
