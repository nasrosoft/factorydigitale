import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { postTodo } from '../actions';
import MessageError from './MessageError';
import { Form, Container, Icon, Dimmer, Header } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

let noValidate = '';
const AddTodo = ({ user, todos }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');

  const [description, setDescription] = useState('');

  const [activeDimmer, setActiveDimmer] = useState(false);

  const handleOpen = () => setActiveDimmer(true);
  const handleClose = () => setActiveDimmer(false);

  const [currentDate, setNewDate] = useState('With No end Date!');
  const onChange = (event, data) => {
    setNewDate(data.value.toLocaleDateString('en-GB'));
  };

  const handleTitle = (e, { value }) => {
    setTitle(value);
  };
  const handleDescription = (e, { value }) => {
    setDescription(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.length === 0) {
    } else {
      noValidate = '';
      dispatch(
        postTodo({
          userId: user[0].id,
          title,
          pos: todos.length + 1,
          completed: false,
          endDate: currentDate,
          description,
        })
      );
      handleOpen();
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            className="field required"
            label="Title"
            placeholder="Todo Title"
            name="title"
            value={title}
            onChange={handleTitle}
          />
        </Form.Group>
        {!title ? <MessageError /> : ''}
        <Form.TextArea
          label="Description"
          placeholder="Tell us more about this todo..."
          name="description"
          value={description}
          onChange={handleDescription}
        />
        <SemanticDatepicker
          label="Pick end date"
          onChange={onChange}
          format="YYYY-MM-DD"
          datePickerOnly={true}
          clearable={false}
        />
        <Form.Button disabled={!title ? true : false}>Submit</Form.Button>
        <Dimmer active={activeDimmer} onClickOutside={handleClose} page>
          <Header as="h2" icon inverted>
            <Icon name="calendar alternate outline" />
            Successfully!
            <Header.Subheader>Your todo has been submitted</Header.Subheader>
          </Header>
        </Dimmer>
      </Form>
    </Container>
  );
};

const mapStateToProps = ({ user, todos }) => {
  return {
    user,
    todos,
  };
};
export default connect(mapStateToProps, { postTodo })(AddTodo);
