const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Ticket = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    project: { type: Schema.Types.ObjectId, required: true },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
    status: {
      type: String,
      enum: ['Open', 'Pending', 'Closed'],
      required: true,
    },
    creator: { type: Schema.Types.ObjectId, required: true },
    assignedTo: { type: Schema.Types.ObjectId, required: true },
    type: {
      type: String,
      enum: ['Bug', 'Request', 'Question'],
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('tickets', Ticket);
