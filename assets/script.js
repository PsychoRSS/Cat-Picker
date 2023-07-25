

function getCatPic() {
    var requestUrl = 'https://meowfacts.herokuapp.com/';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        for (let o = 0; o < data.length; o++) {

        }
   

      });
  }
 

  
function getCatFact() {
    var requestUrl = 'https://cataas.com/cat?json=true';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        for (let o = 0; o < data.length; o++) {

        }
   

      });
  } 
  
  getCatPic()
  getCatFact()