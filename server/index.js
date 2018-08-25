const express = require('express');
const mongoose = require('mongoose');
const rentalRoutes = require('./routes/rental');
const userRoutes = require('./routes/user');
const bookingRoutes = require('./routes/booking');
const path = require('path');
const cors = require('cors');

const bodyParser = require('body-parser');

const {DB_URI} = require('./config');
const FakeDb = require('./fake-db');

const promiseLib = global.Promise;
mongoose.Promise = global.Promise;
const mongoDB = mongoose.connect(DB_URI, {
  promiseLibrary: promiseLib // Deprecation issue again
});

mongoDB.then(async function (db) {
  console.log('Mongodb has been connected ');
  if (process.env.NODE_ENV !== 'production') {
    const fakeDb = new FakeDb();
    // fakeDb.seedDb();
  }
}).catch(function (err) {
  console.log('Error while trying to connect with mongodb');
  throw err;
});

const app = express();
app.use(bodyParser.json());
//app.use(cors());

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);

//if (process.env.NODE_ENV === 'production') {
  const appPath = path.join(__dirname,'..','build');
  app.use(express.static(appPath));

  app.get('*', function (req, res) {
    res.sendFile(path.resolve(appPath, 'index.html'));
  });
//}


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('I am running! on port:' + PORT);
});
