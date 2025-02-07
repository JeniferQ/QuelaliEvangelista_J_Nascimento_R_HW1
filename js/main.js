(() => {
    const charList = document.querySelector('#char-list'),
    charBanner = document.querySelector('.char-banner'),
    charDetails = document.querySelector('#char-details'),
    movieTemplate = document.querySelector('.movie-template'),
    movieList= document.querySelector('#movie-list'),
    baseURL = 'https://swapi.dev/api/';

function getCharacters() {
    fetch(`${baseURL}people`)
    .then(response => response.json())
    .then(function(response) {
        const charLoader = document.querySelector('#loader1');
        charLoader.classList.add("hidden");
        const characters = response.results;

        characters.forEach(character => {
            const charItem = document.createElement('li');
            charItem.classList.add('character');

            const charLink = document.createElement('a');
            charLink.href = '#char-details';
            charLink.dataset.films = character.films;
            charLink.dataset.name = character.name;

            const charName = character.name;
            let nameRemoveSpaces = charName.replace(/\s+/g, '_');

            const charImg = document.createElement('img');
            charImg.src = `images/${nameRemoveSpaces}.jpg`;

            const charTitle = document.createElement('p');
            charTitle.textContent = character.name;

            charLink.appendChild(charImg);
            charItem.append(charLink, charTitle);
            charList.appendChild(charItem);
        });
    })
    .then(function() {
        const links = document.querySelectorAll('.character a');
        links.forEach(function(link) {
            link.addEventListener('click', getInfo);
        })
    })
    .catch(function(error) {
        charList.innerHTML = "<p>This character couldn't be loaded.</p>";
        console.log(error);
    })
}


function getInfo(e) {
    const charName = document.querySelector('.char-name');
    const selected = e.currentTarget.dataset.name;

    let nameNoSpaces = selected.replace(/\s+/g, '_');
    charName.textContent = selected;

    charBanner.style.backgroundImage = `url(../images/${nameNoSpaces}_banner.jpg)`;

    const movies = e.currentTarget.dataset.films.split(',');
    charDetails.style.display = 'grid';

    const movieLoader = document.querySelector('#loader2');
    movieLoader.classList.remove("hidden");
    movieList.innerHTML = '';

    movies.forEach(movie => {
        fetch(movie)
        .then(response => response.json())
        .then(function(response) {
            const clone = movieTemplate.content.cloneNode(true);
            movieLoader.classList.add("hidden");
            
            const movieTitle = response.title;
            let bannerNoSpaces = movieTitle.replace(/\s+/g, '_');

            const moviePoster = clone.querySelector('.movie-img');
            moviePoster.src = `images/${bannerNoSpaces}.jpg`;

            const movieName = clone.querySelector('.movie-name');
            movieName.textContent = response.title;
    
            const movieCrawl = clone.querySelector('.movie-release');
            movieCrawl.textContent = response.opening_crawl;
    
            movieList.appendChild(clone);
        })
        .catch(function(error) {
            movieList.innerHTML = "<p>This character does not participate in a movie.</p>";
            console.log(error);
        });
    });
}

getCharacters();

})();