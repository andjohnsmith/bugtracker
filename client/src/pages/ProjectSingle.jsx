import React, { Component } from 'react';
import { TableView } from '../components/TableView';
import { Container, Row, Col } from 'react-bootstrap';
import api from '../api';

class ShowTicket extends Component {
  showTicket = (event) => {
    event.preventDefault();

    window.location.href = `/tickets/update/${this.props.id}`;
  };

  render() {
    return <div onClick={this.showTicket}>Update</div>;
  }
}

class ProjectSingle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      name: '',
      description: '',
      tickets: '',
    };
  }

  componentDidMount = async () => {
    const { id } = this.state;
    const project = await api.getProjectById(id);
    const tickets = await api.getTicketsByProject(id);

    this.setState({
      name: project.data.data.name,
      description: project.data.data.description,
      tickets: tickets.data.data,
    });
  };

  render() {
    const { name, description, tickets } = this.state;
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
        Header: 'View',
        accessor: '_id',
        Cell: function (props) {
          return (
            <span>
              <ShowTicket id={props.cell.value} />
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
      <React.Fragment>
        <Container fluid>
          <Row>
            <Col xs={6} md={4}>
              <h1>{name}</h1>
              <p>{description}</p>
            </Col>
            <Col xs={12} md={8}>
              <h2>Tickets</h2>
              {showTable && <TableView columns={columns} data={tickets} />}
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default ProjectSingle;
