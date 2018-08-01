import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from "../../actions";

export class RentalDetail extends Component {
  componentWillMount(){
    const rentalId = this.props.match.params.id;
    this.props.dispatch(actions.fetchRentalById(rentalId));
  }
  render() {
    return (
      <div className="container">
        <h1 className="blue">I AM detail Title:{this.props.rental.title}</h1>
        <h1 className="blue">I AM city:{this.props.rental.city}</h1>
      </div>
    );
  }
}


function mapStateToProps(state){
  return {
    rental: state.rental.data
  }
}

export default connect(mapStateToProps)(RentalDetail)
