$(document).ready(function(){
  $('.tabs').tabs();
  $('.modal').modal();
  $('.dropdown-trigger').dropdown();
});



function initMap(){
  // The location of Uluru
const uluru = { lat: 50, lng: 180 };
// The map, centered at Uluru
const map = new google.maps.Map(document.getElementById("map"), {
  zoom: 4,
  center: uluru,
});
}
initMap()