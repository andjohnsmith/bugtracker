import React, { Component } from 'react';
import TableView from '../components/TableView';
import { Container, Row, Col } from 'react-bootstrap';
import api from '../api';

class TicketsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: [],
      columns: [],
    };
  }

  componentDidMount = async () => {
    await api.getAllTickets().then((tickets) => {
      this.setState({
        tickets: tickets.data.data,
      });
    });
  };

  render() {
    const { tickets } = this.state;

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
                          <h2>Tickets</h2>
                          <p>Welcome to your tickets.</p>
                        </div>
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

export default TicketsList;
