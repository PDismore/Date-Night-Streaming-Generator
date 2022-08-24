
// global variables 
var apiKey = '441347-MonthlyM-17PWWN2S';

// get media and content from TasteDive API
function getMedia(userSearch) {
    var apiUrl = "https://tastedive.com/api/similar?info=1&q=Thor: Ragnarok&k=" + apiKey;
    
    console.log(apiUrl);
    // fetch(apiUrl, {
    //   mode: 'cors',
    //   headers: {
    //     'Access-Control-Allow-Origin':'*',
    //     // 'Access-Control-Allow-Origin':' https://tastedive.com/api/similar?info=1&q=Thor:Ragnarok&k=441347-MonthlyM-17PWWN2S' ,
    //     'Access-Control-Allow-Credentials': true    
    //   }
    // })
    fetch("http://cors-anywhere.herokuapp.com/" + apiUrl)
    .then(function (response) {
      // if request was successful
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          
             
        });
      }
    })
  }




// Search Button click
$('#go-button').on('click', function (event) {
    //prevent page refresh
    event.preventDefault();

    // if statement to check if string value was inputed into the search bar, if not return user searched information
    if ($('#search-bar').val() === "") {
        alert("Nothing was typed in the search. Please enter a valid search!");
    } else {
        var userSearch = $('#search-bar').val().trim().toLowerCase();
        console.log(userSearch);
        $('#search-bar').val("");
    }
})
getMedia();


