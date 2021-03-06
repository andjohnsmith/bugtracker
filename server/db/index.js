const mongoose = require('mongoose');

mongoose.set('useUnifiedTopology', true);

mongoose
  .connect('mongodb://127.0.0.1:27017/ticketdb', { useNewUrlParser: true })
  .catch((e) => {
    console.error('Connection error', e.message);
  });

const db = mongoose.connection;

module.exports = db;
