import React from 'react';
import { Button } from 'semantic-ui-react';

const NewItemButton = props => (
  <Button
    content={props.buttonName}
    floated="right"
    color="teal"
    onClick={props.onButtonClick}
    size="tiny"
    style={{ marginRight: '5px', padding: '10px' }}
  />
);

export default NewItemButton;
