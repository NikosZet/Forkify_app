//BASE REUSABLE ELEMENTS AND OTHER STAFF ACROSS OTHER MODULES

//object that contain all the elements that we selected from DOM and export them
export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    searchResPages: document.querySelector('.results__pages')
};

//object that contain all the strings (class names etc.)
export const elementStrings = {
    loader: 'loader'
}

//loading spinner
export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="/img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

//clear loader without using elements because is added later
export const clearLoader = () => {  
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};