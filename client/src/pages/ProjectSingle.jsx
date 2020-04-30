import React, { Component } from 'react';
import TableView from '../components/TableView';
import { Container, Row, Col, Modal, Form, Button } from 'react-bootstrap';
import api from '../api';

class ShowTicket extends Component {
  showTicket = (event) => {
    event.preventDefault();

    window.location.href = `/tickets/${this.props.id}`;
  };

  render() {
    return <div onClick={this.showTicket}>Update</div>;
  }
}

class TicketModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      show: false,
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleChangeInputTitle = async (event) => {
    const title = event.target.value;
    this.setState({ title: title });
  };

  handleChangeInputDescription = async (event) => {
    const description = event.target.value;
    this.setState({ description: description });
  };

  handleCreateTicket = async () => {
    const project = this.props.project;
    console.log(project);
    const { title, description } = this.state;
    const payload = { title, description, project };

    await api.insertTicket(payload).then((res) => {
      window.alert(`Ticket inserted successfully`);
      this.setState({
        title: '',
        description: '',
        show: false,
      });
    });
  };

  render() {
    return (
      <React.Fragment>
        <Button variant="success" onClick={this.handleShow}>
          Create new ticket
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Ticket</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Title:</Form.Label>
                <Form.Control
                  type="text"
                  value={this.title}
                  onChange={this.handleChangeInputTitle}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  value={this.description}
                  onChange={this.handleChangeInputDescription}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleCreateTicket}>
              Create ticket
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
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
    const { name, description, tickets, id } = this.state;
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
      <Container fluid>
        <Row>
          <Col xs={6} md={4}>
            <h1>{name}</h1>
            <p>{description}</p>
          </Col>
          <Col xs={12} md={8}>
            <h2>Tickets</h2>
            <TicketModal project={id} />
            {showTable && <TableView columns={columns} data={tickets} />}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ProjectSingle;
