import jsonServer from '../apis/jsonServer';

export const fetchUser = (email) => async (dispatch) => {
  const { data } = await jsonServer.get(`/authentification?email=${email}`);
  dispatch({
    type: 'FETCH_USER',
    payload: data,
  });
  return data;
};

export const fetchAllUsers = () => async (dispatch) => {
  const { data } = await jsonServer.get(`/authentification`);
  dispatch({
    type: 'FETCH_ALL_USERS',
    payload: data,
  });
};

export const fetchUserTodos = (userid) => async (dispatch) => {
  const { data } = await jsonServer.get(`/todos?userId=${userid}`);
  dispatch({
    type: 'FETCH_USER_TODOS',
    payload: data,
  });
};

export const postTodo = (data) => async (dispatch) => {
  await jsonServer.post(`/todos`, data).then(function (response) {
    dispatch({
      type: 'POST_TODO',
      payload: { ...data, id: response.data.id },
    });
  });
};

export const updateTodo = (id, data) => async (dispatch, getState) => {
  jsonServer.patch(`/todos/${id}`, data).then(function (response) {
    const state = getState();
    const newTodos = state.todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = data.completed;
      }
      return todo;
    });

    dispatch({
      type: 'UPDATE_TODO',
      payload: newTodos,
    });
  });
};

export const deleteTodo = (id) => async (dispatch) => {
  const { data } = await jsonServer.get(`/todos/:${id}`);
  dispatch({
    type: 'DELETE_TODO',
    payload: data,
  });
};

export const setSortedTodos = (sortedTodos) => ({
  type: 'SET_SORTED_TODOS',
  payload: sortedTodos,
});
