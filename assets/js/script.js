$(document).ready(function () {
  $('.modal').modal();
  $('.dropdown-trigger').dropdown();
  $('select').formSelect();
  reloadDogs();
  initMap()
});
const apiKey = 'AIzaSyCMvF_-po-_5NauKvu27lmuClGyHqgG9NU'
const openWeatherKey = '6e36d909b1e27a85b3c299313b8d76b9'
var map;
var markers = [];

var products = [
  {
    brandName: "Purina One Chicken and Rice",
    0: 0.5,
    1: 1.25,
    2: 1.75,
    3: 2.5,
    4: 3.25,
    5: 4.25,
  }, {
    brandName: "Purina One Beef and Brown Rice",
    0: 0.75,
    1: 1.25,
    2: 1.75,
    3: 2.5,
    4: 3.5,
    5: 4.5,
  }, {
    brandName: "Blue Buffalo Chicken Dinner",
    0: 0.75,
    1: 1.5,
    2: 2.25,
    3: 3.25,
    4: 5.25,
    5: 6.5,
  }, {
    brandName: "Blue Buffalo Life Protection Formula",
    0: 0.75,
    1: 1.5,
    2: 2,
    3: 3,
    4: 3.75,
    5: 4.5,
  }
]
var weights = ["3 - 12 lbs","13 - 20 lbs","21 - 35 lbs","36 - 50 lbs","51 - 75 lbs,","76 - 100 lbs"]
var diets = ["lose weight","maintain weight","gain weight"]


this.photoData = "";

var randomimg ="";
var preview = document.getElementById('imgPreview');
var button = document.getElementById('RandomButton')

function randomdog() {

  fetch('https://dog.ceo/api/breeds/image/random')
  .then (Response=>Response.json())
  .then (Response=>{
    randomimg = Response.message;
    preview.src = randomimg;
  });
  return randomimg;

}

