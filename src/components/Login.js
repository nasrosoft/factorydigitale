import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../actions';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Icon,
  Segment,
} from 'semantic-ui-react';
let userAth = '';
// const user = { id: 1, email: 'user1@gmail.com' };
const Login = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [msg, setMgs] = useState('');
  const [error, setError] = useState('Enter your email to Login');
  userAth = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    if (userAth != null) {
      if (userAth.length != 0) {
        navigate('/');
      }
    }
  }, [userAth]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(fetchUser(email));
    if (response.length > 0) {
      localStorage.setItem('user', JSON.stringify(response[0]));
      navigate('/');
    } else {
      setMgs('Wrong email!');
      setError(`We're sorry we can't let you login`);
    }
  };

  return (
    <Grid
      textAlign="center"
      style={{ height: '100vh', background: '#f6f6f6' }}
      verticalAlign="middle"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Icon name="calendar check" /> Your Todos
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Message negative>
              <Message.Header>{error}</Message.Header>
              <p>{msg}</p>
            </Message>
            <Button color="teal" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
        {/*
    <Message>
      New to us? <a href="#">Sign Up</a>
    </Message>
    */}
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, { fetchUser })(Login);
