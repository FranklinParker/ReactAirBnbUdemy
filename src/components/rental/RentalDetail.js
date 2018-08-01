import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from "../../actions";

export class RentalDetail extends Component {
  componentWillMount() {
    const rentalId = this.props.match.params.id;
    this.props.dispatch(actions.fetchRentalById(rentalId));
  }

  render() {
    const rental = this.props.rental;
    if (rental.id) {
      return (
        <div className="container">
          <h1 className="blue">I AM detail Title:{rental.title}</h1>
          <h1 className="blue">I AM city:{rental.city}</h1>
        </div>
      );
    } else {
      return (
        <div className="container">
          <h1 className="blue">Loading</h1>
        </div>
      );
    }
  }
}


function mapStateToProps(state) {
  return {
    rental: state.rental.data
  }
}

export default connect(mapStateToProps)(RentalDetail)
