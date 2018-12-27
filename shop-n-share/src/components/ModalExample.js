import React from 'react';
import { Modal } from 'semantic-ui-react';

const ModalExample = props => (
  <Modal open={props.open}>
    <Modal.Header>Edit</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <div>Hello!</div>
        {props.children}
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

export default ModalExample;
