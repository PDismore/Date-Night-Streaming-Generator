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
// $(document).on("keydown", "form", function(event) { 
//   return event.key != "Enter";
// });

// get media and content from TasteDive API
function getMedia(userSearch) {
//IMDB API URL
  var apiUrl = "https://imdb-api.com/en/API/Search/k_dsgwgdpk/" + userSearch;
   
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

          var searchFalse = false;
          searchsaved.forEach(function (random) {
            var searchBar  = random.searchsaved;
              if (searchBar === userSearch)
                  searchFalse = true;
          });

          if (!searchFalse) {
            // ADD to localStorage
            searchsaved.push(
            userSearch
            );

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
  $('#cover').empty();
  // get current movie
  var movieName = userSearch.results[0].title;
  

  //get current movie's year
  var movieYear = userSearch.results[0].description;
 

  //get current movie's ID
  var movieID = userSearch.results[0].id;
  streamingContent(movieID);

  //get current movie's cover
  var movieCover = userSearch.results[0].image;

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
//Watchmode API (streaming services and links)
function streamingContent (movieID){
  let url = 'https://api.watchmode.com/v1/title/' + movieID + '/sources/?apiKey=vGUD649BOe5lJriuaPDdaEglhvqumY4fgroqSfsi';
  fetch(url, { method: 'Get' })
      .then((res) => res.json())
      .then((data) => {
          console.log(data);
          $('#streaming').empty();
          //For loop looking for arrays that have a stream type of sub
          for (let i = 0; i < data.length; i++) {
            var stream= data [i]
          // Pulls the streaming service name and URL
            if (stream.type === "sub") {
              console.log(stream.web_url,stream.name);
              var streamLink = stream.web_url;
              var streamName = stream.name;
              if (i !== data.length-1) {
                streamName += " | ";
              }
              $('<a href="'+streamLink+'">'+streamName+ '</a>').appendTo($('#streaming'));
            }
            }
      });
} 
//Previous results button
$('#prevResult').on('click', function (event) {
  event.preventDefault();
  //Pulling from local storage
  var previous = JSON.parse(localStorage.getItem('User_Search'))
  if (previous == null) {
    return null
  }
  //Applying local storage data to search bar
     var prevLength =  previous.length - 2;
       console.log(previous[prevLength]);
    getMedia(previous[prevLength]);
    streamingContent();
    });


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