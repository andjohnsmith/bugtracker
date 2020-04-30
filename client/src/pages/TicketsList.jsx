import React, { Component } from 'react';
import TableView from '../components/TableView';
import api from '../api';

import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
`;

const Update = styled.div`
  color: #ef9b0f;
  cursor: pointer;
`;

class UpdateTicket extends Component {
  updateTicket = (event) => {
    event.preventDefault();

    window.location.href = `/tickets/${this.props.id}`;
  };

  render() {
    return <Update onClick={this.updateTicket}>Update</Update>;
  }
}

class TicketsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: [],
      columns: [],
    };
  }

  componentDidMount = async () => {
    await api.getAllTickets().then((tickets) => {
      this.setState({
        tickets: tickets.data.data,
      });
    });
  };

  render() {
    const { tickets } = this.state;

    const columns = [
      {
        Header: 'Title',
        accessor: 'title',
        filterable: true,
      },
      {
        Header: 'Description',
        accessor: 'description',
        filterable: true,
      },
      {
        Header: 'Update',
        accessor: '_id',
        Cell: function (props) {
          return (
            <span>
              <UpdateTicket id={props.cell.value} />
            </span>
          );
        },
      },
    ];

    let showTable = true;
    if (!tickets.length) {
      showTable = false;
    }

    return (
      <Wrapper>
        <h1>My Tickets</h1>
        {showTable && <TableView columns={columns} data={tickets} />}
      </Wrapper>
    );
  }
}

export default TicketsList;
