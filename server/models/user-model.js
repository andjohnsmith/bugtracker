const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'Manager', 'Dev'], required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('users', User);
