import * as model from './model';
import recipeView from './views/recipeView'

import 'core-js/stable';
import 'regenerator-runtime/runtime'

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
//Display recipe.
const controllRecipe = async function () {

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
    

  } catch (e) {
    alert(e)
  }
}


let eventsArr = ['load', 'hashchange'];

eventsArr.forEach(ev => window.addEventListener(ev, controllRecipe));

// ['hashchange', 'load'].forEach(element => {
//   window.addEventListener(element, showRecipe);
//   console.log('oi');
// });

