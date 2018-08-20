import React from 'react';

import Modal from 'react-responsive-modal';

export function BookingModal(props) {
  const {open, closeModal, booking} = props;
  return (
    <Modal open={open} onClose={closeModal} little
           classNames={{modal: 'booking-modal'}}>
      <h4 className='modal-title title'>Confirm Booking </h4>
      <p className='dates'>--{booking.startAt} / --{booking.endAt}--</p>
      <div className='modal-body'>
        <em>--{booking.days}---</em> nights /
        <em>--{booking.rental.dailyRate}---$</em> per Night
        <p>Guests: <em>--{booking.guests}---</em></p>
        <p>Price: <em>--{booking.totalPrice}---$ </em></p>
        <p>Do you confirm your booking for selected days?</p>
      </div>

    </Modal>


);
}