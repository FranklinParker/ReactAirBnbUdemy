import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';


class AuthService {
  tokenKey = 'auth_token';
  saveToken(token){
    localStorage.setItem(this.tokenKey, token);
  }
  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  getExpiration(token){
    const decodedToken = jwt.decode(token);
    return moment.unix(decodedToken.exp);

  }
  isValid(token) {
    return moment().isBefore(this.getExpiration(token));
  }

  isAuthenticated() {
    const token = this.getToken();
    return (token && this.isValid(token))? true: false;

  }


  invalidateUser() {
    localStorage.removeItem(this.tokenKey);

  }
}

export default new AuthService();