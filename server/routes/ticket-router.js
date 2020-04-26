const express = require('express');

const TicketCtrl = require('../controllers/ticket-ctrl');

const router = express.Router();

router.post('/tickets', TicketCtrl.createTicket);
router.put('/tickets/:id', TicketCtrl.updateTicket);
router.delete('/tickets/:id', TicketCtrl.deleteTicket);
router.get('/tickets/:id', TicketCtrl.getTicketById);
router.get('/tickets', TicketCtrl.getTickets);

module.exports = router;
