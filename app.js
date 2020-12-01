const apiUrl = 'https://restcountries.eu/rest/v2'


const gridCountry = document.querySelector('.grid-countries');
const loadMore = document.getElementById('load-more');

const maxItems = 8;

// Show Items 
const showItems = (countries) => {
    gridCountry.innerHTML = "";

    countries.forEach((country, index) => {

        const itemCountry = document.createElement('div');
        itemCountry.classList.add('country');

        if (index < maxItems) {
            itemCountry.classList.add("show");
        }

        itemCountry.innerHTML = `
                <div class="flag">
                    <img src="${country.flag}" />
                </div>
                <div class="info">
                    <h2>${country.name}</h2>
                    <ul>
                        <li>Populations: <span>${country.population.toFixed(2)}</span></li>
                        <li>Region: <span>${country.region}</span></li>
                        <li>Capital: <span>${country.capital}</span></li>
                    </ul>
                </div>
            `
        gridCountry.append(itemCountry);

    })
}

// Fetch Data
const fetchAll = async () => {
    const countries = await fetch(`${apiUrl}/all`).then(response => response.json());
    showItems(countries);
}

fetchAll();

//Load More
loadMore.addEventListener('click', () => {
    var allItems = document.querySelectorAll(".grid-countries .country:not(.show)");
    allItems.forEach((element, index) => {
        if (index < 4) {
            element.classList.add("show");
        }
    })
})

const search = document.querySelector("#search");

//Search
const searchCountries = async (query) => {
    const countries = await fetch(`https://restcountries.eu/rest/v2/name/${query}`).then(response => response.json());
    loadMore.style.display = "none";
    return countries;
}

search.addEventListener('keyup', async () => {
    const value = search.value;
    const results = await searchCountries(value);
    showItems(results);
})


// Search Region
const region = document.getElementById("selectRegion");

const regionsCountries = async (query) => {
    const countries = await fetch(`https://restcountries.eu/rest/v2/region/${query}`).then(response => response.json());
    loadMore.style.display = "none";
    return countries;
}

region.addEventListener('change', async () => {
    const value = region.value;
    const results = await regionsCountries(value);
    showItems(results);
})