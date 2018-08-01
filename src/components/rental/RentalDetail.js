import React, {Component} from 'react';

export class RentalDetail extends Component {

  render() {
    return (
      <div className="container">
        <h1 className="blue">I AM detail id:{this.props.match.params.id}</h1>
      </div>
    );
  }
}

