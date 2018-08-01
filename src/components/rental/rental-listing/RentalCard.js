import React from 'react';
import {Link} from 'react-router-dom';

export function RentalCard(props) {
  const rental = props.rental;
  return (
    <div className={props.colNum}>
      <Link to={`/rentals/${rental.id}`} className='rental-detail-link'>

        <div className='card bwm-card'>
          <img className='card-img-top' src={rental.image} alt={rental.title}></img>
          <div className='card-block'>
            <h6
              className={`card-subtitle ${rental.category}`}>{rental.shared ? 'shared' : 'whole'} - {rental.category} {rental.title}&#183;{rental.city}</h6>
            <h4 className='card-title'>{rental.description}</h4>
            <p class='card-text'>${rental.dailyRate} per Night &#183; Free Cancelation</p>
          </div>
        </div>
      </Link>
    </div>
  )

}