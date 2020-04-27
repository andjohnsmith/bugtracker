import React, { Component } from 'react';
import api from '../api';

import styled from 'styled-components';

const Title = styled.h1.attrs({
  classTitle: 'h1',
})``;

const Wrapper = styled.div.attrs({
  classTitle: 'form-group',
})`
  margin: 0 30px;
`;

const Label = styled.label`
  margin: 5px;
`;

const InputText = styled.input.attrs({
  classTitle: 'form-control',
})`
  margin: 5px;
`;

const Button = styled.button.attrs({
  classTitle: `btn btn-primary`,
})`
  margin: 15px 15px 15px 5px;
`;

const CancelButton = styled.a.attrs({
  classTitle: `btn btn-danger`,
})`
  margin: 15px 15px 15px 5px;
`;

class TicketsUpdate extends Component {
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
      <Wrapper>
        <Title>Update Ticket</Title>

        <Label>Title: </Label>
        <InputText
          type="text"
          value={title}
          onChange={this.handleChangeInputTitle}
        />

        <Label>Description: </Label>
        <InputText
          type="text"
          value={description}
          onChange={this.handleChangeInputDescription}
        />

        <Button onClick={this.handleUpdateTicket}>Update Ticket</Button>
        <CancelButton href={'/tickets/list'}>Cancel</CancelButton>
      </Wrapper>
    );
  }
}

export default TicketsUpdate;
