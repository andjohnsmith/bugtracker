const Ticket = require('../models/ticket-model');

createTicket = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a ticket',
    });
  }

  const ticket = new Ticket(body);

  if (!ticket) {
    return res.status(400).json({ success: false, error: err });
  }

  ticket
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: ticket._id,
        message: 'Ticket created!',
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: 'Ticket not created!',
      });
    });
};

updateTicket = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    });
  }

  Ticket.findOne({ _id: req.params.id }, (err, ticket) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'Ticket not found!',
      });
    }
    ticket.title = body.title;
    ticket.description = body.description;
    ticket.project = body.project;
    ticket
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: ticket._id,
          message: 'Ticket updated!',
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: 'Ticket not updated!',
        });
      });
  });
};

deleteTicket = async (req, res) => {
  await Ticket.findOneAndDelete({ _id: req.params.id }, (err, ticket) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, error: `Ticket not found` });
    }

    return res.status(200).json({ success: true, data: ticket });
  }).catch((err) => console.log(err));
};

getTicketById = async (req, res) => {
  await Ticket.findOne({ _id: req.params.id }, (err, ticket) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, error: `Ticket not found` });
    }
    return res.status(200).json({ success: true, data: ticket });
  }).catch((err) => console.log(err));
};

getTickets = async (req, res) => {
  await Ticket.find({}, (err, tickets) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (req.query.project) {
      tickets = tickets.filter((ticket) => ticket.project == req.query.project);
    }
    return res.status(200).json({ success: true, data: tickets });
  }).catch((err) => console.log(err));
};

module.exports = {
  createTicket,
  updateTicket,
  deleteTicket,
  getTickets,
  getTicketById,
};
