// http://forkify-api.herokuapp.com/
import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements, renderLoader, clearLoader} from './views/base';

/*
 Global state of the app
 Search object
 Current recipe object
 Shopping list object
 liked recipes
*/
const state = {};

const controlSearch = async () => {
  // 1)Get the query from view
  const query = searchView.getInput();

  if(query) {
    // 2) New search object and add it to state
    state.search = new Search(query);

    // 3) Prepare UI 
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);


    //4) Search for recipes
    await state.search.getResults();
    
    // 5) Render result on UI
    clearLoader();
    searchView.renderResults(state.search.result);
  }
}

elements.searchForm.addEventListener('submit', e => {
  controlSearch();
  e.preventDefault();
});

const search = new Search('pizza');
search.getResults();

elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if(btn) {
    const goToPage =parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});
