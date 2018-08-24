import React from 'react';
import * as actions from "../../../actions";

export class RentalManage extends React.Component{
  componentWillMount() {
    actions.getUserRentals()
      .then((rentals)=>{
        console.log('user rentals', rentals);
      })
  }

  render(){
    return (
      <h1>I Rental manager</h1>
    );
  }
}


