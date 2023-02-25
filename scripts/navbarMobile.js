/*Barra de navegacion movil*/
const eventListBoton = document.querySelector("#eventListBoton");
const mapAndDescriptionBoton = document.querySelector("#mapBoton");
const friendListBoton = document.querySelector("#friendListBoton");

const eventListIcon = document.querySelector(".listIcon");
const mapIcon = document.querySelector(".mapIcon");
const friendsIcon = document.querySelector(".friendsIcon");

const eventsListElement = document.querySelector(".event-list-container");
const mapAndDescriptionElement = document.querySelector(".map-and-description-container");
const friendListElement = document.querySelector(".contacts-list-container");

let eventsListElementActivated = "";
let mapAndDescriptionElementActivated = "";
let friendListElementActivated = "";

eventListBoton.addEventListener("click", () => {
  eventListIcon.style.filter = "var(--imgGreenButtonIconColor)";
  mapIcon.style.filter = "var(--imgIconColor)";
  friendsIcon.style.filter = "var(--imgIconColor)";
  eventsListElementActivated = "block";
  mapAndDescriptionElementActivated = "none";
  friendListElementActivated = "none";
  updateOptionSelected();
});

mapAndDescriptionBoton.addEventListener("click", () => {
  eventListIcon.style.filter = "var(--imgIconColor)";
  mapIcon.style.filter = "var(--imgGreenButtonIconColor)";
  friendsIcon.style.filter = "var(--imgIconColor)";
  eventsListElementActivated = "none";
  mapAndDescriptionElementActivated = "block";
  friendListElementActivated = "none";
  updateOptionSelected();
});

friendListBoton.addEventListener("click", () => {
  eventListIcon.style.filter = "var(--imgIconColor)";
  mapIcon.style.filter = "var(--imgIconColor)";
  friendsIcon.style.filter = "var(--imgGreenButtonIconColor)";
  eventsListElementActivated = "none";
  mapAndDescriptionElementActivated = "none";
  friendListElementActivated = "block";
  updateOptionSelected();
});

function updateOptionSelected() {
  eventsListElement.style.display = eventsListElementActivated;
  mapAndDescriptionElement.style.display = mapAndDescriptionElementActivated;
  friendListElement.style.display = friendListElementActivated;
}

window.addEventListener("resize", normalMode);

function normalMode() {
  if (window.innerWidth > 820) {
    eventsListElement.style.display = "block";
    mapAndDescriptionElement.style.display = "block";
    friendListElement.style.display = "block";
  } else {
    eventsListElement.style.display = eventsListElementActivated;
    mapAndDescriptionElement.style.display = mapAndDescriptionElementActivated;
    friendListElement.style.display = friendListElementActivated;
  }
}