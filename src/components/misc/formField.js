import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as _ from '../../utils/utilities';

const INPUT_TIMEOUT = 300;

export default class FormField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      value: this.props.value
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value &&
      this.props.value !== this.state.value) {
      this.setState({
        ...this.state,
        value: _.isDefined(this.props.value) ? this.props.value : ''
      });
    }
  }

  handleChange(event) {
    if (_.isDefined(this.inputTimeout)) {
      clearTimeout(this.inputTimeout);
      delete this.inputTimeout;
    }

    let value = event.target.value;
    this.setState({
      ...this.state,
      value: value
    });

    if (_.isFunction(this.props.onChange)) {
      let triggerOnChange = newValue => {
        this.props.onChange(newValue);
      };

      this.inputTimeout = setTimeout(triggerOnChange.bind(this, value), INPUT_TIMEOUT);
    }
  }

  render() {
    if (this.props.multiline) {
      return (
        <div className={`form_field ${_.isDefined(this.props.className) ? this.props.className : ''}`}>
          <div data-placeholder={this.props.placeholder}/>
          <textarea placeholder={this.props.placeholder}
                    disabled={this.props.disabled}
                    onChange={this.handleChange.bind(this)}
                    value={this.state.value}/>
          <div className="underline" data-placeholder={this.props.placeholder}/>
        </div>
      )
    } else {
      return (
        <div className={`form_field ${_.isDefined(this.props.className) ? this.props.className : ''}`}>
          <input type={this.props.type}
                 placeholder={this.props.placeholder}
                 autoComplete={this.props.autoComplete}
                 disabled={this.props.disabled}
                 onChange={this.handleChange.bind(this)}
                 value={this.state.value}/>
          <div className="underline" data-placeholder={this.props.placeholder}/>
        </div>
      )
    }
  }
}

FormField.propTypes = {
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func
};