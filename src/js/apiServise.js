import Notiflix from 'notiflix';
const axios = require('axios');

const BASE_URL = "https://pixabay.com/api/";
const KEY = "27654686-05934a78c08f4d5934ea79694"


export default class NewsApiService{
    constructor() {
        this.name = "";
        this.page = 1;
    }
       
    async searchRequest() {
      try {
          const response = await axios.get(`${BASE_URL}?key=${KEY}&q=${this.name}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`)
          const selectedData = response.data;
          this.incrementPage();

          return selectedData;
      } catch (error) {
    
         Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
          
   }
   
    }

     incrementPage() {
       this.page += 1;   
    }

    resetPage() {
        this.page = 1;
    }

    get nameVal() {
        return this.name;
    }

    set nameVal(newName) {
        this.name = newName;
    }
   
}

