import React, {Component} from 'react';
import {isFunction} from '../../../utils/utilities';
import Bubble from '../layout/bubble';
import NewIngredient from './newIngredient';

export default class IngredientsManagement extends Component {

  componentDidUpdate() {
    if (this.bubbleContainer.scrollHeight > this.bubbleContainer.offsetHeight) {
      this.bubbleContainer.scrollTo(0, this.bubbleContainer.scrollHeight);
    }
  }

  handleIngredientRemoved(ingredient) {
    if (isFunction(this.props.onIngredientRemoved)) {
      this.props.onIngredientRemoved(ingredient);
    }
  }

  handleIngredientAdded(ingredient) {
    if (isFunction(this.props.onIngredientAdded)) {
      this.props.onIngredientAdded(ingredient);
    }
  }

  handleOnSubmit() {
    if (isFunction(this.props.onSubmit)) {
      this.props.onSubmit();
    }
  }

  render() {
    let { recipeName, ingredients} = this.props;
    return (
      <div className='bubbleContainer' ref={element => this.bubbleContainer = element}>
        <Bubble direction='right'>
          <span>Let me write down the ingredients chef... I can't wait to cook <strong>{recipeName}</strong>!</span>
        </Bubble>
        <div className='notepad ingredients_notepad'>
          {ingredients.length === 0 ? null :
            <ul>
              {
                ingredients.map(ingredient => {
                  return (
                    <li>{ingredient.name} - {ingredient.quantity}
                      <button className='deleteButton fa fa-trash'
                              onClick={this.handleIngredientRemoved.bind(this, ingredient)}/>
                    </li>
                  )
                })
              }
            </ul>
          }
        </div>
        <Bubble direction='left' className='ingredientsBubble'>
          <NewIngredient onSubmit={this.handleIngredientAdded.bind(this)}/>
          {ingredients.length === 0 ? null :
            <span>That's it, no more ingredients. <a onClick={this.handleOnSubmit.bind(this)}>Let's continue</a></span>
          }
        </Bubble>
      </div>
    )
  }
}