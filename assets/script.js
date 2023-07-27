const favoritesList = $("#favoritesList");
const petImage = $("#petImage");
const generateButton = $("#generateButton");
const breedText = $("#currentBreedText");
const favoriteButton = $("#favoriteButton");
const factText = $("#funFactText");
const testUrl = "https://cataas.com/cat?json=true";
const welcomeButton = $("#welcomeButton");
const welcomePage = $("#welcomePage");
const catPage = $("#catPage");
let currentBreed;

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

  if (!favoriteBreeds) {
    favoriteBreeds = [currentBreed];
  } else {
    favoriteBreeds.push(currentBreed);
  }
  localStorage.setItem("favoriteBreeds", JSON.stringify(favoriteBreeds));
});

$(welcomeButton).on("click", () => {
  welcomePage.hide();
  catPage.show();
});
