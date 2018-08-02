import {
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTAL_BY_ID_INIT,
  FETCH_RENTALS_SUCCESS,
  FETCH_RENTALS_INIT
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
  return dispatch =>{
    dispatch(fetchRentalsInit());
    axios.get('/api/v1/rentals')
      .then((rentals)=>{
        dispatch(fetchRentalsSuccess(rentals.data));
      })
  }

}
export const fetchRentalById = (rentalId) => {
  return function (dispatch) {
    dispatch(fetchRentalByIdInit());
    console.log('rentalId', rentalId
    );
    axios.get(`/api/v1/rentals/${rentalId}`)
      .then((rental)=>{
        console.log('rental', rental);
        dispatch(fetchRentalByIdSuccess(rental.data));
      })

  }
}