document.addEventListener("DOMContentLoaded", function(){
  randomdog();
  button.addEventListener("click", function(){
    randomdog();
  });

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
    url: "https://api.openweathermap.org/geo/1.0/zip?zip=" + searchTerm + "&appid=" + openWeatherKey,
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
  console.log(dogs)
  if (dogs === null) {
    // Add placeholder tab
    var tabs = document.querySelector("#tabs");
    var noDogTab = document.createElement("li");
    noDogTab.setAttribute("href", "#no-dog");
    noDogTab.setAttribute("class", "tab col s2");
    noDogTab.innerHTML = 
    `
    <a>Create a Dog Profile!</a>
    `;
    tabs.appendChild(noDogTab);
    
    // Add placeholder div
    var dogProfiles = document.querySelector("#dogProfiles");
    var placeHolder = document.createElement("div")
    placeHolder.setAttribute("id", "no-dog");
    placeHolder.setAttribute("class", "col s12");
    placeHolder.innerHTML = 
    `
    <h4 class="center-align">You haven't added any dogs!</h4>
    <p class="center-align">
      <a class="btn-large waves-effect waves-light modal-trigger red" id="placeholderBtn" href="#modal1">
        <img src="./assets/images/add-dog.png" alt="" height="30px" class="add-dog">
        Click here to add a dog profile!
      </a>
    </p>
    `;
    dogProfiles.appendChild(placeHolder);
    return;
  }
  var lastDogPos = dogs.length - 1
  $('#placeholder').attr("style","display: none");
  $('.placeholder').attr('style', 'display: none');
  for (var i = 0; i < dogs.length; i++) {
    //food calcs
    var primaryFoodServings = products[dogs[i].food1][dogs[i].weight]*dogs[i].food1percent/100
    console.log(primaryFoodServings)
    var secondaryFoodServings = products[dogs[i].food2][dogs[i].weight]*dogs[i].food2percent/100
    console.log(secondaryFoodServings)
    var primaryHalf = primaryFoodServings/2
    var secondaryHalf = secondaryFoodServings/2
    if (dogs[i].dietGoal == 0) {
      primaryFoodServings = primaryFoodServings * 0.9
      secondaryFoodServings = secondaryFoodServings * 0.9
      primaryHalf = primaryHalf * 0.9
      secondaryHalf = secondaryHalf * 0.9
    } else if (dogs[i].dietGoal == 2) {
      primaryFoodServings = primaryFoodServings * 1.1
      secondaryFoodServings = secondaryFoodServings * 1.1
      primaryHalf = primaryHalf * 1.1
      secondaryHalf = secondaryHalf * 1.1
    }
    console.log(primaryFoodServings)
    console.log(secondaryFoodServings)
    var primaryString = primaryFoodServings.toFixed(2)
    var secondaryString = secondaryFoodServings.toFixed(2)
    var primaryHalfString = primaryHalf.toFixed(2)
    var secondaryHalfString = secondaryHalf.toFixed(2)

    // Adds tabs according to number of profiles added
    var tabs = document.querySelector("#tabs");
    var tab = document.createElement("li");
    tab.setAttribute("class", "tab col s2");
    var tabLink = document.createElement("a");
    tabLink.setAttribute("href", "#dog" + (i+1));
    tabLink.innerHTML = `${dogs[i].name}`;
    tab.appendChild(tabLink);
    tabs.appendChild(tab);
    
    // Adds dog info sections according to number of profiles added
    var imageDataUrl = localStorage.getItem("photo");
    var dogProfiles = document.querySelector("#dogProfiles");
    var dogInfo = document.createElement("div");
    dogInfo.setAttribute("id", "dog" + (i+1));
    dogInfo.setAttribute("class", "col s12");
    // Dog info is populated into dogInfo div
    dogInfo.innerHTML = 
      `
      <div class="col s8">
        <h5 class="center-align">Name: ${dogs[i].name}</h5>
        <h5 class="center-align">Weight: ${weights[dogs[i].weight]}</h5>
        <h5 class="center-align">Fun Fact: ${dogs[i].funFact}</h5>
        <h5 class="center-align">To achieve health and happiness, ${dogs[i].name} needs to ${diets[dogs[i].dietGoal]}.</h5>
      </div>
      <div class="col s4">
        <img id="imgPreview" src="${imageDataUrl}" alt="preview" class="responsive-img"> <!-- testing img preview -->
      </div>
      <div class="row">
        <div class="col s12">
          <h4 class="center-align">
            ${dogs[i].name} should be fed daily:
          </h4>
            <ul>
              <li class="center-align">
                <h5>
                  ${secondaryString} can of canned food (${products[dogs[i].food2].brandName})
                </h5>
              </li>
              <li class="center-align">
                <h5>
                  ${primaryString} cups of kibble (${products[dogs[i].food1].brandName})
                </h5>
              </li>
            </ul>
          <h4 class="center-align">
            For 2 meals/day feed:
          </h4>
          <ul>
            <li class="center-align">
              <h5>
                ${secondaryHalfString} can of canned food
              </h5>
            </li>
            <li class="center-align">
              <h5>
                ${primaryHalfString} cup of kibble
              </h5>
            </li>
          </ul>
        </div>
      </div>
      `;
    dogProfiles.appendChild(dogInfo);
    // Initializes Materialize tabs after tabs are appended so page loads correctly
    $('.tabs').tabs();
  }
}

// Select most recently created tab?
function selectLast() {
    $('#tabs:last-child').children().click()
    console.log('this function is running')
  }

// Test image preview
// document.addEventListener("DOMContentLoaded", () => {
//   var imageDataUrl = localStorage.getItem("photo");

//   if (imageDataUrl) {
//     document.querySelector("#imgPreview").setAttribute("src", imageDataUrl);
//   }
// });



// clearing local storage when you remove a dog's profile
// form field validations
// do input validation

// style modal
// style main page
