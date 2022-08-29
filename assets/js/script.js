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
var apiKey2 = 'k_6di2xd71';

// get media and content from TasteDive API
function getMedia(userSearch) {
  // TODO:: Uncomment when using userSearch 
  //  userSearch = userSearch.toLowerCase();
  var apiUrl = "https://imdb-api.com/en/API/Search/k_fgf9zctq/" + userSearch;
  
  // var apiUrl = "https://imdb-api.com/en/API/Search/k_m6r8p68f/" + userSearch;
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
            searchsaved.push(
            userSearch
            );

          }
            // setItem to localStorage
             localStorage.setItem("User_Search", JSON.stringify(searchsaved));
            
            //  previousResult(searchsaved);
             return fetch(`https://imdb-api.com/en/API/Trailer/k_fgf9zctq/${data.results[0].id}`)
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
  console.log(movieName);

  //get current movie's year
  var movieYear = userSearch.results[0].description;
  console.log(movieYear);

  //get current movie's ID
  var movieID = userSearch.results[0].id;
  console.log(movieID);
  streamingContent(movieID);

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
//Watchmode API (streaming services and links)
function streamingContent (movieID){
  let url = 'https://api.watchmode.com/v1/title/' + movieID + '/sources/?apiKey=vGUD649BOe5lJriuaPDdaEglhvqumY4fgroqSfsi';
  fetch(url, { method: 'Get' })
      .then((res) => res.json())
      .then((data) => {
          console.log(data);
          $('#streaming').empty();
          for (let i = 0; i < data.length; i++) {
            var stream= data [i]
            if (stream.type === "sub") {
              console.log(stream.web_url,stream.name);
              var streamLink = stream.web_url;
              var streamName = stream.name;
              // var link =$("<a>").attr("href",streamLink);
              // $('#streaming').append(streamName);
              $('<a href="'+streamLink+'">'+streamName+'</a>').appendTo($('#streaming'));
              
            }
               
            }
      });
} 

//Previous Search Button
// $('#prevResult').on('click',function(event, userSearch){
//   event.preventDefault();
//   const previous = JSON.parse(localStorage.getItem('User_Search'))
//   var userSearch = previous
//   // if (previous==null)
//   // {return null;}
//   // console.log(previous)
//   for (let i = 0; i < previous.length; i++){
//     var prevLength = previous.length -2;
//     console.log(prevLength)
//   if (previous == null) {
//     // console.log(previous[i].userSearch);
//     return null;
//   }
//   else {
//     console.log(previous[i]);
//     // displayContent(userSearch);
//     // streamingContent();
//   }
// }
// });



$('#prevResult').on('click', function (event) {
  event.preventDefault();
  
  var previous = JSON.parse(localStorage.getItem('User_Search'))
  if (previous == null) {
    // console.log(previous);
    return null
  }
    // for (let i = 0; i < previous.length ; i++){
      
      // var prevLength = previous.slice(-1).pop();
     var prevLength =  previous.length - 2;
       console.log(previous[prevLength]);
    
    getMedia(previous[prevLength]);
    streamingContent();
        
    
      // } 
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


// previousResult();
