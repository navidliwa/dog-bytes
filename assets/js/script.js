const apiKey = 'AIzaSyCMvF_-po-_5NauKvu27lmuClGyHqgG9NU'
const openWeatherKey = '6e36d909b1e27a85b3c299313b8d76b9'
var map;
var markers = [];

var products = [
  {
    brandName: "Purina One Chicken and Rice (kibble)",
    threeToTwelve: 0.5,
    thirteenToTwenty: 1.25,
    twentyOneToThirtyFive: 1.75,
    thirtySixToFifty: 2.5,
    fiftyOneToSeventyFive: 3.25,
    seventySixToOneHundred: 4.25,
  }, {
    brandName: "Purina One Beef and Brown Rice (canned)",
    threeToTwelve: 0.75,
    thirteenToTwenty: 1.25,
    twentyOneToThirtyFive: 1.75,
    thirtySixToFifty: 2.5,
    fiftyOneToSeventyFive: 3.5,
    seventySixToOneHundred: 4.5,
  }, {
    brandName: "Blue Buffalo Chicken Dinner (canned)",
    threeToTwelve: 0.75,
    thirteenToTwenty: 1.5,
    twentyOneToThirtyFive: 2.25,
    thirtySixToFifty: 3.25,
    fiftyOneToSeventyFive: 5.25,
    seventySixToOneHundred: 6.5,
  }, {
    brandName: "Blue Buffalo Life Protection Formula (kibble)",
    threeToTwelve: 0.75,
    thirteenToTwenty: 1.5,
    twentyOneToThirtyFive: 2,
    thirtySixToFifty: 3,
    fiftyOneToSeventyFive: 3.75,
    seventySixToOneHundred: 4.5,
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
    url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + '%2C' + lng + '&radius=10000&keyword=dog+park&key=' + apiKey,
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
  for (var i = 0; i < 5; i++) {
    markers.push(new google.maps.Marker({
      position: data.results[i].geometry.location,
      map: map,
      label: ""+(i+1),
      title: data.results[i].name
    }))
  }
}




document.querySelector('#photo').addEventListener('change', function  ()  {
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

  location.reload();
})

function reloadDogs() {
  var dogs = JSON.parse(localStorage.getItem("dogs"))
  if (dogs === null) {
    // populate placeholder div

  }
  for (var i = 0; i < dogs.length; i++) {
    // var tabs = document.querySelector("#tabs");
    // tabs.appendChild(`<li class="tab col s4"><a href="#test${i+1}">'Test ${i+1}'</a></li>
    // `)
    var currentDog = dogs[i]
    var element = document.querySelector(`#test${i + 1}`);
    element.innerHTML = JSON.stringify(currentDog);

    // append li with internal anchor tag to #tabs: <li class="tab col s2"><a href="#test1">Test 1</a></li>
    // append div to #container: <div id="test1" class="col s12">Test 1</div>
    // create dog detail elements
    // write data from dog object to the inner elements using .each()




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
// do input validation

// look into how to look for dog parks via api