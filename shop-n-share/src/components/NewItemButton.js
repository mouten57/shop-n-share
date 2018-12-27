import React from 'react';
import { Button } from 'semantic-ui-react';

const NewItemButton = props => (
  <Button
    content={props.buttonName}
    floated="right"
    color="teal"
    style={{ marginBottom: '5px', width: '110px' }}
    onClick={props.onButtonClick}
  />
);

export default NewItemButton;
