import React from 'react';
import * as actions from "../../../actions";
import {Link} from 'react-router-dom';
import {RentalManageCard} from "./RentalManageCard";
import {RentalManageModal} from "./RentalManageModal";



export class RentalManage extends React.Component {
  constructor() {
    super();
    this.state = {
      userRentals: [],
      errors: [],
      isFetching: false
    }

  }

  componentWillMount() {
    this.setState({
        isFetching: true
      })
    actions.getUserRentals()
      .then(userRentals => this.setState({userRentals, isFetching: false}),
        errors => this.setState({errors,  isFetching: false})
      );
  }

  renderRentalCards(userRentals) {
    return userRentals.map((rental, index) =>
      <RentalManageCard rental={rental} key={index} modal={<RentalManageModal bookings={rental.bookings}/>}/>)


  }

  render() {
    const {userRentals, isFetching} = this.state;
    return (
      <section id='userRentals'>
        <h1 className='page-title'>My Rentals</h1>
        <div className='row'>
          {this.renderRentalCards(userRentals)}
        </div>
        {!isFetching && userRentals.length === 0 &&
        <div className='alert alert-warning'>
          You dont have any rentals currenty created. If you want advertised your property
          please follow this link.
          <Link style={{'marginLeft': '10px'}} className='btn btn-bwm' to='/rentals/new'>Register Rental</Link>
        </div>
        }

      </section>

    );

  }
}

