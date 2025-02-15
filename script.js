const searchForm = document.getElementById("searchf");
const searchInput = document.getElementById("input");
const searchResults = document.getElementById("results");

// Theme toggler
const h1ofhcon = document.getElementById("hconh1");

const themeToggler = document.getElementById("theme");
const body = document.body;

async function searchNebulanet(query) {
    const encodedQuery = encodeURIComponent(query);
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=${encodedQuery}`;

    try {
        const response = await fetch(endpoint);

        if (!response.ok) {
            throw new Error("Failed to fetch search results from NebulaNet.");
        }

        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

function displayResults(results) {
    // Clear previous results
    searchResults.innerHTML = "";

    results.forEach((result) => {
        const url = `https://en.wikipedia.org/?curid=${result.pageid}`;

        const titleLink = `<a href="${url}" target="_blank" rel="noopener"> ${result.title}</a>`;
        const urlLink = `<a href="${url}" class="result-link" target="_blank" rel="noopener">${url}</a>`;

        const resultItem = document.createElement("div");
        resultItem.className = "result-item";
        resultItem.innerHTML = `
            <h3 class="result-title">${titleLink}</h3>
            ${urlLink}
            <p class="result-snippet">${result.snippet}</p>
        `;

        searchResults.appendChild(resultItem);
    });
}

searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const query = searchInput.value.trim();
    if (!query) {
        searchResults.innerHTML = "<p>Please enter a valid search term.</p>";
        return;
    }

    searchResults.innerHTML = "<div class='spinner'>Loading....</div>";

    try {
        const results = await searchNebulanet(query);

        if (results.query.search.length === 0) {
            searchResults.innerHTML = "<p>No results found.</p>";
        } else {
            displayResults(results.query.search);
        }
    } catch (error) {
        searchResults.innerHTML = "<p>An error occurred while searching. Please try again.</p>";
    }
});




//Event listner for the theme toggler
themeToggler.addEventListener('click',() => {
h1ofhcon.style.color = "#fff";


    body.classList.toggle('dark-theme');
    if(body.classList.contains('dark-theme')){
        themeToggler.textContent = 'Dark';
        themeToggler.style.background = "#fff";
        themeToggler.style.color = "#333";
    }else{
        themeToggler.textContent = 'Light';
        themeToggler.style.border = '2px solid #ccc';
        themeToggler.style.color = '#333';
    }
});