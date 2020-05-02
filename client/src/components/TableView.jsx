import React from 'react';
import DataTable from 'react-data-table-component';
import Container from 'react-bootstrap/Container';

function TableView(props) {
  const columns = props.columns;
  const data = props.data;
  const title = props.title;
  const onRowClicked = props.onRowClicked;

  return (
    <Container>
      <div className="data-table-list">
        <DataTable
          title={title}
          data={data}
          columns={columns}
          keyField="_id"
          pagination
          highlightOnHover
          pointerOnHover
          striped
          onRowClicked={onRowClicked}
        />
      </div>
    </Container>
  );
}

export default TableView;
