import React from 'react';
import FormComponent from '../layout/formComponent';
import FormField from '../../misc/formField';
import * as _ from '../../../utils/utilities';
import {IngredientForm} from '../../../forms/ingredientForm';

export default class NewIngredient extends FormComponent {
  constructor(props) {
    super(props, IngredientForm);
  }

  onFieldChange(field, value) {
    this.setFormField(field, value);
  }

  handleFormSubmit() {
    if (_.isFunction(this.props.onSubmit)) {
      this.props.onSubmit(this.getFormObject());
    }
    this.resetForm();
  }

  render() {
    let hasError = !this.state.form.name.isDirty || !this.state.form.quantity.isDirty || this.state.form.name.hasError || this.state.form.quantity.hasError;

    return (
      <div className='ingredientForm'>
        <FormField placeholder='Name'
                   className='ingredientName'
                   value={this.state.form.name.value}
                   onChange={this.onFieldChange.bind(this, 'name')}/>
        <FormField placeholder='Quantity'
                   className='ingredientQuantity'
                   value={this.state.form.quantity.value}
                   onChange={this.onFieldChange.bind(this, 'quantity')}/>
        <button onClick={this.handleFormSubmit.bind(this)}
                className='ingredientSubmit'
                disabled={hasError}>+
        </button>
      </div>
    )
  }
}