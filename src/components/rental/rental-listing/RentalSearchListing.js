import React, {Component} from 'react';
import {RentalList} from './RentalList';
import * as actions from 'actions';


import { connect} from 'react-redux';

class RentalSearchListing extends Component {


 constructor(){
   super();
   this.state ={
     city: ''
   }
 }
  componentWillMount(){
    const city = this.props.match.params.city;
    this.setState({
      city
    });
    this.props.dispatch(actions.fetchRentals());

  }
  render() {
    return (
      <section id='rentalListing'>
        <h5>{this.state.city}</h5>
        <h1 className='page-title'>Your Home All Around the World</h1>
        <RentalList rentals={this.props.rentals}/>
      </section>

    );
  }


}

function mapStateToProps(state){
  return {
    rentals: state.rentals.data
  }
}

export default connect(mapStateToProps)(RentalSearchListing)