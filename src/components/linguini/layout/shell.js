import React, {Component} from 'react';
import {connect} from "react-redux";
import RecipesView from "../recipesView";
import {Route, Switch} from 'react-router';
import NavBar from './navBar';
import * as _ from '../../../utils/utilities';
import {bindActionCreators} from 'redux';
import NewRecipe from "../newRecipe";

const instanceProvider = _.getLinguiniInstanceProvider();
const recipeActions = instanceProvider.recipeActions;

export class Shell extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.actions.getCategories();
  }

  render() {
    return (
      <div className='shell'>
        <div className='topBar'>
          <div className='logoContainer'>
            <h1 className='logo'>Sous-chef</h1>
          </div>
          <NavBar menuItems={[{description: 'Recipes', href: '#/', name: 'nav_recipes'}, {description: 'New', href: '#/new', name: 'nav_new', isSubMenu: true}]}/>
        </div>
        <div className='content'>
          <Switch location={this.props.location}>
            <Route exact path='/new' render={() => (<NewRecipe>New Recipe</NewRecipe>)}/>
            <Route exact path='/' render={() => (<RecipesView/>)}/>
          </Switch>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    location: state.router.location,
    session: state.token.decodedToken
  };
};

const mapActionsToProps = dispatch => {
  return {
    actions: bindActionCreators(recipeActions.creators, dispatch)
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Shell);