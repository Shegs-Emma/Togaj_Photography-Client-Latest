import React, { useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import Landing from './containers/Landing/Landing';
import Gallery from './containers/Gallery/Gallery';
import PhotoData from './containers/PhotoData/PhotoData';
import Login from './containers/Login/Login';
import Logout from './containers/Login/Logout/Logout';
import Contact from './containers/Contact/Contact';
import * as actions from './store/actions/index';

const App = (props) => {
  useEffect(() => {
    props.onTryAutoSignUp()
  });

  let routes = (
    <Switch>
      <Route path="/gallery" component={Gallery} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/contact" component={Contact} />
      <Route path="/" exact component={Landing} />
      <Redirect to="/" />
    </Switch>
  )

  if(props.isAuthenticated){
    routes = (
      <Switch>
        <Route path="/gallery" component={Gallery} />
        <Route path="/login" component={Login} />
        <Route path="/photo" component={PhotoData} />
        <Route path="/contact" component={Contact} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={Landing} />
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <div className="App">
        {routes}
    </div>
  );
}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
