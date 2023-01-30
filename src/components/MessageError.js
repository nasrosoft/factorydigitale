import React from 'react';
import { Message } from 'semantic-ui-react';

const styling = {
  marginTop: 'auto',
};
const MessageError = () => (
  <Message negative style={styling}>
    <Message.Header>Title is required!!</Message.Header>
    <p>you must fill in the title</p>
  </Message>
);

export default MessageError;
