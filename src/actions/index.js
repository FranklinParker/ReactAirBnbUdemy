import authService from '../services/auth-service';
import axiosService from '../services/axios-service';


import {
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTAL_BY_ID_INIT,
  FETCH_RENTALS_SUCCESS,
  FETCH_RENTALS_INIT, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, FETCH_RENTALS_FAIL
} from "./types";

import axios from 'axios';


const axiosInstance = axiosService.getInstance();

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

export const fetchRentalErrors = (errors) => {

  return {
    type: FETCH_RENTALS_FAIL,
    errors: errors
  }
}

export const fetchRentals = (city) => {
  const url = city?`/rentals?city=${city}`:'/rentals';
  return dispatch => {
    dispatch(fetchRentalsInit());
    axiosInstance.get(url)
      .then(resp => resp.data)
      .then(rentals => dispatch(fetchRentalsSuccess(rentals)))
      .catch(({response})=>dispatch(fetchRentalErrors(response.data.errors)));

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
    if (authService.isAuthenticated()) {
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

// booking

export const createBooking = (booking) => {
  return axiosInstance.post('/bookings', booking)
    .then(resp => resp.data)
    .catch(({response}) => Promise.reject(response.data.errors));
}


// rental

export const createRentals = (rental) => {
  return axiosInstance.post('/rentals', rental)
    .then(resp => resp.data)
    .catch(({response}) => Promise.reject(response.data.errors));
}


