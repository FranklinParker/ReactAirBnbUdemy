import React from 'react';
import {connect} from "react-redux";
import * as actions from "../../../actions/index";


class BookingManage extends React.Component{
  componentWillMount() {
    this.props.dispatch(actions.fetchBookings());
  }
  render(){
    const { userBookings} = this.props;
    return (
      <div>
        { userBookings.data.map((booking)=>{
           return (<p> {booking.startAt} - {booking.endAt} </p>)
        })}
      </div>
    );
  }
}



function mapStateToProps(state) {
  return {
    userBookings: state.userBookings
  }
}

export default connect(mapStateToProps)(BookingManage)
