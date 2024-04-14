// Get the element with the close icon
var closeIcon = document.querySelector('.fa-x');

// Add a click event listener to the close icon
closeIcon.addEventListener('click', function() {
    // Go back in the browser's history
    history.back();
});
//-----------------

// Retrieve movie ID from the URL
 const urlParams = new URLSearchParams(window.location.search);
 const movieId = urlParams.get('id');

 // API endpoint for fetching movie details by ID
 const TMDB_API_KEY = 'api_key=96c05c6f53c2f9b20b3e42af4887dc76';
 const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
 const TMDB_MOVIE_DETAILS_URL = `https://api.themoviedb.org/3/movie/${movieId}?${TMDB_API_KEY}`;

 // Function to fetch and display movie details
 async function fetchMovieDetails() {
     try {
         const response = await fetch(TMDB_MOVIE_DETAILS_URL);
         if (!response.ok) {
             throw new Error('Failed to fetch movie details');
         }
         const movieDetails = await response.json();
         displayMovieDetails(movieDetails);
     } catch (error) {
         console.error(error);
     }
 }

 // Function to display movie details on the page
 function displayMovieDetails(movieDetails) {
     const posterPath = movieDetails.poster_path ? TMDB_IMAGE_BASE_URL + movieDetails.poster_path : 'placeholder.jpg';
     document.getElementById('movie-poster-img').src = posterPath;
     document.getElementById('movie-title').textContent = movieDetails.title;
     document.getElementById('movie-rating').textContent = movieDetails.vote_average;
     document.getElementById('movie-overview').textContent = movieDetails.overview;
    //  document.getElementById('movie-releasedate').textContent = movieDetails.release-date;
     // You can display other movie details here, such as release date, genres, etc.
 }

 // Call fetchMovieDetails when the page loads
 window.onload = function () {
     fetchMovieDetails();
 };

