import { combineReducers } from 'redux';
import todosReducer from './userTodosReducer';
import userReducer from './userReducer';
export default combineReducers({
  user: userReducer,
  todos: todosReducer,
});
