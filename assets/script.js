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

$(generateButton).on("click", () => {
  getCatPic();
  getCatFact();
});

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

function welcome() {
  welcomePage.show();
  catPage.hide();
}
$(welcomeButton).on("click", function () {
  catPage.show();
  welcomePage.hide();
});

welcome();
loadFavoritesList();
