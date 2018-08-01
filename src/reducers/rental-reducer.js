import {FETCH_RENTAL_BY_ID, FETCH_RENTALS} from "../actions/types";


const INITIAL_STATE ={
  rentals: {
    data: []
  },
  rental: {
    data: {}
  }

}

export const rentalReducer = (state=INITIAL_STATE.rentals, action)=>{
  switch(action.type){
    case FETCH_RENTALS:
      return {...state, data:action.rentals};
    default:
      return state;
  }

}


export const selectRentalReducer = (state=INITIAL_STATE.rental, action)=>{
  switch(action.type){
    case FETCH_RENTAL_BY_ID:
      return {...state, data:action.rental};
    default:
      return state;
  }

}