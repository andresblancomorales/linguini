import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import * as _ from '../../utils/utilities'
import PropTypes from 'prop-types';

const instanceProvider = _.getLinguiniInstanceProvider();
const recipeActions = instanceProvider.recipeActions;

const mapStateToProps = state => {
  return {
    recipes: state.recipes
  };
};

const mapActionsToProps = dispatch => {
  return {
    actions: bindActionCreators(recipeActions.creators, dispatch)
  };
};

export class RecipesView extends Component {

  componentWillMount() {
    this.props.actions.getRecipes();
  }

  render() {
    return (
      <div className='recipes'>
        {this.props.recipes.all.map(recipe => {
          return (
            <div key={recipe._id} className='recipeCard'>
              <input name={`cardSelector_${recipe._id}`} id={`imgCheck_${recipe._id}`} type='radio' defaultChecked={true}/>
              <input name={`cardSelector_${recipe._id}`} id={`ingredientsCheck_${recipe._id}`} type='radio' />
              <input name={`cardSelector_${recipe._id}`} id={`stepsCheck_${recipe._id}`} type='radio'/>
              <label htmlFor={`imgCheck_${recipe._id}`} className='imageCard'>
                <label htmlFor={`imgCheck_${recipe._id}`} >
                       <img src={_.isDefined(recipe.pictureUrl) ? recipe.pictureUrl : require('../../assets/images/default.png')}/>
                </label>
              </label>
              <label htmlFor={`ingredientsCheck_${recipe._id}`} className='ingredientsCard'>
                <label htmlFor={`ingredientsCheck_${recipe._id}`}>
                  <div className='ingredients'>
                    <div className='recipeName'>{recipe.name}</div>
                    <div>{recipe.ingredients.map(ingredient => {
                      return (
                        <div>
                          <div>{ingredient.name}</div>
                          <div>{ingredient.amount}</div>
                        </div>
                      )
                    })}</div>
                  </div>
                </label>
              </label>
              <div className='preparation_steps'>
                <label htmlFor={`stepsCheck_${recipe._id}`}>
                  <div className='preparation'>
                    <div>Steps</div>
                    {recipe.preparation.map(step => {
                      return (
                        <div className='step'>{step}</div>
                      )
                    })}
                  </div>
                </label>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapActionsToProps)(RecipesView);