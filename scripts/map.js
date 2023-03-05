//*URL para la documentacion de Leaflet https://leafletjs.com/reference.html#map-property
const imageDirectory = "../Icons/activity_Icon/";

let imageNameArray = [
  "rollers.png",
  "bike_line.png",
  "dance.png",
  "basketball_fill.png",
];
let eventTypeArray = ["Patinaje", "Ciclismo", "Danza", "Baloncesto"];

//*Elementos modal
const modal_event_container_element = document.querySelector(".modal-event-container");
const modal_create_event_element = document.querySelector(".modal-create-event");
const modal_filter_event_element = document.querySelector(".modal-filter-event");

const cancel_create_event_btn = document.querySelector(".modal-create-event #cancel-create-event-btn");
const accept_create_event_btn = document.querySelector(".modal-create-event #accept-create-event-btn");

const cancel_filter_event_btn = document.querySelector(".modal-filter-event #cancel-create-event-btn");
const accept_filter_event_btn = document.querySelector(".modal-filter-event #accept-create-event-btn");

//*Elementos modal form
const distance_range_element = document.querySelector(".modal-filter-event #distance-range");
const distance_range_value_element = document.querySelector(".modal-filter-event #distance-range-value");
distance_range_value_element.textContent = distance_range_element.value;
distance_range_element.addEventListener("change", () => {
distance_range_value_element.textContent = distance_range_element.value;
});

//Variables para posición
let latitud;
let longitud = -0.09;
let altura = 15;

var latlng;

//** Container para la lista de eventos
const eventListCreator = document.querySelector(".eventListCreator");

// compose DOM nodes
let fragment = document.createDocumentFragment();

//variable para el mapa
var map;

loadMap();

function loadMap() {
  if (navigator.geolocation) {
    var success = function (position) {
      latIng = L.latLng(position.coords.latitude, position.coords.longitude);
      //imprimir por consola
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
      //Guardo en variables las coordenadas actuales del dispositivo
      latitud = parseFloat(position.coords.latitude);
      longitud = parseFloat(position.coords.longitude);
      // Definir la posición a la que se moverá el mapa
      var userPosition = L.latLng(latitud, longitud);

      //Limpio el mapa
      if (map != null) {
        map.remove();
      }

      //Instancia el objeto map
      map = L.map("map", {
        center: userPosition,
        zoom: altura,
        zoomControl: false,
      });

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
      }).addTo(map);
      map.attributionControl.setPosition("bottomleft");

      //** Area de Botones
      // Crea un control personalizado
      var createEventControl_btn = L.Control.extend({
        options: {
          position: "bottomright",
        },
        onAdd: function (mapa) {
          var container = L.DomUtil.create(
            "div",
            "leaflet-bar leaflet-control"
          );
          add_btn_element_created = document.createElement("button");
          img_element_created = document.createElement("img");

          add_btn_element_created.className = "floating-map-button add";
          add_btn_element_created.id = "create-map-event-btn";
          add_btn_element_created.addEventListener("click", createEventMapFlip);

          img_element_created.src = "../Icons/gui/add_new_256.png";

          add_btn_element_created.appendChild(img_element_created);

          container.appendChild(add_btn_element_created);
          return container;
        },
      });
      var createFilterControl_btn = L.Control.extend({
        options: {
          position: "bottomright",
        },
        onAdd: function (mapa) {
          var container = L.DomUtil.create(
            "div",
            "leaflet-bar leaflet-control"
          );

          filter_btn_element_created = document.createElement("button");
          img_element_created = document.createElement("img");

          filter_btn_element_created.className = "floating-map-button filter";
          filter_btn_element_created.id = "filter-map-event-btn";
          filter_btn_element_created.addEventListener(
            "click",
            filterEventMapFlip
          );

          img_element_created.src = "../Icons/gui/filter_standard_256.png";

          filter_btn_element_created.appendChild(img_element_created);

          container.appendChild(filter_btn_element_created);
          return container;
        },
      });
      var createCenterControl_btn = L.Control.extend({
        options: {
          position: "topright",
        },
        onAdd: function (mapa) {
          var container = L.DomUtil.create(
            "div",
            "leaflet-bar leaflet-control"
          );

          filter_btn_element_created = document.createElement("button");
          img_element_created = document.createElement("img");
          let zoom = 17;

          filter_btn_element_created.className =
            "floating-map-button my-location";
          filter_btn_element_created.id = "";
          filter_btn_element_created.addEventListener("click", () => {
            // Mover el mapa a la posición seleccionada
            map.setView(userPosition, zoom);
          });

          img_element_created.src = "../Icons/gui/my_location_48dp.png";

          filter_btn_element_created.appendChild(img_element_created);

          container.appendChild(filter_btn_element_created);
          return container;
        },
      });

      // Agrega el control personalizado al mapa
      map.addControl(new createFilterControl_btn());
      map.addControl(new createEventControl_btn());
      map.addControl(new createCenterControl_btn());

      //**------------------ Area de Botones [Arriba]

      //*Marcador de usuario
      //TODO: Mejorar el punto donde está el usuario
      var userMarker = {
        icon: L.icon({
          iconUrl: "../Icons/gui/standing_man_48dp.png",
          iconSize: [19, 19], // tamaño de la imagen
          iconAnchor: [9.5, 9.5], // punto central de la imagen
          className: "user-marker", // clase CSS personalizada para agregar fondo azul
        }),
      };
      var userCircle = {
        radius: 50,
        borderRadius: 1,
        color: "#1a87d5",
        fillOpacity: 0.3,
        opacity: 0.4,
      };

      L.marker([latitud, longitud], userMarker).addTo(map);
      L.circle([latitud, longitud], userCircle).addTo(map);

      //**------------------ Usuario [Arriba]

      //**Creo un layer-group para agrupar los iconos
      var groupLayer = L.layerGroup().addTo(map);

      //**Area de eventos

      //1 second = 1000 milliseconds.
      const intervalID = setInterval(cargadorDeEventos, 100000);

      //Muestra los primeros eventos al inicio
      simularEventos(groupLayer);

      function cargadorDeEventos() {
        //Elimina los eventos cada vez que se reinicia(Limpia el mapa)
        clearMapShape(groupLayer);
        clearEventElementList();

        simularEventos(groupLayer);
      }

      //**------------------ Eventos [Arriba]
    };
    navigator.geolocation.getCurrentPosition(success, function (msg) {
      console.error(msg);
    });
  }
}

