import React, { Component } from 'react';
import { useTable } from 'react-table';
import api from '../api';

import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
`;

const Update = styled.div`
  color: #ef9b0f;
  cursor: pointer;
`;

const Delete = styled.div`
  color: #ff0000;
  cursor: pointer;
`;

class UpdateTicket extends Component {
  updateUser = (event) => {
    event.preventDefault();

    window.location.href = `/tickets/update/${this.props.id}`;
  };

  render() {
    return <Update onClick={this.updateUser}>Update</Update>;
  }
}

class DeleteTicket extends Component {
  deleteUser = (event) => {
    event.preventDefault();

    if (
      window.confirm(
        `Do you want to delete the ticket ${this.props.id} permanently?`,
      )
    ) {
      api.deleteTicketById(this.props.id);
      window.location.reload();
    }
  };

  render() {
    return <Delete onClick={this.deleteUser}>Delete</Delete>;
  }
}

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

class TicketsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: [],
      columns: [],
      isLoading: false,
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });

    await api.getAllTickets().then((tickets) => {
      this.setState({
        tickets: tickets.data.data,
        isLoading: false,
      });
    });
  };

  render() {
    const { tickets, isLoading } = this.state;
    console.log('TCL: TicketsList -> render -> tickets', tickets);

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
        {showTable && <Table columns={columns} data={tickets} />}
      </Wrapper>
    );
  }
}

export default TicketsList;
