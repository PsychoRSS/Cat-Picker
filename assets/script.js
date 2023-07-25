const favoritesList = $("#favoritesList");
const petImage = $("#petImage");
const generateButton = $("#generateButton");
const breedText = $("#currentBreedText");
const favoriteButton = $("#favoriteButton");
const factText = $("#funFactText");
const testUrl = "https://cataas.com/cat?json=true";

$(generateButton).on("click", () => {
  fetch(testUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
});

$(favoriteButton).on("click", () => {
  let currentBreed = $(breedText).val();
  let favoriteBreeds = localStorage.getItem("favoriteBreeds");

  if (favoriteBreeds == false) {
    favoriteBreeds = [currentBreed];
  } else {
    favoriteBreeds.push(currentBreed);
  }
  console.log(favoriteBreeds);
});

function getCatFact() {
  var requestUrl = "https://meowfacts.herokuapp.com/";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (let o = 0; o < data.length; o++) {}
    });
}

function getCatPic() {
  var requestUrl =
    "https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1&api_key=live_lkUcIGhHny1aB9p7gGVkrT3tBLGtuYNCBS6j3kFRxxWdKxXWwWRoCJFwUB4YUIOO";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (let o = 0; o < data.length; o++) {}
    });
}

getCatPic();
getCatFact();
