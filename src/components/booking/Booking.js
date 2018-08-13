import React from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';

export class Booking extends React.Component {

  render() {
    const { rental } = this.props;

    return (
      <div className='booking'>
        <h3 className='booking-price'>$ {rental.dailyRate} HARDCODED <span className='booking-per-night'>per night</span></h3>
        <hr></hr>
        <div className='form-group'>
          <label htmlFor='dates'>Dates</label>
          <DateRangePicker startDate="1/1/2014" endDate="3/1/2014">
            <button>Select Date</button>
          </DateRangePicker>
        </div>
        <div className='form-group'>
          <label htmlFor='guests'>Guests</label>
          <input type='number' className='form-control' id='guests' aria-describedby='emailHelp' placeholder=''></input>
        </div>
        <button className='btn btn-bwm btn-confirm btn-block'>Reserve place now</button>
        <hr></hr>
        <p className='booking-note-title'>People are interested into this house</p>
        <p className='booking-note-text'>
          More than 500 people checked this rental in last month.
        </p>
      </div>
    )
  }
}
