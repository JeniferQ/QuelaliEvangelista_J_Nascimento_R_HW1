(() => {
    const charList = document.querySelector('#char-list'),
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
        charList.innerHTML = "<p>This character couldn't be loaded.</p>"
        console.log(error);
    })
}

function getInfo(e) {
}

getCharacters();

})();