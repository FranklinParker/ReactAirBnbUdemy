import React from 'react';
import * as actions from "../../../actions";

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

  render() {
    const {userRentals, errors} = this.state;
    return (
      <div>
        {userRentals.map((rental, index) => {
          return (<p key={index}> {rental.street} - {rental.city} </p>)
        })}
      </div>


    );

  }
}

