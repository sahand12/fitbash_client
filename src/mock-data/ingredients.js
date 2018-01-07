// @flow
import {createTree} from './tree';
import ingredientsFA from './ingredientsFA';

export function translate(str) {
  return ingredientsFA[str.toLowerCase()] || str;
}

function reduceTreeToString(result: string, node: Node): string {

}

const string = 'Eggs (Eggs, Citric Acid), Spinach, Tomatoes, Bacon (Pork, Water, Salt, Sugar, Celery Powder, Natural Flavor), Parmesan Cheese (Milk, Cheese Cultures, Salt, Enzymes, Cellulose), Expeller Pressed Canola Oil.';

const mealTree = createTree('مرغ با برنج مخلوط', string);
const output = mealTree
  .map(translate)
  .reduce(reduceTreeToString, '');
