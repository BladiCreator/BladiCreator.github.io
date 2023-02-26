/*URL para la documentacion de Leaflet https://leafletjs.com/reference.html#map-property*/
const imageDirectory = "../Icons/";

let imageNameArray = [
  "GradientSquare.png",
  "2DView_UI_Icon.png",
  "3DView_UI_Icon.png",
  "Properties_UI_Icon.png",
];
let eventTypeArray = ["Patinaje", "Ciclismo", "Danza", "Baloncesto"];
//Variables para testear
let latitud;
let longitud = -0.09;
let altura = 15;

var latlng;

if (navigator.geolocation) {
  var success = function (position) {
    latIng = L.latLng(position.coords.latitude, position.coords.longitude);
    //imprimir por consola
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    //Obtener las coordenada actual del dispositivo
    latitud = parseFloat(position.coords.latitude);
    longitud = parseFloat(position.coords.longitude);

    //Instancio el objeto map
    var map = L.map("map", {
      center: [latitud, longitud],
      zoom: altura,
      zoomControl: false,
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);
    map.attributionControl.setPosition("bottomleft");

    //TODO: Crear los eventos personalizado para el mapa

    //** Area de Botones
    // Crea un control personalizado
    var createEventControl_btn = L.Control.extend({
      options: {
        position: "bottomright",
      },
      onAdd: function (mapa) {
        var container = L.DomUtil.create("div", "leaflet-bar leaflet-control");
        container.innerHTML =
          '<button class="floating-map-button add" id="create-map-event-btn" onclick="createEventMapFlip()">' +
          '<img src="../Icons/GUI/Add-New-256.png" alt=""/></button>';
        return container;
      },
    });
    var createFilterControl_btn = L.Control.extend({
      options: {
        position: "bottomright",
      },
      onAdd: function (mapa) {
        var container = L.DomUtil.create("div", "leaflet-bar leaflet-control");
        container.innerHTML =
          '<button class="floating-map-button filter" id="filter-map-event-btn" onclick="filterEventMapFlip()">' +
          '<img src="../Icons/GUI/Filter-Standard-256.png" alt=""/></button>';
        return container;
      },
    });

    // Agrega el control personalizado al mapa
    map.addControl(new createFilterControl_btn());
    map.addControl(new createEventControl_btn());

    //**------------------

    //TODO: Mejorar el punto donde está el usuario
    //1 second = 1000 milliseconds.
    const intervalID = setInterval(cargadorDeEventos, 100000);

    //Muestra los primeros eventos al inicio
    simularEventos(map);

    function cargadorDeEventos() {
      //Elimina los eventos cada vez que se reinicia(Limpia el mapa)
      clearMap(map);
      clearEventElementList();

      simularEventos(map);
    }

    var markerOption = {
      title: "Patinaje",
      opacity: 0.8,
    };

    L.marker([latitud, longitud], markerOption).addTo(map);
  };
  navigator.geolocation.getCurrentPosition(success, function (msg) {
    console.error(msg);
  });
}

//TODO:No se eliminará el parametro colors y en vez de crear un circulo creará un icono, colo cambiará segun el estado del evento
function crearEvento(latitud, longitud, radiu, colors, map) {
  L.circle([latitud, longitud, 1], {
    radius: radiu,
    color: colors,
    fillOpacity: 0.6,
  }).addTo(map);
}

function eliminarEvento() {}

function range(valor, valorMenor, valorMayor) {
  return valor >= valorMenor && valor <= valorMayor;
}

function simularEventos(map) {
  for (let cantidadEventos = 0; cantidadEventos < 10000; cantidadEventos++) {
    let numRandomLat =
      (Math.random() / 5) * (Math.round(Math.random()) * 2 - 1);
    let numRandomLong =
      (Math.random() / 5) * (Math.round(Math.random()) * 2 - 1);

    let latitudRandomTotal = latitud + numRandomLat;
    let longitudRandomTotal = longitud + numRandomLong;
    let maxDistance_KM = 5;
    let eventDistance_KM = globalDistanceCalculator(
      latitud,
      longitud,
      latitudRandomTotal,
      longitudRandomTotal
    );
    //Muestra el evento si cumple la distancia que el usuario halla puesto
    if (eventDistance_KM <= maxDistance_KM) {
      crearEvento(
        latitudRandomTotal,
        longitudRandomTotal,
        10,
        "#FF0E0E94",
        map
      );
      let eventName = latitudRandomTotal + " " + longitudRandomTotal;
      let eventPrivacity =
        Math.round(Math.random(2) + 1) == 1 ? "Publico" : "Privado";
      let randomIndex = Math.round(Math.random() * (imageNameArray.length - 1));
      let eventType = eventTypeArray[randomIndex];
      let imageName = imageNameArray[randomIndex];
      let eventImagen = imageDirectory + imageName;
      let eventAltImg = "Una imagen";
      createEventElement(
        eventName,
        eventPrivacity,
        eventType,
        eventImagen,
        eventAltImg
      );
    }
  }
}

function clearMap(map) {
  for (i in map._layers) {
    if (map._layers[i]._path != undefined) {
      try {
        map.removeLayer(map._layers[i]);
      } catch (e) {
        console.log("problem with " + e + map._layers[i]);
      }
    }
  }
}

function degreeToRadians(grados) {
  return (grados * Math.PI) / 180;
}

//Formula para calcular la distancia entre 2 vectores con latitud y longitud (Formula del Haversine)
function globalDistanceCalculator(lat1, lon1, lat2, lon2) {
  lat1 = degreeToRadians(lat1);
  lon1 = degreeToRadians(lon1);
  lat2 = degreeToRadians(lat2);
  lon2 = degreeToRadians(lon2);
  const RADIO_TIERRA_EN_KILOMETROS = 6371;
  let diferenciaEntreLongitudes = lon2 - lon1;
  let diferenciaEntreLatitudes = lat2 - lat1;
  let a =
    Math.pow(Math.sin(diferenciaEntreLatitudes / 2.0), 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.pow(Math.sin(diferenciaEntreLongitudes / 2.0), 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return RADIO_TIERRA_EN_KILOMETROS * c;
}

const eventListCreator = document.querySelector(".eventListCreator");
function createEventElement(
  name = "Nombre Evento",
  privacity = "Publico/Privado",
  type = "Tipo de evento",
  img = "../Icons/GradientSquare.png",
  alt = "Imagen del evento"
) {
  const article = document.createElement("article");
  article.className = "card-list-container";
  eventListCreator.append(article);

  const h2 = document.createElement("h2");
  h2.id = "event-name";
  h2.textContent = name;
  article.append(h2);

  const divEventPresentation = document.createElement("div");
  divEventPresentation.className = "card-presentation-container";
  article.append(divEventPresentation);

  const imgElement = document.createElement("img");
  imgElement.id = "event-icon";
  imgElement.src = img;
  imgElement.alt = alt;
  divEventPresentation.append(imgElement);

  const pEventPrivacity = document.createElement("p");
  pEventPrivacity.id = "event-privacity";
  pEventPrivacity.textContent = privacity;
  divEventPresentation.append(pEventPrivacity);

  const pEventType = document.createElement("p");
  pEventType.id = "event-type";
  pEventType.textContent = type;
  divEventPresentation.append(pEventType);

  return Element;
}

function clearEventElementList() {
  eventListCreator.innerHTML = "";
}

//*Area de controles
const createEventButton = document.querySelector("#createEventButton");
const filterEventButton = document.querySelector("#filterEventButton");
const addFriendButton = document.querySelector("#addFrientButton");
const filterFriendButton = document.querySelector("#filterFriendButton");

createEventButton.addEventListener("click", () => {
  createEventMapFlip();
});

filterEventButton.addEventListener("click", () => {
  filterEventMapFlip();
});

addFriendButton.addEventListener("click", () => {
  alert("Añadir contacto");
});

filterFriendButton.addEventListener("click", () => {
  alert("Filtrar contactos");
});

function createEventMapFlip() {
  alert("Crear eventos");
}

function filterEventMapFlip() {
  alert("Filtrar evento");
}
