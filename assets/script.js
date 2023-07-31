const favoritesList = $("#favoritesList");
const petImage = $("#petImage");
const generateButton = $("#generateButton");
const breedText = $("#currentBreedText");
const favoriteButton = $("#favoriteButton");
const factText = $("#funFactText");
const welcomeButton = $("#start");
const welcomePage = $("#welcomePage");
const catPage = $("#catPage");
let currentBreed;

// Renders favorite list and called whenever a favorite is added/removed
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
      deleteBtn = $("<button>");
      deleteBtn.text("Delete");
      breedLi.addClass("p-2 text-white border-t-2 border-white bg-grey");
      breedLi.text(favoriteBreeds[i]);
      breedLi.attr("data-breed", favoriteBreeds[i]);
      $(breedLi).append(deleteBtn);
      $(favoritesList).append(breedLi);

      $(deleteBtn).on("click", function (e) {
        let chosenBreed = $(e.target).parent().attr("data-breed");
        let index = favoriteBreeds.indexOf(chosenBreed);
        favoriteBreeds.splice(index, 1);
        localStorage.setItem("favoriteBreeds", JSON.stringify(favoriteBreeds));
        loadFavoritesList();
      });
    }
  }
}

// Calls Thecatapi to retrieve a random picture of a cat and defines currentBreed for future use
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

// Calls meowfacts api for a random cat fact then displays it in fact box
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

// Adds event listener to generate button to change picture and fact
$(generateButton).on("click", () => {
  getCatPic();
  getCatFact();
});

// Adds event listener from favorite button to add current shown breed to favorite list in localstorage and re-render favorites list
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

// Hides main page div until welcomeButton is clicked
function welcome() {
  welcomePage.show();
  catPage.hide();
}

$(welcomeButton).on("click", function () {
  catPage.show();
  welcomePage.hide();
});

getCatPic();
getCatFact();
welcome();
loadFavoritesList();
