import React, {Component} from 'react';
import FormField from '../misc/formField';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {sessionActions} from './instanceProvider';
import * as _ from '../../utils/utilities'
import PropTypes from 'prop-types';

const mapStateToProps = state => {
  return {
    session: state.session
  };
};

const mapActionsToProps = dispatch => {
  return {
    actions: bindActionCreators(sessionActions.creators, dispatch)
  };
};

export class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  getToken() {
    this.props.actions.getToken(this.state.username, this.state.password);
  }

  onInputChange(field, value) {
    let newState = {
      ...this.state
    };
    newState[field] = value;

    this.setState(newState);
  }

  renderError() {

    if (!_.isDefined(this.props.session.error) || this.props.session.loading) {
      return (
        <div key='empty' className='error'/>
      );
    } else {
      return (
        <div className='error'>
          <p>{this.props.session.error}</p>
        </div>
      );
    }
  }

  renderProgress() {
    if (!this.props.session.loading) {
      return null;
    }

    return (
      <div className='progress'/>
    );
  }

  render() {
    return (
      <div className="main">
        <h1>Sous-chef</h1>
        <div className="login_form">
          {this.renderProgress()}
          {this.renderError()}
          <FormField placeholder='Username'
                     autoComplete='username'
                     disabled={this.props.session.loading}
                     onChange={this.onInputChange.bind(this, 'username')}/>
          <FormField type='password'
                     placeholder='Password'
                     disabled={this.props.session.loading}
                     onChange={this.onInputChange.bind(this, 'password')}/>
          <div className="form_field">
            <button onClick={this.getToken.bind(this)}
                    disabled={this.props.session.loading}>Let's cook!</button>
            <a href="#">Forgot your password?</a>
          </div>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  session: PropTypes.shape({
    error: PropTypes.string
  }).isRequired,
  actions: PropTypes.shape({
    getToken: PropTypes.func.isRequired
  }).isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(LoginForm);