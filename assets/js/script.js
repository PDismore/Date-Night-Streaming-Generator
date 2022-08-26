
// global variables 
var apiKey1 = '441347-MonthlyM-17PWWN2S';
var apiKey2 = 'vGUD649BOe5lJriuaPDdaEglhvqumY4fgroqSfsi'

// // get media and content from TasteDive API
// function getMedia(userSearch) {
//   // TODO:: Uncomment when using userSearch 
//   //  userSearch = userSearch.toLowerCase();
//   var apiUrl = "https://tastedive.com/api/similar?info=1&q=Thor: Ragnarok&k=" + apiKey1;

//   // replace ^^^^^ above APIurl with one below to in coporate the userSearch
//   // var apiUrl = "https://tastedive.com/api/similar?info=1&q=" + userSearch + "&k=" + apiKey1;
    
//     console.log(apiUrl);
//     // fetch(apiUrl, {
//     //   mode: 'cors',
//     //   headers: {
//     //     'Access-Control-Allow-Origin':'*',
//     //     // 'Access-Control-Allow-Origin':' https://tastedive.com/api/similar?info=1&q=Thor:Ragnarok&k=441347-MonthlyM-17PWWN2S' ,
//     //     'Access-Control-Allow-Credentials': true    
//     //   }
//     // })
//     fetch("http://cors-anywhere.herokuapp.com/" + apiUrl)
//     .then(function (response) {
//       // if request was successful
//       if (response.ok) {
//         response.json().then(function (data) {
//           console.log(data);
          
//           // SAVE to localStorage
//           var searchsaved = JSON.parse(localStorage.getItem('User_Search')); // getItem from localStorage
//           if (!searchsaved) {
//             searchsaved = [];
//           }

//           // object format for user Searches 
//               // var searchObj = {
//               //     searchedFor: ""
//               // }
//           var searchFalse = false;
//           searchsaved.forEach(function (random) {
//             var searchBar  = random.searchsaved;
//               if (searchBar === userSearch)
//                   searchFalse = true;
//           });

//           if (!searchFalse) {
//             // ADD to localStorage
//             searchsaved.push({
//               searchedFor: userSearch,
//             });

//           }
//             // setItem to localStorage
//              localStorage.setItem("User_Search", JSON.stringify(searchsaved));
//         });
//       }
//     })
//   }

  ////WatchMode API
//Get streaming list from WatchMode


  // //Get Watchmode ID for user search NEED TO Get IMDB ID FRMO IMDB API
  // var imdbID = 'tt0285403'
  // //NEED TO UPDATE END OF URL
  // var url = 'https://api.watchmode.com/v1/title/'+imdbID+'/source_types=sub/?apiKey='+apiKey2;
  
  // fetch(url, { method: 'Get' })
  // .then((res) => res.json())
  // .then((json) => {
  //     console.log(json);
  // });

  let url = 'https://api.watchmode.com/v1/title/tt0285403/sources/?apiKey=vGUD649BOe5lJriuaPDdaEglhvqumY4fgroqSfsi';
  
  fetch(url, { method: 'Get' })
      .then((res) => res.json())
      .then((json) => {
          console.log(json);
      });
//Get streaming list using Watchmode ID
 



// // Search Button click
// $('#go-button').on('click', function (event) {
//     //prevent page refresh
//     event.preventDefault();

//     // if statement to check if string value was inputed into the search bar, if not return user searched information
//     if ($('#search-bar').val() === "") {
//         alert("Nothing was typed in the search. Please enter a valid search!");
//     } else {
//         var userSearch = $('#search-bar').val().trim().toLowerCase();
//         console.log(userSearch);
//         $('#search-bar').val("");
//     }
// })
// getMedia();



// window.addEventListener
//     ('DOMContentLoaded', () =>{
//         const overlay = document.querySelector ('#overlay')
//         const keysub = document.querySelector ('#key-sub')
//         const modclose = document.querySelector ('#close-modal')

//         keysub.addEventListener("click", function() {
//             overlay.classList.remove('hidden')
//             overlay.classList.add('flex')
//         })
//         modclose.addEventListener("click", function() {
//             overlay.classList.add('hidden')
//             overlay.classList.remove('flex')
//         })
        
//     })
