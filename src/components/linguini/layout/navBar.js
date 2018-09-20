"use strict";
import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as _ from '../../../utils/utilities';

const instanceProvider = _.getLinguiniInstanceProvider();
const sessionActions = instanceProvider.sessionActions;
const bearerTokenProvider = instanceProvider.bearerTokenProvider;


export class NavBar extends Component {

  logout() {
    if (_.isFunction(this.props.actions.logout)) {
      bearerTokenProvider.getToken().then(accessToken => {
        this.props.actions.logout(accessToken);
      });
    }
  }

  render() {
    return (
      <div className='navBar'>
        <div className='menu'>
          {
            !_.isDefined(this.props.menuItems) ? null :
              this.props.menuItems.map(link => {
                let href = link.href.startsWith('#') ? link.href.slice(1, link.href.length) : link.href;
                let isSelected = href === this.props.location.pathname;

                if (link.isSubMenu && !isSelected) {
                  return null;
                }
                return (
                  <a key={link.name} href={link.href}
                     className={`${isSelected ? 'selected' : ''} ${link.isSubMenu ? 'subMenu' : ''}`}>{link.description}</a>
                )
              })
          }
        </div>
        <div className='sessionActions'>
          {!_.isDefined(this.props.session) ? null :
            <label className='user'>{`${this.props.session.firstName} ${this.props.session.lastName}`}</label>
          }
          <button className='logout fa fa-walking'
                  onClick={this.logout.bind(this)}/>
        </div>
      </div>
    )
  }
}

NavBar.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    href: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })).isRequired,
  session: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired
  }),
  actions: PropTypes.shape({
    logout: PropTypes.func.isRequired
  }).isRequired
};

const mapStateToProps = state => {
  return {
    location: state.router.location,
    session: state.token.decodedToken
  };
};

const mapActionsToProps = dispatch => {
  return {
    actions: bindActionCreators(sessionActions.creators, dispatch)
  };
};

export default connect(mapStateToProps, mapActionsToProps)(NavBar);