function mostrarEvento(
  latitud,
  longitud,
  iconUrl,
  layerGroup,
  mensaje = "Evento"
) {
  var iconContainer = document.createElement("div"); // crear el contenedor
  iconContainer.style.width = "100px";

  var iconImg = document.createElement("img"); // crear la imagen
  iconImg.src = iconUrl;
  iconImg.style.width = "15px"; // definir el tamaño de la imagen
  iconImg.style.height = "15px";
  iconImg.className = "event-icon-img";

  iconContainer.appendChild(iconImg); // agregar la imagen al contenedor

  var eventMarker = L.marker([latitud, longitud], {
    icon: L.divIcon({
      className: "event-icon-container", // asignar la misma clase que el contenedor
      html: iconContainer.outerHTML, // usar el HTML del contenedor como el icono
      iconSize: [17, 17], // tamaño del contenedor
      iconAnchor: [8.5, 8.5], // punto central del icono
    }),
  })
    .bindPopup(mensaje)
    .addTo(layerGroup);
}

//eventMarker.setPopupContent("Este es mi nuevo mensaje emergente");
function eliminarEvento() {}

function range(valor, valorMenor, valorMayor) {
  return valor >= valorMenor && valor <= valorMayor;
}

function simularEventos(groupLayer) {
  let maxDistance_KM = parseInt(distance_range_element.value);//TODO: Añadir el valor ranges
  for (let cantidadEventos = 0; cantidadEventos < 10000; cantidadEventos++) {
    let numRandomLat =
      (Math.random() / 5) * (Math.round(Math.random()) * 2 - 1);
    let numRandomLong =
      (Math.random() / 5) * (Math.round(Math.random()) * 2 - 1);

    let latitudRandomTotal = latitud + numRandomLat;
    let longitudRandomTotal = longitud + numRandomLong;
    let eventDistance_KM = globalDistanceCalculator(
      latitud,
      longitud,
      latitudRandomTotal,
      longitudRandomTotal
    );
    //Muestra el evento si cumple la distancia que el usuario halla puesto
    if (eventDistance_KM <= maxDistance_KM) {
      let eventName = latitudRandomTotal + " " + longitudRandomTotal;
      let eventPrivacity =
        Math.round(Math.random(2) + 1) == 1 ? "Publico" : "Privado";
      let randomIndex = Math.round(Math.random() * (imageNameArray.length - 1));
      let eventType = eventTypeArray[randomIndex];
      let imageName = imageNameArray[randomIndex];
      let eventImagen = imageDirectory + imageName;
      let eventAltImg = "Una imagen";

      let listaEventosCreados = createEventElement(
        eventName,
        eventPrivacity,
        eventType,
        eventImagen,
        eventAltImg,
        "cl" + cantidadEventos
      );
      fragment.appendChild(listaEventosCreados);
      mostrarEvento(
        latitudRandomTotal,
        longitudRandomTotal,
        eventImagen,
        groupLayer,
        "mensaje popup"
      );
    }
    eventListCreator.appendChild(fragment);
  }
}

