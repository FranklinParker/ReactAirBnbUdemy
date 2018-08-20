import titlelize from 'titlelize';
import * as moment from 'moment';

export const isShared = shared=>shared? 'shared': 'entire';
export const toUpperCase = value => value? titlelize(value):''

export const getRangeOfDates=(startAt, endAt, dateFormat = 'YY/MM/DD')=>{
  const tempDates = [];
  let mStartAt = moment(startAt);
  const mEndAt = moment(endAt);
  while(mStartAt < mEndAt){
    tempDates.push(mStartAt.format(dateFormat));
    mStartAt = mStartAt.add(1, 'day');

  }
  tempDates.push(mEndAt.format(dateFormat))
  return tempDates;

}