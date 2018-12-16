import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

// GLOBAL STATE OF APP   - ONE PLACE ACCESSIBLE FROM ALL SCOPES...  ALL THESE DATA WILL BE STORED AT ALL TIME TO ONE CENTRAL VARIABLE WHICH WE CAN ACCESS THROUGHOUT CONTROLLER
// -search object
// -current recipe object
// -shopping list objects
// -liked recipes
const state = {};






///////SEARCH CONTROLLER FUNCTIONALITY
const controlSearch = async () => {
    // 1. Get query from view
    const query = searchView.getInput();        //We store the value of the search recipe 

    if (query) {
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for results(clear from previous or loading spinner)
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4. Search for recipes
            await state.search.getResults();

            // 5. Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (error) {
            alert('Something wrong with the search...');
            clearLoader();
        }
        
    }
}

//search button event handler
elements.searchForm.addEventListener('submit', event => { //(event, callback)
    event.preventDefault();                  //for default reloading page from button
    controlSearch();                        //all the rest we want
});

//event handler for buttons -           // event delegation(event to parent element) because the buttons are not there when the page is loaded
elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);              //convert from string to number parseInt
        searchView.clearResults();          
        searchView.renderResults(state.search.result, goToPage);
    }
});


///////////////RECIPE CONTROLLER
const controlRecipe = async () => {

    // 1. We get this hash and replace the # with nothing to take the number
    const id = window.location.hash.replace('#', '');            
    console.log(id);
    
    if (id) {

        // 2. Prepare UI for changes


        // 3. Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // 4. Get recipe data
            await state.recipe.getRecipe();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // 5. Render recipe
            console.log(state.recipe);
        } catch (error) {
            alert('Error processing recipe!');
        }
        

    }
};

//hashchange helps us understand when the hash changed in the URL
////window.addEventListener('hashchange', controlRecipe);

//fires whenever the page is loaded
////window.addEventListener('load', controlRecipe);

//we saved the string two event types and then looped over them and call listener
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));