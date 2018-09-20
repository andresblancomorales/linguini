import React, {Component} from 'react';
import * as _ from '../../../utils/utilities';

export default class FormComponent extends Component {

  constructor(props, formDefinition) {
    super(props);
    this.formDefinition = formDefinition;

    const initialState = {};
    Object.keys(this.formDefinition).forEach(field => {
      initialState[field] = {
        value: _.isDefined(this.formDefinition[field].defaultValue) ? this.formDefinition[field].defaultValue : '',
        hasError: false,
        isDirty: false
      }
    });
    this.state = {
      form: initialState
    };
    this.getFormObject = this.getFormObject.bind(this);
  }

  resetForm() {
    const resetForm = {};
    Object.keys(this.formDefinition).forEach(field => {
      resetForm[field] = {
        value: _.isDefined(this.formDefinition[field].defaultValue) ? this.formDefinition[field].defaultValue : '',
        hasError: false,
        isDirty: false
      }
    });
    this.setState({
      ...this.state,
      form: resetForm
    });
  }

  async setFormField(field, value) {
    const formField = this.formDefinition[field];

    const isValid = await formField.validate(value);
    let newState = {
      ...this.state,
      form: {
        ...this.state.form,
      }
    };
    newState.form[field] = {value: value, hasError: !isValid, isDirty: true};
    this.setState(newState);
  }

  getFormObject() {
    let formObject = {};
    Object.keys(this.formDefinition).forEach(field => {
      formObject[field] = this.state.form[field].value;
    });

    return formObject;
  }
}