const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=5be9d69fc3c6f6dce604fadd5dfc8391&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=5be9d69fc3c6f6dce604fadd5dfc8391&query="'

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')

// get initial movies
getMovies(API_URL)

// to make a request
async function getMovies(url){
    const response = await fetch(url)
    const data = await response.json()

    //take in movies and apply to DOM
    showMovies(data.results)
}

function showMovies (movies){
    //to clear main screen after search
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview} = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
             <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
                    <h3>Overview</h3>
                        ${overview}
                </div>
        `
        main.appendChild(movieEl)
    })
}

function getClassByRate(vote){
    if(vote >= 8){
        return 'green'
    }else if(vote >= 5){
        return 'orange'
    }else {
        return 'red'
    }
}





// function showMovies(movies){
//     //to clear main
//     main.innerHTML = ''

//     movies.forEach((movie) => {
//         const { title, poster_path, vote_average, overview } = movie

//         const movieEL = document.createElement('div')
//         movieEL.classList.add('movie')

//         movieEl.innerHTML = `            
//             <img src="${IMG_PATH + poster_path}" alt="${title}">
//             <div class="movie-info">
//                 <h3>${title}</h3>
//                 <span class="${getClassByRate(vote_average)}">${vote_average}</span>
//             </div>
//             <div class="overview">
//                <h3>Overview</h3>
//                 ${overview}
//             </div>
//         `
// // TO PUT INTO THE DOM
//         main.appendChild(movieEL)
//     })
// }

//get class by ranking
function getClassByRate(vote){
    if(vote >= 8){
        return 'green'
    }else if(vote >=5){
        return 'orange'
    }else{
        return 'red'
    }
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