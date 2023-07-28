const favoritesList = $("#favoritesList");
const petImage = $("#petImage");
const generateButton = $("#generateButton");
const breedText = $("#currentBreedText");
const favoriteButton = $("#favoriteButton");
const factText = $("#funFactText");
const testUrl = "https://cataas.com/cat?json=true";
const welcomeButton = $("#start");
const welcomePage = $("#welcomePage");
const catPage = $("#catPage");
let currentBreed;

// Renders favorites list by taking values from localstorage
function loadFavoritesList() {
  let favoriteBreeds = JSON.parse(localStorage.getItem("favoriteBreeds"));
  $(favoritesList).html("");
  if (!favoriteBreeds) {
    breedLi = $("<li>");
    breedLi.addClass("bg-red-300 p-2 text-white border-t-2 border-white");
    breedLi.text("No breeds favorited yet!");
    $(favoritesList).append(breedLi);
  } else {
    for (let i = 0; i < favoriteBreeds.length; i++) {
      breedLi = $("<li>");
      breedLi.addClass("p-2 text-white border-t-2 border-white bg-grey");
      breedLi.text(favoriteBreeds[i]);
      $(favoritesList).append(breedLi);
    }
  }
}

// Renders picture of cat and defines currentBreed variable for later use
function getCatPic() {
  var requestUrl =
    "https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1&api_key=live_lkUcIGhHny1aB9p7gGVkrT3tBLGtuYNCBS6j3kFRxxWdKxXWwWRoCJFwUB4YUIOO";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      currentBreed = data[0].breeds[0].name;
      $(petImage).attr("src", data[0].url);
      $(breedText).text(`Breed: ${data[0].breeds[0].name}`);
    });
}

// Renders cat fact in fact box
function getCatFact() {
  var requestUrl = "https://meowfacts.herokuapp.com/";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      $(factText).text(data.data);
    });
}

// Adds event listener to "generate cat" button to load new picture and fact
$(generateButton).on("click", () => {
  getCatPic();
  getCatFact();
});

// Adds event listener to "favorite" button to store the breed of the currently shown cat in localstorage, then re-renders list
$(favoriteButton).on("click", () => {
  let favoriteBreeds = JSON.parse(localStorage.getItem("favoriteBreeds"));
  if (!currentBreed) {
  } else {
    if (!favoriteBreeds) {
      favoriteBreeds = [currentBreed];
    } else if (!favoriteBreeds.includes(currentBreed)) {
      favoriteBreeds.push(currentBreed);
    } else {
    }
    localStorage.setItem("favoriteBreeds", JSON.stringify(favoriteBreeds));
    loadFavoritesList();
  }
});

// Hides main app page and loads welcome page on site load
function welcome() {
  welcomePage.show();
  catPage.hide();
}

// Adds event listener to "start" button on welcome page to proceed to main application
$(welcomeButton).on("click", function () {
  catPage.show();
  welcomePage.hide();
});

welcome();
loadFavoritesList();
getCatPic();
getCatFact();
