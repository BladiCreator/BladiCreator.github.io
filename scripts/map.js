let latitud = 51.505;
let longitud = -0.09;
let altura = 15;



var latlng;

if (navigator.geolocation) {
    var success = function (position) {
        latIng = L.latLng(position.coords.latitude, position.coords.longitude);
        //imprimir por consola
        console.log(position.coords.latitude)
        console.log(position.coords.longitude)
        //Obtener las coordenada actual del dispositivo
        latitud = position.coords.latitude;
        longitud = position.coords.longitude;

        //Instancio el objeto map
        var map = L.map("map").setView(
            [latitud, longitud],
            altura
        );

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: "© OpenStreetMap",
        }).addTo(map);
    };
    navigator.geolocation.getCurrentPosition(success, function (msg) {
        console.error(msg);
    });
}