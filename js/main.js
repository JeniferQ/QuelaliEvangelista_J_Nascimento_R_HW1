(() => {
    const charList = document.querySelector('#char-list'),
    charBanner = document.querySelector('.char-banner'),
    charDetails = document.querySelector('#char-details'),
    movieTemplate = document.querySelector('.movie-template'),
    movieList = document.querySelector('#movie-list'),
    container = document.querySelectorAll('.container'),
    baseURL = 'https://swapi.dev/api/';

    gsap.registerPlugin(ScrollTrigger);

    container.forEach(container => {
        gsap.fromTo(container, {opacity: 0, y: 40},
            {opacity: 1, y: 0, duration: 1, ease: 'power.out',
                scrollTrigger: {trigger: container, start: 'top center'}
            });
    });

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

                gsap.fromTo('.character', {opacity: 0, y: 20},
                    {opacity: 1, y: 0, duration: .3, stagger: .3, ease: 'sine.out',
                        scrollTrigger: {trigger: charList, start: 'top center'}
                });
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
            
        gsap.fromTo(charDetails, {opacity: 0, y: 90},
            {opacity: 1, y: 0, duration: 1, ease: 'power.out',
                scrollTrigger: {trigger: charDetails, start: 'top center'}
        });

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
                let posterNoSpaces = movieTitle.replace(/\s+/g, '_');

                const moviePoster = clone.querySelector('.movie-img');
                moviePoster.src = `images/${posterNoSpaces}.jpg`;

                const movieName = clone.querySelector('.movie-name');
                movieName.textContent = response.title;
        
                const movieCrawl = clone.querySelector('.movie-release');
                movieCrawl.textContent = response.opening_crawl;
        
                movieList.appendChild(clone);

                gsap.fromTo('.movie', {opacity: 0, y: 15},
                    {opacity: 1, y: 0, duration: .5, stagger: .5, ease: 'sine.out',
                        scrollTrigger: {trigger: movieList, start: 'top center'}
                });
            })
            .catch(function(error) {
                movieList.innerHTML = "<p>This character does not participate in a movie.</p>";
                console.log(error);
            });
        });
    }
    
    getCharacters();

})();