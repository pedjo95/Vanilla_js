// http://forkify-api.herokuapp.com/
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesViews';
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
      recipeView.renderRecipe(
        state.recipe,
        state.likes.isLiked(id)
        );

    } catch(err) {
      alert(err);
    }
  }
}

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


/* List Controller*/
const controlList = () => {
  // create a new list
  if(!state.list) state.list = new List();

  // add a new ingredient to the list and UI
  state.recipe.ingredients.forEach(el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  })
}

// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.itemid;

  // delete event
  if(e.target.matches('.shopping__delete, .shopping__delete *')) {
    // delete from state
    state.list.deleteItem(id);

    // delete form the UI
    listView.deleteItem(id);

    // count update
  } else if (e.target.matches('.shopping__count-value')) {
    const val = parseFloat(e.target.value, 10);
    state.list.updateCount(id, val);
  }
});

/* 
LIKE CONTROLLER 
*/
const controlLike = () => {
  if(!state.likes) state.likes = new Likes();
  const currentID = state.recipe.id;

  // user has NOT liked the recipe
  if(!state.likes.isLiked(currentID)) {
    // add like to the state
    const newLike = state.likes.addLike(
      currentID,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    );

    // toggle the like button
    likesView.toggleLikeBtn(true);

    // add like to UI list
    likesView.renderLike(newLike);

  // user has LIKED the recipe
  } else {
    // remove like from state
    state.likes.deleteLike(currentID);

    // toggle the like button
    likesView.toggleLikeBtn(false);

    // remove like from UI list
    likesView.deleteLike(currentID);
  }
  likesView.toggleLikeMenu(state.likes.getNumLikes());
};

// Restore liked recipe on page load
window.addEventListener('load', () => {
  state.likes = new Likes();

  // restore likes
  state.likes.readStorage();

  // toggle like menu button
  likesView.toggleLikeMenu(state.likes.getNumLikes());

  // render the existing likes
  state.likes.likes.forEach(like => likesView.renderLike(like));
});

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

  } else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    // add ingredients to the shopping list
    controlList();

  } else if(e.target.matches('.recipe__love, .recipe__love *')) {
    // like controller
    controlLike();
  }

});