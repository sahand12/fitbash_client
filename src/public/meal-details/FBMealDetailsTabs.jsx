// @flow
import React, {Component} from 'react';

import FBTabs from '../../components/FBTabs/FBTabs';
import FBTabPanels from '../../components/FBTabs/FBTabPanels';
import FBTabPanel from '../../components/FBTabs/FBTabPanel';
import FBTabList from '../../components/FBTabs/FBTabList';
import FBTab from '../../components/FBTabs/FBTab';
import FBNutritionTable from './FBNutritionTable';
import type {Meal} from '../../models/index';
import t from '../../i18n';
import {createTree, TreeNode} from '../../mock-data/tree';

const locale = 'fa';
const titles = ['details', 'ingredients', 'nutrition'];

class FBMealDetailsTabs extends Component<
  {meal: Meal}
> {
  
  renderDescription = () => {
    return this.props.meal.t[locale].description;
  };

  renderIngredients = () => { // @TODO: refactor the shit out of this one
    const {meal} = this.props;
    const ingredientsTree = createTree(meal.t[locale].name, meal.t[locale].ingredients);
    function walkParent(node: TreeNode, result) {
      // root node
      if (!node.hasParent()) {
        return walk(node, result, true);
      }
      else {
        if (node.parent.isLastChild()) {
          if (!node.parent.hasParent()) {
            return walk(node, result, true);
          }
          result.push(')');
          return walkParent(node.parent, result);
        }
        else {
          result.push(')، ');
          return walk(node.parent.nextSibling(), result);
        }
      }
    }
    function walk(node: TreeNode, result = [], rootVisited = false) {
      if (rootVisited) { return result; }
      if (node.depth === 0) {
        return walk(node.children[0]);
      }
      
      if (node.depth === 1) {
        result.push(<span style={{fontWeight: '800'}} key={node.id}>{node.data}</span>);
      }
      else {
        result.push(node.data);
      }
      if (node.hasChildren()) {
        result.push(' (');
        return walk(node.children[0], result);
      }
      else {
        if (node.hasNextSibling()) {
          result.push('، ');
          return walk(node.nextSibling(), result);
        }
        else {
          return walkParent(node, result);
        }
      }
    }
    return walk(ingredientsTree.root);
  };

  renderNutritionTable = () => {
    return (<FBNutritionTable nutritionFacts={this.props.meal.nutritionWithDailyValues}/>);
  };
  
  render() {
    return (
      <FBTabs className='fbMealDetailsTabs'>
        <FBTabList className='fbMealDetailsTabs--tabList'>
          {titles.map(title => (
            <FBTab
              key={title}
              activeClassName='fbMealDetailsTabs--tab-isActive'
              className='fbMealDetailsTabs--tab'
            >
              <div className='fbMealDetailsTabs--tab--text'>
                <span>{t(`mealDetails.tabs.${title}`)}</span>
              </div>
              <div className='fbMealDetailsTabs--tab--box'/>
            </FBTab>
          ))}
        </FBTabList>
        <FBTabPanels className='fbMealDetailsTabs--tabPanels'>
          <FBTabPanel>{this.renderDescription()}</FBTabPanel>
          <FBTabPanel>{this.renderIngredients()}.</FBTabPanel>
          <FBTabPanel>{this.renderNutritionTable()}</FBTabPanel>
        </FBTabPanels>
      </FBTabs>
    );
  }
}

export default FBMealDetailsTabs;
