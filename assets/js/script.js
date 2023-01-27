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
});



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

  location.reload();
})

function reloadDogs() {
  var dogs = JSON.parse(localStorage.getItem("dogs"))
  if (dogs === null) {
    // populate placeholder div

    return;
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