const apiKey = 'AIzaSyCMvF_-po-_5NauKvu27lmuClGyHqgG9NU'
const openWeatherKey = '6e36d909b1e27a85b3c299313b8d76b9'
var map;
var markers = [];

var products = [
  {
    brandName: "Purina One (kibble)",
    threeToTwelve: 0.5,
    thirteenToTwenty: 1,
    twentyOneToThirtyFive: 1.5,
    thirtySixToFifty: 2,
    fiftyOneToSeventyFive: 3,
    seventySixToOneHundred: 4,
  }, {
    brandName: "Purina One (canned)",
    threeToTwelve: 0.5,
    thirteenToTwenty: 1,
    twentyOneToThirtyFive: 1.5,
    thirtySixToFifty: 2,
    fiftyOneToSeventyFive: 3,
    seventySixToOneHundred: 4,
  }
]

this.photoData = "";

$(document).ready(function () {
  $('.tabs').tabs();
  $('.modal').modal();
  $('.dropdown-trigger').dropdown();
  $('select').formSelect();
  reloadDogs();
  initMap()
});



//code for initializing the google map
function initMap() {

  var coords = { lat: 41.22, lng: -111.97 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: coords,
    
  });
  console.log(map)
}
//event listener for map search button
$('#zip-input-button').on('click', function () {
  $("#zip-input-status").text("Enter zip code for near by dog parks!")
  var searchTerm = $("#zip-input").val()
  var searchLat;
  var searchLng;
  console.log(searchTerm)
  //use open weather api to get lat and lng from the zip code
  $.ajax({
    url: "http://api.openweathermap.org/geo/1.0/zip?zip=" + searchTerm + "&appid=" + openWeatherKey,
    success: function (data) {
      searchLat = data.lat
      searchLng = data.lon
      console.log(searchLat, searchLng)
      //if successful, use lat and lng to get dog parks, or just parks
      getDogParks(searchLat, searchLng)
    },
    error: function (xhr) {
      $("#zip-input-status").text("Zip code not found! Error: " + xhr.status + ", " + xhr.statusText)
    }
  })
})
//get details of near by dog parks using google places api
function getDogParks(lat, lng) {
  $.ajax({
    url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + '%2C' + lng + '&radius=5000&keyword=dog+park&key=' + apiKey,
    success: function (data) {
      console.log(data)
      generateMarkers(data)
    },
    error: function (data) {
      console.log(data)
    }
  })
}
function generateMarkers(data) {
  //clear previous markers
  for(var i = 0; i < markers.length; i++){
    markers[i].setMap(null)
  }
  //zoom in on marker 1
  map.setZoom(12)
  map.panTo(data.results[0].geometry.location)
  for (var i = 0; i < data.results.length; i++) {
    markers.push(new google.maps.Marker({
      position: data.results[i].geometry.location,
      map: map,
      label: ""+(i+1),
      title: data.results[i].name
    }))
  }
}




document.querySelector('#photo').addEventListener('change', function () {
  var reader = new FileReader();

  reader.addEventListener('load', () => {
    console.log(reader.result);
    localStorage.setItem('photo', reader.result);
    photoData = reader.result;
  })

  reader.readAsDataURL(this.files[0]);
})

$('.save-dog').on('click', function () {
  var doggyDeets = {
    name: $('#dog-name').val(),
    weight: $('#dog-weight').val(),
    funFact: $('#fun-fact').val(),
    dietGoal: $('#diet').val(),
    food1: $('#food1').val(),
    food1percent: $('#food-1-percent').val(),
    food2: $('#food2').val(),
    food2percent: $('#food-2-percent').val(),
    photo: photoData,
  }
  console.log(doggyDeets, typeof (doggyDeets))
  var dogObj = JSON.parse(localStorage.getItem("dogs"))
  if (dogObj == null) dogObj = []
  dogObj.push(doggyDeets)
  localStorage.setItem("dogs", JSON.stringify(dogObj))

  reloadDogs();
})

function reloadDogs() {
  var dogs = JSON.parse(localStorage.getItem("dogs"))
  if (dogs === null) {
    return;
  }
  for (var i = 0; i < dogs.length; i++) {
    // var tabs = document.querySelector("#tabs");
    // tabs.appendChild(`<li class="tab col s4"><a href="#test${i+1}">'Test ${i+1}'</a></li>
    // `)
    var currentDog = dogs[i]
    var element = document.querySelector(`#test${i + 1}`);
    element.innerHTML = JSON.stringify(currentDog);

  }
}


// Test image preview
document.addEventListener("DOMContentLoaded", () => {
  var imageDataUrl = localStorage.getItem("photo");

  if (imageDataUrl) {
    document.querySelector("#imgPreview").setAttribute("src", imageDataUrl);
  }
});


// clearing local storage when you remove a dog's profile
// populate div tabs with data from localstorage on load
// form field validations
// actually create dog food table records
// build calcs for meal plans
