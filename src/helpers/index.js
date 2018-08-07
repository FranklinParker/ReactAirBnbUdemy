import titlelize from 'titlelize';

export const isShared = shared=>shared? 'shared': 'entire'
export const toUpperCase = value => value? titlelize(value):''