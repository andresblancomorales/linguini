import React, {Component} from 'react';
import FormField from '../misc/formField';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {sessionActions} from './instanceProvider';
import * as _ from '../../utils/utilities'

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

  render() {
    return (
      <div className="main">
        <h1>Sous-chef</h1>
        <div className="login_form">
          {!_.isDefined(this.props.session.error) ? <div key='empty' className="error"/> :
            <div className="error">
              <p>{this.props.session.error}</p>
            </div>
          }
          <FormField placeholder='Username'
                     autoComplete='username'
                     onChange={this.onInputChange.bind(this, 'username')}/>
          <FormField type='password'
                     placeholder='Password'
                     onChange={this.onInputChange.bind(this, 'password')}/>
          <div className="form_field">
            <button onClick={this.getToken.bind(this)}>Let's cook!</button>
            <a href="#">Forgot your password?</a>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(LoginForm);