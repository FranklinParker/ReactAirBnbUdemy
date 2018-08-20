import React from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { BookingModal} from './BookingModal'
import {getRangeOfDates} from "../../helpers";
import * as moment from 'moment';

export class Booking extends React.Component {

  constructor() {
    super();
    this.dateRef = React.createRef();
    this.bookedOutDates = [];
    this.state = {
      proposedBooking: {
        startAt: '',
        endAt: '',
        guests: 0,
        rental: {}
      },
      modal: {
        open: false
      }
    }
    this.checkInvalidDate = this.checkInvalidDate.bind(this);
    this.handleApply = this.handleApply.bind(this);
    this.cancelProposedBooking = this.cancelProposedBooking.bind(this);
  }

  componentWillMount() {
    this.getBookedOutDates();
  }

  getBookedOutDates() {
    const {bookings} = this.props.rental;
    if (bookings && bookings.length > 0) {
      bookings.forEach(booking => {
        let bookedDates = getRangeOfDates(booking.startAt, booking.endAt);
        this.bookedOutDates.push(...bookedDates);
      });

    }

  }

  handleApply(event, picker) {
    const startAt = picker.startDate.format('Y/MM/DD');
    const endAt = picker.endDate.format('Y/MM/DD');
    this.dateRef.current.value = startAt + ' to ' + endAt;

    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        startAt,
        endAt
      }
    });
    console.log('date selected', this.state);
  }

  selectGuests(event) {


    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        guests: parseInt(event.target.value, 10)
      }
    });
  }

  checkInvalidDate(date) {
    return this.bookedOutDates.includes(date.format('Y/MM/DD')) || date.diff(moment(), 'days') < -1;
  }

  confirmProposedBooking() {
    const { startAt, endAt} =  this.state.proposedBooking;
    const days = getRangeOfDates(startAt, endAt).length -1;
    const {rental} = this.props;
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        days,
        totalPrice: days * rental.dailyRate,
        rental
      },
      modal: {
        open: true
      }
    });
    console.log('confirm', this.state);


  }
  cancelProposedBooking() {
    this.setState({
      modal: {
        open: false
      }
    });
    console.log('cancel', this.state);

  }

  render() {
    const {rental} = this.props;


    return (
      <div className='booking'>
        <h3 className='booking-price'>$ {rental.dailyRate} HARDCODED <span
          className='booking-per-night'>per night</span></h3>
        <hr></hr>
        <div className='form-group'>
          <label htmlFor='dates'>Dates</label>
          <DateRangePicker opens='left'
                           onApply={this.handleApply}
                           isInvalidDate={this.checkInvalidDate}
                           containerStyles={{display: 'block'}}>
            <input ref={this.dateRef} id='dates' type='text' className='form-control'/>
          </DateRangePicker>
        </div>
        <div className='form-group'>
          <label htmlFor='guests'>Guests</label>
          <input type='number'
                 onChange={(event) => {
                   this.selectGuests(event)
                 }}
                 className='form-control'
                 id='guests'
                 aria-describedby='emailHelp'
                 placeholder=''></input>
        </div>
        <button className='btn btn-bwm btn-confirm btn-block'
                onClick={() => {
                  this.confirmProposedBooking();
                }}>Reserve place now
        </button>
        <hr></hr>
        <p className='booking-note-title'>People are interested into this house</p>
        <p className='booking-note-text'>
          More than 500 people checked this rental in last month.
        </p>
        <BookingModal open={this.state.modal.open}
                      closeModal={this.cancelProposedBooking}
                      booking ={ this.state.proposedBooking}
                     />
      </div>
    )
  }
}