/**
 * Elimina las capas del mapa recorriendo la lista de capas del map.
 *
 * @param {*} map
 */
function clearMapShape(layerGroup) {
  // Eliminar todos los iconos de la capa
  layerGroup.clearLayers();
}

/**
 * Transforma los grados a radianes.
 *
 * @param {*} grados
 * @returns
 */
function degreeToRadians(grados) {
  return (grados * Math.PI) / 180;
}

/**
 * Calcula la distancia entre dos vectores con latitud y longitud, utilizando la formula del Haversine.
 *
 * @param {*} lat1
 * @param {*} lon1
 * @param {*} lat2
 * @param {*} lon2
 * @returns Number, la distancia entre dos vectores.
 */
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

/**
 *
 * @param {*} name
 * @param {*} privacity
 * @param {*} type
 * @param {*} img
 * @param {*} alt
 * @returns < article >, carta del evento, que es un elemento html.
 */
function createEventElement(
  name = "Nombre Evento",
  privacity = "Publico/Privado",
  type = "Tipo de evento",
  img = "../Icons/activity_Icon/pedal_bike_black_24dp.png",
  alt = "Imagen del evento",
  className,
  description = "None"
) {
  //*Crea el elemento del evento
  const article = document.createElement("article");
  article.className = "card-list-container" + " " + className;
  //TODO:insertar un eventListener para el evento y que se muestre un mensaje
  article.setAttribute("data-event",`${name}`)
  article.setAttribute("data-event_description",`${description}`)
  article.addEventListener("click", () => {
    const nameEventElement = document.querySelector(".event-description-container h4");
    const descriptionEventElement = document.querySelector(".event-description-container p");

    const eventName = article.dataset.event;
    nameEventElement.textContent = eventName;

    const descriptionEvent = article.dataset.event_description;
    descriptionEventElement.textContent = descriptionEvent;

    console.log(eventName);
  });

  //*h2 subtitulo del evento
  const h2 = document.createElement("h2");
  h2.id = "event-name";
  h2.textContent = name;
  article.append(h2);

  //*div contenedor de detalles del evento
  const divEventPresentation = document.createElement("div");
  divEventPresentation.className = "card-presentation-container";
  article.append(divEventPresentation);

  //*fondo de imagen del evento
  const spanElement = document.createElement("div");
  spanElement.id = "image-container";

  //*imagen del evento
  const imgElement = document.createElement("img");
  imgElement.id = "event-icon";
  imgElement.src = img;
  imgElement.alt = alt;
  spanElement.append(imgElement);
  divEventPresentation.append(spanElement);

  //*párrafo de privacidad del evento
  const pEventPrivacity = document.createElement("p");
  pEventPrivacity.id = "event-privacity";
  pEventPrivacity.textContent = privacity;
  divEventPresentation.append(pEventPrivacity);

  //*párrafo de tipo del evento
  const pEventType = document.createElement("p");
  pEventType.id = "event-type";
  pEventType.textContent = type;
  divEventPresentation.append(pEventType);

  return article;
}

function clearEventElementList() {
  eventListCreator.innerHTML = "";
  fragment = document.createDocumentFragment();
}

//*Area de controles
const createEventButton = document.querySelector("#create-event-btn");
const filterEventButton = document.querySelector("#filter-events-btn");
const addFriendButton = document.querySelector("#add-contact-btn");
const filterFriendButton = document.querySelector("#filter-contacts-btn");

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
  modal_event_container_element.classList.add("show-create-event");
  modal_create_event_element.style.display = "block";
}

function filterEventMapFlip() {
  modal_event_container_element.classList.add("show-create-event");
  modal_filter_event_element.style.display = "block";
}

//* Modal create and filter event controls

//--------------------------Crear eventos--------------------------------------
cancel_create_event_btn.addEventListener("click", () => {
  modal_event_container_element.classList.remove("show-create-event");
  modal_create_event_element.style.display = "none"; 
})

accept_create_event_btn.addEventListener("click", () => {
  alert("Evento creado");
})

//--------------------------Filtrar eventos--------------------------------------
cancel_filter_event_btn.addEventListener("click", () => {
  modal_event_container_element.classList.remove("show-create-event");
  modal_filter_event_element.style.display = "none"; 
})

accept_filter_event_btn.addEventListener("click", () => {
  alert("Evento filtrado");
})

