window.addEventListener
    ('DOMContentLoaded', () =>{
        const overlay = document.querySelector ('#overlay')
        const keysub = document.querySelector ('#key-sub')
        const modclose = document.querySelector ('#close-modal')

        keysub.addEventListener("click", function() {
            overlay.classList.remove('hidden')
            overlay.classList.add('flex')
        })
        modclose.addEventListener("click", function() {
            overlay.classList.add('hidden')
            overlay.classList.remove('flex')
        })
        
    })

    //Prevent enter key from submitting
$(document).on("keydown", "form", function(event) { 
  return event.key != "Enter";
});

// global variables 
var apiKey = 'k_m6r8p68f';

// get media and content from TasteDive API
function getMedia(userSearch) {
  // TODO:: Uncomment when using userSearch 
  //  userSearch = userSearch.toLowerCase();
  var apiUrl = "https://imdb-api.com/en/API/Search/k_m6r8p68f/" + userSearch;
  console.log(userSearch);

  // replace ^^^^^ above APIurl with one below to in coporate the userSearch
  // var apiUrl = "https://tastedive.com/api/similar?info=1&q=" + userSearch + "&k=" + apiKey;
    
    console.log(apiUrl);
   
    fetch(apiUrl)
    .then(function (response) {
      // if request was successful
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);

          displayContent(data);
          
          // SAVE to localStorage
          var searchsaved = JSON.parse(localStorage.getItem('User_Search')); // getItem from localStorage
          if (!searchsaved) {
            searchsaved = [];
          }

          // object format for user Searches 
              // var searchObj = {
              //     searchedFor: ""
              // }
          var searchFalse = false;
          searchsaved.forEach(function (random) {
            var searchBar  = random.searchsaved;
              if (searchBar === userSearch)
                  searchFalse = true;
          });

          if (!searchFalse) {
            // ADD to localStorage
            searchsaved.push({
              searchedFor: userSearch,
            });

          }
            // setItem to localStorage
             localStorage.setItem("User_Search", JSON.stringify(searchsaved));
             return fetch(`https://imdb-api.com/en/API/Trailer/k_m6r8p68f/${data.results[0].id}`)
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);
          })

      };
    });
  }


  // display main movie content for modal
function displayContent (userSearch) {
  // get current movie
  var movieName = userSearch.results[0].title;
  console.log(movieName);

  //get current movie's year
  var movieYear = userSearch.results[0].description;
  console.log(movieYear);

  //get current movie's ID
  var movieID = userSearch.results[0].id;
  console.log(movieID);

  //get current movie's cover
  var movieCover = userSearch.results[0].image;
  console.log(movieCover);

  // insert Movie Title and Year 
  $('#media-title').text(movieName + " " + movieYear);

  // create img tag for movieCover
  var imgCover = $('<img>').attr('src', movieCover);
      // imgCover class and ID
      imgCover.attr('class', "coverStyle");
      imgCover.attr('id', 'cover');
      //append Movie cover
      $('#cover').append(imgCover);
      
      
}



// Search Button click
$('#key-sub').on('click', function (event) {
    //prevent page refresh
    event.preventDefault();

    // if statement to check if string value was inputed into the search bar, if not return user searched information
    if ($('#keywords').val() === "") {
        alert("Nothing was typed in the search. Please enter a valid search!");
    } else {
        var userSearch = $('#keywords').val().trim().toLowerCase();
        console.log(userSearch);
        getMedia(userSearch);
        $('#keywords').val("");
    }
})





window.addEventListener
    ('DOMContentLoaded', () =>{
        const overlay = document.querySelector ('#overlay')
        const keysub = document.querySelector ('#key-sub')
        const modclose = document.querySelector ('#close-modal')

        keysub.addEventListener("click", function() {
            overlay.classList.remove('hidden')
            overlay.classList.add('flex')
        })
        modclose.addEventListener("click", function() {
            overlay.classList.add('hidden')
            overlay.classList.remove('flex')
        })
        

    })