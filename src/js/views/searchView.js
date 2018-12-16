import { elements } from './base';

//We take the value of the search recipe 
export const getInput = () => elements.searchInput.value;    

//clear input-search for next search
export const clearInput = () => {
    elements.searchInput.value = ''
};

//clear results and buttons(HTML THAT GENERATED at renderRecipe) for next results from search
export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}

//overflow titles display dots if bigger than one line 
/*
e.g "Pasta with tomato and spinach"

acc: 0  --> acc + cur.length = 5 --> newTitle = ['Pasta']                          PUSH TO TITLE ARRAY
acc: 5  --> acc + cur.length = 9 --> newTitle = ['Pasta', 'with']                  PUSH TO TITLE ARRAY
acc: 9  --> acc + cur.length = 15 --> newTitle = ['Pasta', 'with', 'tomato']       PUSH TO TITLE ARRAY
acc: 15 --> acc + cur.length = 18 --> newTitle = ['Pasta', 'with', 'tomato']       NOT PUSH TO TITLE ARRAY
acc: 18 --> acc + cur.length = 24 --> newTitle = ['Pasta', 'with', 'tomato']       NOT PUSH TO TITLE ARRAY
*/
const limitRecipeTitle = (title, limit = 17) => {           //(title, limit of characters)
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {         //(accumulator, current title)
            if (acc + cur.length <= limit) {            //We separate the string by spaces and with reduce method
                newTitle.push(cur);                      
            }                                              
            return acc + cur.length;                       
        }, 0);  
         
        //return the result       
        return `${newTitle.join(' ')} ...`;                    
    }                                                      
    return title;                                          
}                                                          
                                                          
                                            

//It will recieve only one recipe-without export, we just need them inside  (private)
const renderRecipe = recipe => {
    const markup = 
    `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);          //define position where we want to add new element
};

//:type 'prev' or 'next'
const createButton = (page, type) => 
    `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>    
`;

//render pagination buttons
const renderButtons = (page, numResults, resPerPage) => {
    const pages =Math.ceil(numResults / resPerPage);   //math.ceil rounded to top 4.5 = 5
    
    let button;
    if (page === 1 && pages > 1) {
        //only button next page
        button = createButton(page, 'next');
    } else if (page < pages) {
        //both buttons
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {
        //only button previous page
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);

};

//We take the recipes and display them and later the page and resultsperpage -->pagination!!
export const renderResults = (recipes, page = 1, resPerPage = 10) => {      
    // render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;                                             //slice end dont included so end = 9
    recipes.slice(start, end).forEach(renderRecipe);

    //render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
};