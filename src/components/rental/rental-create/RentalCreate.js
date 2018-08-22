import React from 'react';
import RentalCreateForm from './RentalCreateForm';
import * as actions from "../../../actions";
import {toast, ToastContainer} from "react-toastify";
import {Redirect} from 'react-router-dom';


export class RentalCreate extends React.Component {
  constructor() {
    super();
    this.state = {
      errors: [],
      redirect: false
    }
    this.createRental = this.createRental.bind(this);
    this.rentalCategories = ['house', 'condo', 'apartment'];
  }

  createRental(rentalData) {
    console.log(rentalData);
    actions.createRentals(rentalData)
      .then((rental) => {
          toast.success('Rental has been successfully created!');
          this.setState({
            redirect: true
          });
        },
        (errors) => {
          this.setState({
            errors
          })
        })
  }

  render() {
    const {errors, redirect} = this.state;
    if (redirect) {
      return (
        <Redirect to={{pathname: '/rentals'}}/>
      )

    } else {
      return (
        <section id='newRental'>
          <ToastContainer/>
          <div className='bwm-form'>
            <div className='row'>
              <div className='col-md-5'>
                <h1 className='page-title'>Create Rental</h1>
                <RentalCreateForm submitCb={this.createRental}
                                  options={this.rentalCategories}
                            errors={errors}/>
              </div>
              <div className='col-md-6 ml-auto'>
                <div className='image-container'>
                  <h2 className='catchphrase'>Hundreds of awesome places in reach of few clicks.</h2>
                  <img src={process.env.PUBLIC_URL + '/img/create-rental.jpg'} alt=''/>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }
  }

}