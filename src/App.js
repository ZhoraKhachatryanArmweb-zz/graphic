import React ,{ useState, useEffect }from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import RouteWithHeader from './components/Layout/RouteWithHeader';

import Home from "./components/home/home";
import NotFound from './components/NotFound';
import './App.css';

function App() {
  return (
      <Router>
        <Switch>
          <RouteWithHeader exact path='/' component={Home}/>
          <RouteWithHeader exact path='/week' component={Home}/>
          <RouteWithHeader exact path='/month' component={Home}/>
          <RouteWithHeader exact path='/year' component={Home}/>
          <RouteWithHeader exact path='/change' component={Home}/>
          <NotFound />
        </Switch>
    </Router>
  );
}

export default App;
