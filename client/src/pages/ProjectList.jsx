import React, { Component } from 'react';
import TableView from '../components/TableView';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import api from '../api';

class ProjectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
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

  handleChangeInputName = async (event) => {
    const name = event.target.value;
    this.setState({ name: name });
  };

  handleChangeInputDescription = async (event) => {
    const description = event.target.value;
    this.setState({ description: description });
  };

  handleCreateProject = async () => {
    const { name, description } = this.state;
    const payload = { name, description };

    await api.insertProject(payload).then((res) => {
      window.alert(`Project inserted successfully`);
      this.setState({
        name: '',
        description: '',
        show: false,
      });
    });
  };

  render() {
    return (
      <React.Fragment>
        <Button variant="primary" onClick={this.handleShow}>
          Create
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={this.name}
                  onChange={this.handleChangeInputName}
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
            <Button variant="primary" onClick={this.handleCreateProject}>
              Create project
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      columns: [],
    };
  }

  componentDidMount = async () => {
    await api.getAllProjects().then((projects) => {
      this.setState({
        projects: projects.data.data,
      });
    });
  };

  render() {
    const { projects } = this.state;

    const columns = [
      {
        name: 'Name',
        selector: 'name',
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

    const goToProject = (row) =>
      (window.location.href = '/projects/' + row._id);

    let showTable = true;
    if (!projects.length) {
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
                          <h2>Projects</h2>
                          <p>Welcome to your projects.</p>
                        </div>
                      </div>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={3}>
                      <div className="breadcomb-report">
                        <ProjectModal />
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
            title="Projects"
            columns={columns}
            data={projects}
            onRowClicked={goToProject}
          />
        )}
      </React.Fragment>
    );
  }
}

export default ProjectList;
