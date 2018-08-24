import React from 'react';
import * as actions from "../../../actions";
import {Link} from 'react-router-dom';
import {RentalManageCard} from "./RentalManageCard";

export class RentalManage extends React.Component {
  constructor() {
    super();
    this.state = {
      userRentals: [],
      errors: []
    }

  }

  componentWillMount() {
    actions.getUserRentals()
      .then(userRentals => this.setState({userRentals}),
        errors => this.setState({errors})
      );
  }

  renderRentals(userRentals){
    return userRentals.map((rental, index) =>
      <RentalManageCard rental={rental}  key={index}/>)


  }
  render() {
    const {userRentals} = this.state;
    return (
      <section id='userRentals'>
        <h1 className='page-title'>My Rentals</h1>
        <div className='row'>
          { this.renderRentals(userRentals)}
        </div>
        <div className='alert alert-warning'>
          You dont have any rentals currenty created. If you want advertised your property
          please follow this link.
          <Link style={{'marginLeft': '10px'}} className='btn btn-bwm' to='create form'>Register Rental</Link>
        </div>

      </section>

    );

  }
}

