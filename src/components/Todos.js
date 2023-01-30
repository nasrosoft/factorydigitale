import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { fetchUserTodos, updateTodo, setSortedTodos } from '../actions';

import {
  List,
  Label,
  Icon,
  Checkbox,
  Message,
  Segment,
} from 'semantic-ui-react';

const lineThrough = {
  textDecoration: 'line-through',
};

const Todos = ({ todos }) => {
  let newTodosSorted = JSON.parse(localStorage.getItem('sortedTodos'));
  if (!newTodosSorted || newTodosSorted.length === 0) newTodosSorted = todos;
  const dispatch = useDispatch();

  const onChecked = (checked, todoID) => {
    dispatch(updateTodo(todoID, { completed: checked }));
  };
  const DragHandle = SortableHandle(() => (
    <span
      style={{
        fontSize: 40,
        marginTop: 37,
        marginLeft: -46,
        color: '#e0e1e2',
      }}
    >
      <Icon className="th" />
    </span>
  ));
  const SortableItem = SortableElement(({ todo }) => (
    <li style={{ display: 'flex', marginRight: 10, alignItems: 'center' }}>
      <DragHandle />
      <Message info key={todo.id} id={todo.id} style={{ width: '100%' }}>
        <List animated verticalAlign="middle" key={todos.indexOf(todo)}>
          <List.Item>
            <List.Content floated="right" className="grid">
              <Segment compact className="flex" style={{ display: 'block' }}>
                <Checkbox
                  toggle
                  onChange={(e, { checked }) => onChecked(checked, todo.id)}
                  defaultChecked={todo.completed}
                />
              </Segment>
              <Label size="big" color={todo.completed ? 'teal' : 'red'}>
                {todo.endDate}
              </Label>
            </List.Content>
            <Icon
              name="calendar"
              className={!todo.completed ? 'big red' : 'big check'}
            />
            <List.Content>
              <h3 style={todo.completed ? lineThrough : {}}>{todo.title}</h3>
              <span style={todo.completed ? lineThrough : {}}>
                {todo.description}
              </span>
            </List.Content>
          </List.Item>
        </List>
      </Message>
    </li>
  ));

  const SortableComponenet = SortableContainer(({ children }) => {
    return <ul>{children}</ul>;
  });

  const YourList = ({ newTodosSorted }) =>
    newTodosSorted.map((todo, index) => (
      <SortableItem todo={todo} index={index} key={`item-${index}`} />
    ));
  const onSortEnd = ({ oldIndex, newIndex }) => {
    const sortedTodos = arrayMove(todos, oldIndex, newIndex);
    dispatch(setSortedTodos(sortedTodos));
    // localStorage.setItem('sortedTodos', JSON.stringify(sortedTodos)); No Time to handle This ..
  };
  return (
    <SortableComponenet
      onSortEnd={onSortEnd}
      useDragHandle
      lockAxis="y"
      disableAutoscroll={true}
    >
      <YourList todos={todos} newTodosSorted={newTodosSorted} />
    </SortableComponenet>
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
  updateTodo,
})(Todos);
