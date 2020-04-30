import React from 'react';
import DataTable from 'react-data-table-component';
import Container from 'react-bootstrap/Container';

function showProject(event) {
  console.log(event._id);
}

function TableView(props) {
  const columns = props.columns;
  const data = props.data;

  return (
    <Container>
      <DataTable
        title="Title"
        data={data}
        columns={columns}
        keyField="_id"
        pagination
        highlightOnHover
        onRowClicked={showProject}
      />
    </Container>
  );
}

export default TableView;
