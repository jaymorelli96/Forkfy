import * as model from './model';
import recipeView from './views/recipeView'
import SearchView from './views/searchView'
import ResultsView from './views/resultsView'
import PaginationView from './views/paginationView'

import 'core-js/stable';
import 'regenerator-runtime/runtime'
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';

if(module.hot) 
{
  module.hot.accept();
}


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
//Display recipe.
const controlRecipe = async function () {

  //Try to fetch the API
  try {
    const id = window.location.hash.slice(1);

    if(!id) return;

    //Render spinner
    recipeView.renderSpinner();

    //// Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    
    //// (1) Load Recipe
    await model.loadRecipe(id);
    
    //// (2) Render Recipe
    recipeView.render(model.state.recipe);

  } catch (err) {
    recipeView.renderError();
  }
}

const controlSearchResults = async function() {
  try {
    //get search query
    const query = searchView.getQuery();
    if (!query) return;

    //Render spinner
    ResultsView.renderSpinner();

    //load search results
    await model.loadSearchResults(query);

    //render results
    // resultsView.render(model.state.search.results)
    resultsView.render(model.getSearchResultsPage());
    
    //render initial pagination buttons
    paginationView.render(model.state.search);

  } catch(err) {
    
  }
}

const controlPagination = function(page)  {
  resultsView.render(model.getSearchResultsPage(page));
  paginationView.render(model.state.search);
}

const controlServings = function(newServings) {
  //update recipe servings
  model.updateServings(newServings);

  //update recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);

}

const controlAddBookmark = function()
{
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else if(model.state.recipe.bookmarked) model.deleteBookmark(model.state.recipe.id);
  console.log(model.state.recipe.bookmarked);
  recipeView.update(model.state.recipe);
}


//publish-subscriber pattern
const init = function () {
  recipeView.addHandlerRender(controlRecipe); 
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
}

init();
