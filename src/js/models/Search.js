import axios from 'axios';
import { key } from '../config';

//constructor for searches (pizza,pasta etc)
export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        //for new browsers-HTTP request
        //fetch
    
        //FAMOUS HTTP REQUEST LIBRARY AXIOS key , query, sort, page
        //for mac we may need proxy crossorigin,cors-anywhere etc to be able to allow requests from domains to other domains(CORS)
        try {
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            //console.log(this.result);
        } catch (error) {
            alert(error);
        }  
    }
}



