import './css/styles.css';
import Notiflix from 'notiflix';
import cardTemplates from "./templates/card.hbs";
const axios = require('axios').default;

  

const BASE_URL = "https://pixabay.com/api/";
const KEY = "27654686-05934a78c08f4d5934ea79694"
let name = "";
let page = 1;

const refs = {
  form: document.querySelector(".search-form"),
  loadMoreBtn: document.querySelector(".load-more"),
  galleryContainer: document.querySelector(".gallery"),
 }

refs.form.addEventListener("submit", onSearch);
refs.loadMoreBtn.addEventListener("click", onLoadMore);

hideButton();

function onSearch(evn) {
  evn.preventDefault();
  clearCardContainer();
  resetPage();
  name = evn.currentTarget.elements.searchQuery.value;
  if (name.trim() === "") {
    return  Notiflix.Notify.failure('Please entrer search query');
  }
  
  console.log("page: ", page);
   
  searchRequest().then(appendCardMarkup);
  incrementPage();
  
}

async function searchRequest() {
   try {
     const response = await axios.get(`${BASE_URL}?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
     const selectedData = response.data.hits
      if (selectedData.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return;
    }
     showButton();
     Notiflix.Notify.info(`Hooray! We found ${response.data.totalHits} images.`);
    return selectedData
   } catch (error) {
  }
 }


function onLoadMore() {
  findMore().then(appendCardMarkup)
}

async function findMore() {
     try {
     const response = await axios.get(`${BASE_URL}?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
       const selectedData = response.data.hits
       console.log("page: ", page);
       
       incrementPage()
       Notiflix.Notify.info(`Hooray! We found ${response.data.totalHits} images.`);
       
    return selectedData
     } catch (error) {
       console.log("error: ", error)
       hideButton();
       Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
  }

}


function resetPage() {
  page = 1;
}

function incrementPage() {
   page += 1;
}

function appendCardMarkup(elem) {
refs.galleryContainer.insertAdjacentHTML("beforeend", cardTemplates(elem))
}

function clearCardContainer() {
 refs.galleryContainer.innerHTML = "" 
}

function hideButton() {
  refs.loadMoreBtn.classList.add("is-hidden")
}

function showButton() {
  refs.loadMoreBtn.classList.remove("is-hidden")
}

