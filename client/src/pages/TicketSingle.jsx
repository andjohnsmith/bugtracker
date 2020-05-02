import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import api from '../api';

class TicketSingle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      title: '',
      description: '',
      createdAt: '',
      updatedAt: '',
      project: '',
    };
  }

  // handleChangeInputTitle = async (event) => {
  //   const title = event.target.value;
  //   this.setState({ title });
  // };

  // handleChangeInputDescription = async (event) => {
  //   const description = event.target.value;
  //   this.setState({ description });
  // };

  // handleUpdateTicket = async () => {
  //   const { id, title, description } = this.state;
  //   const payload = { title, description };

  //   await api.updateTicketById(id, payload).then((res) => {
  //     window.alert(`Ticket updated successfully`);
  //     this.setState({
  //       title: '',
  //       description: '',
  //     });
  //   });
  // };

  componentDidMount = async () => {
    const { id } = this.state;
    const ticket = await api.getTicketById(id);
    const project = await api.getProjectById(ticket.data.data.project);

    this.setState({
      title: ticket.data.data.title,
      description: ticket.data.data.description,
      createdAt: ticket.data.data.createdAt,
      updatedAt: ticket.data.data.updatedAt,
      project: project.data.data.name,
    });
  };

  render() {
    const { title, description, createdAt, updatedAt, project } = this.state;
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Form style={{ backgroundColor: 'white' }}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control plaintext readOnly defaultValue={title} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control plaintext readOnly defaultValue={description} />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Project</Form.Label>
                  <Form.Control plaintext readOnly defaultValue={project} />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Status</Form.Label>
                  <Form.Control placeholder="Status" />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Priority</Form.Label>
                  <Form.Control placeholder="Priority" />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Type</Form.Label>
                  <Form.Control placeholder="Type" />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Assigned To</Form.Label>
                  <Form.Control placeholder="Me" />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Created By</Form.Label>
                  <Form.Control placeholder="You" />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Created At</Form.Label>
                  <Form.Control plaintext readOnly defaultValue={createdAt} />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Updated At</Form.Label>
                  <Form.Control plaintext readOnly defaultValue={updatedAt} />
                </Form.Group>
              </Form.Row>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default TicketSingle;
