import React, {Component} from 'react';
import {RentalList} from './RentalList';
import * as actions from 'actions';


import { connect} from 'react-redux';

class RentalSearchListing extends Component {


 constructor(){
   super();
   this.state ={
     searchedCity: ''
   }
 }
  componentWillMount(){
    const searchedCity = this.props.match.params.city;
    this.setState({
      searchedCity
    });
    this.props.dispatch(actions.fetchRentals());

  }
  render() {
    return (
      <section id='rentalListing'>
        <h1 className='page-title'>Your Home in {this.state.searchedCity}</h1>
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