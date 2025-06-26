import recipes from './recipes.mjs'

function getRandomNumber(num){
    return Math.floor(Math.random()* num);
}

function getRandomListEntry(list){
    const listLength = list.length;
    const randomNum = getRandomNumber(listLength);
    return list[randomNum];
}

function filterRecipes(query){
    const filteredList = recipes.filter((recipe) =>{
        return (
            recipe.name.toLowerCase().includes(query) ||
            (recipe.description.toLowerCase().includes(query)) ||
            (Array.isArray(recipe.tags) && recipe.tags.find((item) => item.toLowerCase().includes(query))) ||
            (Array.isArray(recipe.ingredients) && recipe.ingredients.find((item) => item.toLowerCase().includes(query)))
        );
    });
    
    filteredList.sort((a, b) => {
        const recipeA = a.name.toLowerCase();
        const recipeB = b.name.toLowerCase();
        return recipeA.localeCompare(recipeB)
    });

    return filteredList;
}

function recipeTemplate(recipe) {
    return `<div id="recipe-container" class="recipe-container">
                <div class="recipe-header-image">
                    <img src="${recipe.image}"
                         alt="${recipe.description}">
                </div>
                <div class="recipe-info">
                    <ul class="tags">
                        ${tagsTemplate(recipe.tags)}
                    </ul>
                    <h2>${recipe.name}</h2>
                    <span class="rating" role="img" aria-label="Rating: 4 out of 5 stars">
                        ${ratingTemplate(recipe.rating)}
                    </span>
                <p class="recipe__description">
			        ${recipe.description}
		        </p> 
                </div>             
            </div>`;
}

function tagsTemplate(tags) {
    const tagArray = tags.map((tag) => `<li>${tag}</li>`);
    const html = tagArray.join('');

    return html;
}

function ratingTemplate(rating) {
	// begin building an html string using the ratings HTML written earlier as a model.
	let html = `<span
	class="rating"
	role="img"
	aria-label="Rating: ${rating} out of 5 stars"
>`
    for (let i = 1; i<=5; i++){
        if (i <= rating) {
            html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
        }
        else {html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
        }
    }

	html += `</span>`
	// return the html string
	return html
}

function renderRecipes(recipeList) {
	const recipeWrapper = document.getElementById('recipe-detail-section');
    const recipeArray = recipeList.map((recipe) => recipeTemplate(recipe))
    const finalHtml = recipeArray.join('');
    
    if (recipeWrapper) {
        recipeWrapper.innerHTML = finalHtml;  
    }
}

function init() {
    // get a random recipe
    const recipe = getRandomListEntry(recipes);
    // render the recipe with renderRecipes.
    renderRecipes([recipe]);
}

// Function that will handle the search button click
function searchHandler(event){
    event.preventDefault();
    const searchInput = document.getElementById("recipe-search");
    const query = searchInput.value;
    const lowecaseQuery = query.toLowerCase();
    const filteredandSortedRecipes = filterRecipes(lowecaseQuery);
    renderRecipes(filteredandSortedRecipes)
}

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById("search-button");
    if (searchButton) {
        searchButton.addEventListener('click', searchHandler);
    } else{
        console.error("Search Button Not Found!")
    }
init();
});