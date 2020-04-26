import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const insertTicket = (payload) => api.post(`/tickets`, payload);
export const getAllTickets = () => api.get(`/tickets`);
export const updateTicketById = (id, payload) =>
  api.put(`/tickets/${id}`, payload);
export const deleteTicketById = (id) => api.delete(`/tickets/${id}`);
export const getTicketById = (id) => api.get(`/tickets/${id}`);

const apis = {
  insertTicket,
  getAllTickets,
  updateTicketById,
  deleteTicketById,
  getTicketById,
};

export default apis;
