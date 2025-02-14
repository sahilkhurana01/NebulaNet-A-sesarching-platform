const searchForm = document.getElementById("searchf")
const searchInput = document.getElementById("input")
const searchResults = document.getElementById("results")


//Theme toggler

const themeToggler = document.getElementById("theme")
const body = document.body


async function searchNebulanet(query){


    const encodedQuery = encodeURIComponent(query)
    const endpoint = 'https://en.wikipedia.org/w/api.php${encodedQuery}';

    const response = await fetch(endpoint)

    if(!response.ok){
        throw new Error("Failed to fetch search results from nebulaNet.")
    }

    const json = await response.json();
    return json;
}

function displayResults(results){
    //Remove the loading spinner
    searchResults.innerHTML = ''

    results.forEach((result){
        const url = `https://en.wikipedia.org/?curid=${results.pageid}`

        const titleLink = '<a href="${url}" target="_blank" rel="noopener"> ${result.title}</a>'
        const urlLink = '<a href="${url}"  class="result-link" target = "_blank" rel="noopener">${url}</a>'

        const resulTime=document.createElement('div')
        resulTime.className='result-item'
        resulTime.innerHTML =`
        <h3 class="result-title">${titleLink}</h3>
        ${urlLink}
        <p class="result-snippet">${result.snippet}</p>
        `;

        searchResults.appendChild(resulTime);

    })
}


searchForm.addEventListener('submit' , async(e) =>{
    e.preventDefault()

    const query = searchInput.value.trim()
    if(!query){
        searchResults.innerHTML = "<p>Please enter a valid search term.</p>";
        return;
    }

    searchResults.innerHTML = "<div class='spinner'>Loading....</div>"
})