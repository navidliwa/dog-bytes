var products = [
  {
    brandName: "Purina One Chicken and Rice (kibble)",
    0: 0.5,
    1: 1.25,
    2: 1.75,
    3: 2.5,
    4: 3.25,
    5: 4.25,
  }, {
    brandName: "Purina One Beef and Brown Rice (canned)",
    0: 0.75,
    1: 1.25,
    2: 1.75,
    3: 2.5,
    4: 3.5,
    5: 4.5,
  }, {
    brandName: "Blue Buffalo Chicken Dinner (canned)",
    0: 0.75,
    1: 1.5,
    2: 2.25,
    3: 3.25,
    4: 5.25,
    5: 6.5,
  }, {
    brandName: "Blue Buffalo Life Protection Formula (kibble)",
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

$(document).ready(function () {
  $('.tabs').tabs();
  $('.modal').modal();
  $('.dropdown-trigger').dropdown();
  $('select').formSelect();
  reloadDogs();
  selectLast();
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
  console.log(dogs)
  if (dogs === null) {
    return;
  }
  var lastDogPos = dogs.length - 1
  $('#placeholder').attr("style","display: none");
  $('.placeholder').attr('style', 'display: none');
  for (var i = 0; i < dogs.length; i++) {
    //tab elements
    var dogTabEl = document.createElement("li");
    dogTabEl.setAttribute("class", "tab col s2");
    var dogTabA = document.createElement("a");
    dogTabA.setAttribute("href", "#dog"+i);
    dogTabA.setAttribute("class", "dogtab"+i);
    dogTabA.innerText = dogs[i].name
    dogTabEl.append(dogTabA)
    $('#tabs').append(dogTabEl)


    //food calcs
    var primaryFoodServings = products[dogs[i].food1][dogs[i].weight]*dogs[i].food1percent/100
    console.log(primaryFoodServings)
    var secondaryFoodServings = products[dogs[i].food2][dogs[i].weight]*dogs[i].food2percent/100
    console.log(secondaryFoodServings)
    if (dogs[i].dietGoal == 0) {
      primaryFoodServings = primaryFoodServings * 0.9
      secondaryFoodServings = secondaryFoodServings * 0.9
    } else if (dogs[i].dietGoal == 2) {
      primaryFoodServings = primaryFoodServings * 1.1
      secondaryFoodServings = secondaryFoodServings * 1.1
    }
    console.log(primaryFoodServings)
    console.log(secondaryFoodServings)
    var primaryString = primaryFoodServings.toFixed(2)
    var secondaryString = secondaryFoodServings.toFixed(2)

    //dog detail elements
    var dogName = document.createElement('h2')
    var listEl = document.createElement('ul')
    var dogWeight = document.createElement('li')
    var dogFunFact = document.createElement('li')
    var dogDiet = document.createElement('li')
    var dogMealPlan = document.createElement('p')
    dogName.innerText = dogs[i].name;
    dogWeight.innerText = "Weight: " + weights[dogs[i].weight];
    dogFunFact.innerText = "Fun Fact: " + dogs[i].funFact;
    dogDiet.innerText = "To achieve health and happiness, " + dogs[i].name + " needs to " + diets[dogs[i].dietGoal] + ".";
    dogMealPlan.innerHTML = "<p>" + products[dogs[i].food1].brandName + " - cups/day: "+primaryString+"</p><br><p>"+products[dogs[i].food2].brandName+" - cans/day: "+secondaryString+"</p>"
    listEl.append(dogWeight, dogFunFact, dogDiet, dogMealPlan)
    var currentDogEl = document.createElement('div');
    currentDogEl.setAttribute("class", "col s12")
    currentDogEl.setAttribute("id", "dog"+i)
    currentDogEl.setAttribute("style", "display: none")
    currentDogEl.append(dogName, listEl)
    $('#container').append(currentDogEl)

    // add the image?
    

  }
}

// Select most recently created tab?
function selectLast() {
    $('#tabs:last-child').children().click()
    console.log('this function is running')
  }

// Test image preview
document.addEventListener("DOMContentLoaded", () => {
  var imageDataUrl = localStorage.getItem("photo");

  if (imageDataUrl) {
    document.querySelector("#imgPreview").setAttribute("src", imageDataUrl);
  }
});


// clearing local storage when you remove a dog's profile
// form field validations
// do input validation

// style modal
// style main page

// look into how to look for dog parks via api