import * as model from './model';
import recipeView from './views/recipeView'
import SearchView from './views/searchView'
import ResultsView from './views/resultsView'

import 'core-js/stable';
import 'regenerator-runtime/runtime'
import searchView from './views/searchView';
import resultsView from './views/resultsView';

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
    // ResultsView.renderSpinner();

    //load search results
    await model.loadSearchResults(query);

    //render results
    // resultsView.render(model.state.search.results)
    resultsView.render(model.getSearchResultsPage());
  } catch(err) {

  }
}
controlSearchResults();

//publish-subscriber pattern
const init = function () {
  recipeView.addHandlerRender(controlRecipe); 
  searchView.addHandlerSearch(controlSearchResults);
}

init();
