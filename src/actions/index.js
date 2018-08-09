import authService from '../services/auth-service';

import {
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTAL_BY_ID_INIT,
  FETCH_RENTALS_SUCCESS,
  FETCH_RENTALS_INIT, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT
} from "./types";

import axios from 'axios';


const fetchRentalByIdInit = () => {
  return {
    type: FETCH_RENTAL_BY_ID_INIT
  }
}


const fetchRentalByIdSuccess = (rental) => {
  return {
    type: FETCH_RENTAL_BY_ID_SUCCESS,
    rental
  }
}


const fetchRentalsInit = () => {
  return {
    type: FETCH_RENTALS_INIT
  }
}
export const fetchRentalsSuccess = (rentals) => {

  return {
    type: FETCH_RENTALS_SUCCESS,
    rentals: rentals
  }
}

export const fetchRentals = () => {
  return dispatch => {
    dispatch(fetchRentalsInit());
    axios.get('/api/v1/rentals')
      .then(resp => resp.data)
      .then(rentals => dispatch(fetchRentalsSuccess(rentals)));

  }

}
export const fetchRentalById = (rentalId) => {
  return function (dispatch) {
    dispatch(fetchRentalByIdInit());

    axios.get(`/api/v1/rentals/${rentalId}`)
      .then(resp => resp.data)
      .then(rental => dispatch(fetchRentalByIdSuccess(rental))
      );
  }
}

// auth actions

export const register = (userData) => {
  return axios.post('/api/v1/users/register', {...userData})
    .then(
      resp => resp.data,
      err => Promise.reject(err.response.data.errors)
    );
}

export const loginSuccess = () => {

  return {
    type: LOGIN_SUCCESS
  }
}


export const loginFailure = (errors) => {

  return {
    errors,
    type: LOGIN_FAILURE
  }
}

export const checkAuthState = () => {
  return function (dispatch) {
    if(authService.isAuthenticated()){
      dispatch(loginSuccess());
    }
  }
}

export const login = (userData) => {
  return function (dispatch) {

    axios.post('/api/v1/users/auth', {...userData})
      .then(resp => resp.data)
      .then((token) => {
          authService.saveToken(token);
          dispatch(loginSuccess());
        }
      ).catch(({response}) => {
      dispatch(loginFailure(response.data.errors));
    })
  }
}

export const logout = () => {
  authService.invalidateUser();
  return {
    type: LOGOUT
  }
}

