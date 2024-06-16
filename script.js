document.getElementById('search-icon').addEventListener('click', function() {
    var searchBar = document.getElementById('search-input');
    if (searchBar.style.display === 'none' || searchBar.style.display === '') {
        searchBar.style.display = 'block';
        searchBar.focus();
    } else {
        searchBar.style.display = 'none';
    }
}); 

document.getElementById('search-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {    
        event.preventDefault(); // Mencegah form dari submit    
        var query = event.target.value;
        searchRecipes(query);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchIcon = document.getElementById('search-icon');
    let recipes = [];

    // Load recipes from data.json
    fetch('/data.json')
        .then(response => response.json())
        .then(data => {
            recipes = data;
        })
        .catch(error => console.error('Error loading recipes:', error));

    // Function to search recipes
    function searchRecipes(query) {
        const results = recipes.filter(recipe => 
            recipe.name.toLowerCase().includes(query.toLowerCase())
        );
        displayResults(results);
    }

    // Function to display search results
    function displayResults(results) {
        const resultsContainer = document.getElementById('search-results');
        resultsContainer.innerHTML = '';
        results.forEach(recipe => {
            const recipeCard = document.createElement('a');
            recipeCard.href = recipe.link;
            recipeCard.className = 'recipe-card';
            recipeCard.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.name}">
                <h3>${recipe.name}</h3>
                <p>${recipe.description}</p>
            `;
            resultsContainer.appendChild(recipeCard);
        });
    }

    // Event listener for search input
    searchInput.addEventListener('input', () => {
        const query = searchInput.value;
        if (query) {
            searchRecipes(query);
        } else {
            displayResults([]);
        }
    });

    // Event listener for search icon click
    searchIcon.addEventListener('click', () => {
        const query = searchInput.value;
        if (query) {
            searchRecipes(query);
        }
    });


    // Fungsi untuk menampilkan hasil pencarian
    function displaySearchResults(results) {
        const searchResultsList = document.getElementById('search-results-list');
        searchResultsList.innerHTML = ''; // Kosongkan daftar hasil pencarian

        results.forEach(result => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = result.link;
            link.innerHTML = `<strong>${result.title}</strong><br>${result.description}`;
            listItem.appendChild(link);
            searchResultsList.appendChild(listItem);
        });
    }

    // Panggil fungsi ini dengan data hasil pencarian
    displaySearchResults(searchResults);
});
