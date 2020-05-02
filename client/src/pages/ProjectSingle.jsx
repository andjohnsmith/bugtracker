import React, { Component } from 'react';
import TableView from '../components/TableView';
import { Container, Row, Col, Modal, Form, Button } from 'react-bootstrap';
import api from '../api';

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
        name: 'Title',
        selector: 'title',
        sortable: true,
      },
      {
        name: 'Description',
        selector: 'description',
        sortable: true,
      },
      {
        name: 'Created At',
        selector: 'createdAt',
        sortable: true,
      },
    ];
    const goToTicket = (row) => (window.location.href = '/tickets/' + row._id);

    let showTable = true;
    if (!tickets.length) {
      showTable = false;
    }

    return (
      <React.Fragment>
        <div className="breadcomb-area">
          <Container>
            <Row>
              <Col>
                <div className="breadcomb-list">
                  <Row>
                    <Col lg={6} md={6} sm={6} xs={12}>
                      <div className="breadcomb-wp">
                        <div className="breadcomb-ctn">
                          <h2>{name}</h2>
                          <p>{description}</p>
                        </div>
                      </div>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={3}>
                      <div className="breadcomb-report">
                        <TicketModal id={id} />
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        {showTable && (
          <TableView
            title="Tickets"
            columns={columns}
            data={tickets}
            onRowClicked={goToTicket}
          />
        )}
      </React.Fragment>
    );
  }
}

export default ProjectSingle;
