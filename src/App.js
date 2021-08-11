import React, { Component } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/auth/Logout/Logout';
import {connect} from 'react-redux'
import * as actionCreator from './store/actions/index'
import asyncComponent from './hoc/asyncComponent'

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/auth/auth');
});

const asyncOrder = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

class App extends Component {
  componentDidMount(){
    this.props.authCheckState();
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth}></Route>
        <Route path="/" exact component={BurgerBuilder}></Route>
        <Redirect to="/"></Redirect>
      </Switch>
    );

    if(this.props.isAuthenticated){
      routes = (
      <Switch>
        <Route path="/orders" component={asyncOrder}></Route>
        <Route path="/checkout" component={asyncCheckout}></Route>
        <Route path="/auth" component={asyncAuth}></Route>
        <Route path="/logout" component={Logout}></Route>
        <Route path="/" exact component={BurgerBuilder}></Route>
        <Redirect to="/"></Redirect>
      </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
          {/* <BurgerBuilder></BurgerBuilder>
          <Checkout></Checkout> */}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return{
    authCheckState: () => dispatch(actionCreator.authCheckState()),
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
