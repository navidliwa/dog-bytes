$(document).ready(function () {
  $('.modal').modal();
  $('.dropdown-trigger').dropdown();
  $('select').formSelect();
  reloadDogs();
});

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
  for (var i = 0; i < dogs.length; i++) {

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
        <h5 class="center-align">Weight: ${dogs[i].weight}lbs</h5>
        <h5 class="center-align">Food choice: ${dogs[i].food1}, ${dogs[i].food2}</h5>
        <h5 class="center-align">Fun Fact: ${dogs[i].funFact}</h5>
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
                  VARIABLE HERE can of canned food
                </h5>
              </li>
              <li class="center-align">
                <h5>
                  VARIABLE HERE cups of kibble
                </h5>
              </li>
            </ul>
          <h4 class="center-align">
            For 2 meals/day feed:
          </h4>
          <ul>
            <li class="center-align">
              <h5>
                VARIABLE HERE can of canned food
              </h5>
            </li>
            <li class="center-align">
              <h5>
                VARIABLE HERE cup of kibble
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

