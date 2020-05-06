// http://forkify-api.herokuapp.com/
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import {elements, renderLoader, clearLoader} from './views/base';

/*
 Global state of the app
 Search object
 Current recipe object
 Shopping list object
 liked recipes
*/
const state = {};


/* Search Controller */
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

    try {
      //4) Search for recipes
      await state.search.getResults();
      
      // 5) Render result on UI
      clearLoader();
      searchView.renderResults(state.search.result);
      
    } catch(err) {
      alert(err)
      clearLoader();
    }
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


/* Recipe Controller */
const controlRecipe = async () => {
  // get id from url
  const id = window.location.hash.replace('#', '');
  console.log(id);

  if(id) {
    // prepare the UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    // Highlight the selected item
    if(state.search) searchView.highLightSelected(id);

    // create new recipe object
    state.recipe = new Recipe(id);

    try {
      // get recipe data
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
  
      // calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();
  
      // render the recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe);
    } catch(err) {
      alert(err);
    }
  }
}

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// Handlig recipe button clicks
elements.recipe.addEventListener('click', e => {
  if(e.target.matches('.btn-decrease, .btn-decrease *')) {
    // decrease clicked
    if(state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateServingsIngredients(state.recipe);
    }

  } else if(e.target.matches('.btn-increase, .btn-increase * ')) {
    // increase clicked
    state.recipe.updateServings('inc');
    recipeView.updateServingsIngredients(state.recipe);
  }

  console.log(state.recipe);
});
