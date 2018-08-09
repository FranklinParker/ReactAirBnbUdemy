import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import {Header} from './components/shared/Header';
import RentalListing from './components/rental/rental-listing/RentalListing';
import RentalDetail from "./components/rental/rental-detail/RentalDetail";
import {Provider} from 'react-redux';
import './App.css';
import Login from "./components/login/Login";
import {Register} from "./components/register/Register";
import * as actions from 'actions';
import {logout} from "./actions";

const store = require('./reducers').init();

class App extends Component {

  componentWillMount() {
    this.checkAuthState();
  }

  logout(){
    store.dispatch(actions.logout());
  }
  checkAuthState() {
    store.dispatch(actions.checkAuthState());
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Header logout={this.logout}/>
            <div className="container">
              <Route exact path='/' render={() => <Redirect to='/rentals'/>}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/rentals" component={RentalListing}/>
              <Route exact path="/rentals/:id" component={RentalDetail}/>

            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
