const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=5be9d69fc3c6f6dce604fadd5dfc8391&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=5be9d69fc3c6f6dce604fadd5dfc8391&query="'

const form = document.getElementById('form')
const search = document.getElementById('search')

// get initial movies
getMovies(API_URL)

// to make a request
async function getMovies(url){
    const response = await fetch(url)
    const data = await response.json()

    console.log(data.results)
}

form.addEventListener('submit', (e) => {
    // so that it doesn't submit to actual page
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== ''){
        getMovies(SEARCH_API + searchTerm)

        // CLEAR SEARCH VALUE
        search.value = ''
    }else{
        window.location.reload()
    }

})