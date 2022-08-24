 HEAD


// global variables 
var apiKey = '441347-MonthlyM-17PWWN2S';

// get media and content from TasteDive API
function getMedia(userSearch) {
  // TODO:: Uncomment when using userSearch 
  //  userSearch = userSearch.toLowerCase();
  var apiUrl = "https://tastedive.com/api/similar?info=1&q=Thor: Ragnarok&k=" + apiKey;

  // replace ^^^^^ above APIurl with one below to in coporate the userSearch
  // var apiUrl = "https://tastedive.com/api/similar?info=1&q=" + userSearch + "&k=" + apiKey;
    
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
 aac14c32de364062306b80d368a03d0d2867a216
