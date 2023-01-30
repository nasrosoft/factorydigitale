import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddTodo from './AddTodo';
import Todos from './Todos';

import { fetchUserTodos, fetchUser, updateTodo } from '../actions';
import { Divider } from 'semantic-ui-react';

const style = {
  marginTop: '30px',
};
const Home = ({ user, todos }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const saveAuth = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!saveAuth || saveAuth.length === 0) {
      navigate('/login');
      return;
    }
    dispatch(fetchUser(saveAuth.email));
    dispatch(fetchUserTodos(saveAuth.id));
  }, []);

  return (
    <div style={style}>
      <div className="ui container">
        <div className="ui visible message">
          <h4>Enter New Todos</h4>
        </div>
        <AddTodo />
        <Divider className="ui container" />
        <div className="ui container">
          <div className="ui visible message">
            <h4>Your Todos</h4>
          </div>
          <Todos todos={todos} user={user} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    todos: state.todos,
  };
};

export default connect(mapStateToProps, {
  fetchUserTodos,
  fetchUser,
  updateTodo,
})(Home);
