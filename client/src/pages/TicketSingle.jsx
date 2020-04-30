import React, { Component } from 'react';
import api from '../api';

class TicketSingle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      title: '',
      description: '',
    };
  }

  handleChangeInputTitle = async (event) => {
    const title = event.target.value;
    this.setState({ title });
  };

  handleChangeInputDescription = async (event) => {
    const description = event.target.value;
    this.setState({ description });
  };

  handleUpdateTicket = async () => {
    const { id, title, description } = this.state;
    const payload = { title, description };

    await api.updateTicketById(id, payload).then((res) => {
      window.alert(`Ticket updated successfully`);
      this.setState({
        title: '',
        description: '',
      });
    });
  };

  componentDidMount = async () => {
    const { id } = this.state;
    const ticket = await api.getTicketById(id);

    this.setState({
      title: ticket.data.data.title,
      description: ticket.data.data.description,
    });
  };

  render() {
    const { title, description } = this.state;
    return (
      <React.Fragment>
        <h1>{title}</h1>
        <p>{description}</p>
      </React.Fragment>
    );
  }
}

export default TicketSingle;
