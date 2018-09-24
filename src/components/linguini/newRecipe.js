import React from 'react';
import FormComponent from './layout/formComponent';
import FormField from '../misc/formField';
import Bubble from './layout/bubble';
import {isDefined} from '../../utils/utilities';
import IngredientsManagement from './recipes/ingredientsManagement';
import PreparationManagement from "./recipes/preparationManagement";
import {RecipeForm} from '../../forms/recipeForm';

export default class NewRecipe extends FormComponent {

  constructor(props) {
    super(props, RecipeForm);

    this.state = {
      ...this.state,
      step: 0
    };

    this.steps = [
      this.renderNameStep.bind(this),
      this.renderIngredientsStep.bind(this),
      this.renderPreparationStep.bind(this)
    ];
  }

  componentDidUpdate() {
    if (!isDefined(this.state.dragIndex) && !isDefined(this.state.dragOver) && isDefined(this.bubbleContainer) && this.bubbleContainer !== null) {
      if (this.bubbleContainer.scrollHeight > this.bubbleContainer.offsetHeight) {
        this.bubbleContainer.scrollTo(0, this.bubbleContainer.scrollHeight);
      }
    }
  }

  onFieldChange(field, value) {
    this.setFormField(field, value);
  }

  nextStep() {
    this.setState({
      ...this.state,
      step: this.state.step + 1
    });
  }

  previousStep() {
    this.setState({
      ...this.state,
      step: this.state.step - 1
    });
  }

  renderNameStep() {
    return (
      <div className='bubbleContainer' ref={element => this.bubbleContainer = element}>
        <Bubble direction='right'>
          <span>Ou la la chef... A new recipe! What's its name?</span>
        </Bubble>
        <Bubble direction='left'>
          <FormField placeholder='Recipe Name'
                     value={this.state.form.name.value}
                     onChange={this.onFieldChange.bind(this, 'name')}/>
        </Bubble>
        {
          this.state.form.name.hasError && this.state.form.name.isDirty ?
            <Bubble direction='right'>Aïe aïe aïe... that's an interesting name. Can I suggest picking a better
              one?</Bubble> : null
        }
        {
          !this.state.form.name.hasError && this.state.form.name.isDirty ? <Bubble direction='right'>
            <div>Magnifique! Gettin' hungry chef. Should we go through the ingredients?</div>
          </Bubble> : null
        }
        {
          !this.state.form.name.hasError && this.state.form.name.isDirty ? <Bubble direction="left">
            <a onClick={this.nextStep.bind(this)}>Of course!</a>
          </Bubble> : null
        }
      </div>
    )
  }

  onIngredientAdded(ingredient) {
    this.setFormField('ingredients', [...this.state.form.ingredients.value, ingredient]);
  }

  removeIngredient(ingredient) {
    let newIngredients = [...this.state.form.ingredients.value];
    let foundIndex = newIngredients.findIndex(i => i.name === ingredient.name && i.quantity === ingredient.quantity);
    if (foundIndex !== -1) {
      newIngredients.splice(foundIndex, 1);
    }
    this.setFormField('ingredients', newIngredients);
  }

  renderIngredientsStep() {
    return (
      <IngredientsManagement recipeName={this.state.form.name.value}
                             ingredients={this.state.form.ingredients.value}
                             onIngredientAdded={this.onIngredientAdded.bind(this)}
                             onIngredientRemoved={this.removeIngredient.bind(this)}
                             onSubmit={this.nextStep.bind(this)}
                             onCancel={this.previousStep.bind(this)}/>
    );
  }

  onStepMoved(from, to) {
    let steps = [...this.state.form.preparation.value];
    let movedStep = steps.splice(from, 1);
    let newSteps = [];
    for (let i = 0; i < this.state.form.preparation.value.length; i++) {
      if (i !== from) {
        if (i === to && from > to) {
          newSteps.push(movedStep[0]);
        }

        newSteps.push(this.state.form.preparation.value[i]);

        if (i === to && from < to) {
          newSteps.push(movedStep[0]);
        }
      }
    }

    this.setFormField('preparation', newSteps);
  }

  onStepAdded(step) {
    this.setFormField('preparation', [...this.state.form.preparation.value, step.step]);
  }

  onStepRemoved(step, index) {
    let newSteps = [...this.state.form.preparation.value];
    newSteps.splice(index, 1);
    this.setFormField('preparation', newSteps);
  }

  renderPreparationStep() {
    return (
      <PreparationManagement steps={this.state.form.preparation.value}
                             onStepAdded={this.onStepAdded.bind(this)}
                             onStepMoved={this.onStepMoved.bind(this)}
                             onStepRemoved={this.onStepRemoved.bind(this)}
                             onCancel={this.previousStep.bind(this)}/>
    );
  }

  renderStep() {
    return this.steps[this.state.step]();
  }

  render() {
    return (
      <div className='newRecipe'>
        {this.renderStep()}
      </div>
    )
  }
}