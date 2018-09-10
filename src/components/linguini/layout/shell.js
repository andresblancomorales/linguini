import React, {Component} from 'react';
import {connect} from "react-redux";
import RecipesView from "../recipesView";
import {Route, Switch} from 'react-router';
import '@fortawesome/fontawesome-free';
import NavBar from "./navBar";

const mapStateToProps = state => {
  return {
    location: state.router.location,
    session: state.token.decodedToken
  };
};

export class Shell extends Component {
  render() {
    return (
      <div className='shell'>
        <div className='topBar'>
          <div className='logoContainer'>
            <h1 className='logo'>Sous-chef</h1>
          </div>
          <NavBar menuItems={[{description: 'Recipes', href: '#/', name: 'nav_recipes'}, {description: 'Other Menu', href: '#/adios', name: 'nav_other'}]}/>
        </div>
        <div className='content'>
          <Switch location={this.props.location}>
            <Route exact path='/adios' render={() => (<div>Adios</div>)}/>
            <Route exact path='/' render={() => (<RecipesView/>)}/>
          </Switch>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Shell);