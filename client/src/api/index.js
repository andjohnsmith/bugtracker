import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const getAllProjects = () => api.get(`/projects`);
export const getProjectById = (id) => api.get(`/projects/${id}`);

export const insertTicket = (payload) => api.post(`/tickets`, payload);
export const getAllTickets = () => api.get(`/tickets`);
export const updateTicketById = (id, payload) =>
  api.put(`/tickets/${id}`, payload);
export const deleteTicketById = (id) => api.delete(`/tickets/${id}`);
export const getTicketById = (id) => api.get(`/tickets/${id}`);
export const getTicketsByProject = (id) => api.get(`/tickets/?project=${id}`);

const apis = {
  getAllProjects,
  getProjectById,
  insertTicket,
  getAllTickets,
  updateTicketById,
  deleteTicketById,
  getTicketById,
  getTicketsByProject,
};

export default apis;
