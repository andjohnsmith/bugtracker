import React, { Component } from 'react';
import { TableView } from '../components/TableView';
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
        {showTable && <TableView columns={columns} data={projects} />}
      </Wrapper>
    );
  }
}

export default ProjectList;
