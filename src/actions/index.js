import authService from '../services/auth-service';
import axiosService from '../services/axios-service';


import {
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTAL_BY_ID_INIT,
  FETCH_RENTALS_SUCCESS,
  FETCH_RENTALS_INIT, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, FETCH_RENTALS_FAIL, FETCH_USER_BOOKINGS_INIT,
  FETCH_USER_BOOKINGS_SUCCESS, FETCH_USER_BOOKINGS_FAIL
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

export const deleteRental = (rentalId) => {
  return axiosInstance.delete(`/rentals/${rentalId}`).then(
    res => res.data,
    err => Promise.reject(err.response.data.errors))
}

export const fetchRentals = (city) => {
  const url = city ? `/rentals?city=${city}` : '/rentals';
  return dispatch => {
    dispatch(fetchRentalsInit());
    axiosInstance.get(url)
      .then(resp => resp.data)
      .then(rentals => dispatch(fetchRentalsSuccess(rentals)))
      .catch(({response}) => dispatch(fetchRentalErrors(response.data.errors)));

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
  const username = authService.getUsername();
  return {
    type: LOGIN_SUCCESS,
    username: username
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


// rental

export const createRentals = (rental) => {
  return axiosInstance.post('/rentals', rental)
    .then(resp => resp.data)
    .catch(({response}) => Promise.reject(response.data.errors));
}

export const getUserRentals = ()=>{
  return axiosInstance.get('/rentals/manage').then(
    res => res.data,
    err => Promise.reject(err.response.data.errors)
  );
}

// bookings


export const createBooking = (booking) => {
  return axiosInstance.post('/bookings', booking)
    .then(resp => resp.data)
    .catch(({response}) => Promise.reject(response.data.errors));
}


export const fetchUserBookingsErrors = (errors) => {

  return {
    type: FETCH_USER_BOOKINGS_FAIL,
    errors
  }
}
export const fetchUserBookingSuccess = (userBookings) => {

  return {
    type: FETCH_USER_BOOKINGS_SUCCESS,
    userBookings
  }
}
const fetchUserBookingsInit = () => {
  return {
    type: FETCH_USER_BOOKINGS_INIT
  }
}

export const fetchBookings = () => {
  return dispatch => {
    dispatch(fetchUserBookingsInit());
    axiosInstance.get('/bookings/manage')
      .then(resp => resp.data)
      .then(bookings => dispatch(fetchUserBookingSuccess(bookings)))
      .catch(({response}) => dispatch(fetchUserBookingsErrors(response.data.errors)));

  }
}
