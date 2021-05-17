import * as model from './model';
import recipeView from './views/recipeView'

import 'core-js/stable';
import 'regenerator-runtime/runtime'


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

const init = function () {
  recipeView.addHandlerRender(controlRecipe); //publish-subscriber pattern
}

init();
