const searchForm = document.getElementById("searchf")
const searchInput = document.getElementById("input")
const searchResults = document.getElementById("results")


//Theme toggler

const themeToggler = document.getElementById("theme")
const body = document.body


async function searchNebulanet(query){


    const encodedQuery = encodeURIComponent(query)
    const endpoint = 'https://en.wikipedia.org/w/api.php';

    const response = await fetch(endpoint)

    if(!response.ok){
        throw new Error("Failed to fetch search results from nebulaNet.")
    }

    const json = await response.json();
    return json;
}

