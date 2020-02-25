import React, {Component} from 'react';
import { Route,Switch, Redirect } from 'react-router-dom';
import Auth from "./containers/Auth";
import MapContainer from "./containers/MapContainer";
import LoginContainer from "./containers/LoginContainer";
import MainContainer from "./containers/MainContainer";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/' exact component={MainContainer}/>
          <Route path='/login' exact component={LoginContainer}/>
          <Route path='/auth' exact component={Auth}/>
          <Route path='/location' exact component={MapContainer}/>
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;

