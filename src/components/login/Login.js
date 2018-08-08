import React, {Component} from 'react';
import LoginForm from './LoginForm';


export class Login extends Component {
  constructor() {
    super();
    this.state = {
      errors: []
    }
    this.loginUser = this.loginUser.bind(this);
  }

  loginUser(userData) {
    alert(JSON.stringify(userData, null, 2));
  }

  render() {
    const {errors, redirect} = this.state;
    return (
      <div className="container">
        <h1>Login Page</h1>
        <LoginForm submitCb={this.loginUser} errors={errors}/>
      </div>
    );

  }
}

