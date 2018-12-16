import axios from 'axios';
import { key } from '../config';

//constructor for recipes INFO from ID
export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            //AJAX CALL AGAIN
            const res = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch (error) {
            alert('Something went wrong :(');
        }

    }
    
    ///////////////////METHODS

    //PREPARATION TIME
    calcTime() {
        //assuming that we need 15 min for each 3 ingredients
        const numIng = this.ingredients.lenght;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    //CALCULATE SERVINGS
    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounce', 'ounces', 'teaspoon', 'teaspoons', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

        const newIngredients = this.ingredients.map(el => {
            // 1. Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            // 2. Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, '');

            //3. Parse ingredients into count, unit and ingredient

            return ingredient;
        });
        this.ingredients = newIngredients;
    }

}