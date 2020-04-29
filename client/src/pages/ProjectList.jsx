import React, { Component } from 'react';
import { TableView } from '../components/TableView';
import { Button, Modal, Form } from 'react-bootstrap';
import api from '../api';

import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
`;

const Single = styled.div`
  color: #ef9b0f;
  cursor: pointer;
`;

class ShowProject extends Component {
  showProject = (event) => {
    event.preventDefault();

    window.location.href = `/projects/${this.props.id}`;
  };

  render() {
    return <Single onClick={this.showProject}>Show</Single>;
  }
}

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
    console.log('Projet: ' + name + '-' + description);
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
        <Button variant="success" onClick={this.handleShow}>
          Create new project
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
        Header: 'Name',
        accessor: 'name',
        filterable: true,
      },
      {
        Header: 'Description',
        accessor: 'description',
        filterable: true,
      },
      {
        Header: 'Show',
        accessor: '_id',
        Cell: function (props) {
          return (
            <span>
              <ShowProject id={props.cell.value} />
            </span>
          );
        },
      },
    ];

    let showTable = true;
    if (!projects.length) {
      showTable = false;
    }

    return (
      <Wrapper>
        <h1>Projects</h1>
        {showTable && <TableView columns={columns} data={projects} />}
        <ProjectModal />
      </Wrapper>
    );
  }
}

export default ProjectList;
