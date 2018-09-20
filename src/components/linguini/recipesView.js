import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import * as _ from '../../utils/utilities'
import PropTypes from 'prop-types';
import Spinner from './layout/spinner';

const instanceProvider = _.getLinguiniInstanceProvider();
const recipeActions = instanceProvider.recipeActions;

const mapStateToProps = state => {
  return {
    recipes: state.recipes.all,
    isOnline: state.session.isOnline
  };
};

const mapActionsToProps = dispatch => {
  return {
    actions: bindActionCreators(recipeActions.creators, dispatch)
  };
};

const RecipesSpinner = _.reduxConnect(Spinner, state => {return { isLoading: state.recipes.loading }});

export class RecipesView extends Component {

  componentWillMount() {
    this.props.actions.getRecipes();
    this.content = React.createRef();
  }

  onScroll(e) {
    if ((e.currentTarget.scrollTop + this.content.current.offsetHeight) === this.content.current.scrollHeight) {
      this.props.actions.getRecipes(this.props.recipes[this.props.recipes.length - 1]._id);
    }
  }

  render() {
    return (
      <div className='recipes' ref={this.content} onScroll={this.onScroll.bind(this)}>
        {this.props.recipes.map(recipe => {
          return (
            <div key={recipe._id} className='recipeCard'>
              <input name={`cardSelector_${recipe._id}`} id={`imgCheck_${recipe._id}`} type='radio'
                     defaultChecked={true}/>
              <input name={`cardSelector_${recipe._id}`} id={`ingredientsCheck_${recipe._id}`} type='radio'/>
              <input name={`cardSelector_${recipe._id}`} id={`stepsCheck_${recipe._id}`} type='radio'/>
              <label htmlFor={`imgCheck_${recipe._id}`} className='imageCard'>
                <div className='recipeImage'>
                  <div className='cardTitle'>{recipe.name}</div>
                  <img
                    src={_.isDefined(recipe.pictureUrl) ? recipe.pictureUrl : require('../../assets/images/default.jpg')}/>
                </div>
              </label>
              <label htmlFor={`ingredientsCheck_${recipe._id}`} className='ingredientsCard'>
                <div className='cardTitle'>Ingredients</div>
                <div className='ingredients'>
                  <ol>
                    {recipe.ingredients.map(ingredient => {
                    return (
                      <li>
                        <span>{ingredient.name} - </span>
                        <span>{ingredient.amount}</span>
                      </li>
                    )
                  })}</ol>
                </div>
              </label>
              <label htmlFor={`stepsCheck_${recipe._id}`} className='preparation_steps'>
                <div className='cardTitle'>Steps</div>
                <div className='preparation'>
                  <ol>
                  {recipe.preparation.map(step => {
                    return (
                      <li className='step'>{step}</li>
                    )
                  })}
                  </ol>
                </div>
              </label>
            </div>
          )
        })}
        <RecipesSpinner/>
        {!this.props.isOnline ? null :
          <a href='#/new' className='actionButton'>
            <span className="fa fa-utensils"></span>
          </a>
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapActionsToProps)(RecipesView);
