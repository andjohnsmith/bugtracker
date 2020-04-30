import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Header } from '../components';
import {
  ProjectList,
  ProjectSingle,
  TicketsList,
  TicketSingle,
} from '../pages';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/style.css';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/projects" exact component={ProjectList} />
        <Route path="/projects/:id" exact component={ProjectSingle} />
        <Route path="/tickets" exact component={TicketsList} />
        <Route path="/tickets/:id" exact component={TicketSingle} />
      </Switch>
    </Router>
  );
}

export default App;
