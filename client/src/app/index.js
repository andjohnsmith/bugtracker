import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Header } from '../components';
import {
  ProjectList,
  ProjectSingle,
  TicketsList,
  TicketsInsert,
  TicketsUpdate,
} from '../pages';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/projects" exact component={ProjectList} />
        <Route path="/projects/:id" exact component={ProjectSingle} />
        <Route path="/tickets/list" exact component={TicketsList} />
        <Route path="/tickets/create" exact component={TicketsInsert} />
        <Route path="/tickets/update/:id" exact component={TicketsUpdate} />
      </Switch>
    </Router>
  );
}

export default App;
