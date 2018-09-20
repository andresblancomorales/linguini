import React from 'react';
import FormComponent from '../layout/formComponent';
import FormField from "../../misc/formField";
import * as _ from '../../../utils/utilities';

const StepForm = {
  step: {
    validate: (value) => {
      return Promise.resolve(value.length > 5)
    }
  }
};

export default class NewStep extends FormComponent {
  constructor(props) {
    super(props, StepForm);
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
    let hasError = !this.state.form.step.isDirty || !this.state.form.step.isDirty;

    return (
      <div className='stepForm'>
        <FormField placeholder='Preparation Step'
                   multiline={true}
                   className='preparationStep'
                   value={this.state.form.step.value}
                   onChange={this.onFieldChange.bind(this, 'step')}/>
        <button onClick={this.handleFormSubmit.bind(this)}
                className='stepSubmit'
                disabled={hasError}>Next Step</button>
      </div>
    )
  }
}