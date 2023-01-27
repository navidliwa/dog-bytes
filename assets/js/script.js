var products = [
  {
      brandName: "Purina One (kibble)",
      threeToTwelve: 0.5,
      thirteenToTwenty: 1,
      twentyOneToThirtyFive: 1.5,
      thirtySixToFifty: 2,
      fiftyOneToSeventyFive: 3,
      seventySixToOneHundred: 4,
  },{
      brandName: "Purina One (canned)",
      threeToTwelve: 0.5,
      thirteenToTwenty: 1,
      twentyOneToThirtyFive: 1.5,
      thirtySixToFifty: 2,
      fiftyOneToSeventyFive: 3,
      seventySixToOneHundred: 4,  
  }
]



$(document).ready(function(){
  $('.tabs').tabs();
  $('.modal').modal();
  $('.dropdown-trigger').dropdown();
  $('select').formSelect();
  initMap()

});



function initMap(){
  
var coords = { lat: 41.22, lng: -111.97 };
// The map, centered at Uluru
const map = new google.maps.Map(document.getElementById("map"), {
  zoom: 10,
  center: coords,
});
}


$('.save-dog').on('click', function() {
  var doggyDeets = {
    name: $('#dog-name').val(),
    weight: $('#dog-weight').val(),
    funFact: $('#fun-fact').val(),
    dietGoal: $('#diet').val(),
    food1: $('#food1').val(),
    food1percent: $('#food-1-percent').val(),
    food2: $('#food2').val(),
    food2percent: $('#food-2-percent').val()
  }
  console.log (doggyDeets, typeof(doggyDeets))
 var dogObj = JSON.parse(localStorage.getItem("dogs"))
 if(dogObj == null) dogObj = []
 dogObj.push(doggyDeets)
 localStorage.setItem("dogs", JSON.stringify(dogObj))

 //todo: append image to localstorage

})


// clearing local storage when you remove a dog's profile
// populate div tabs with data from localstorage on load
// form field validations
// actually create dog food table records
// build calcs for meal plans
