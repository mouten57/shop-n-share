import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import FormFloater from './Floater';

const options = [
  { key: 'ea', text: 'ea', value: 'ea' },
  { key: 'pcs', text: 'pcs', value: 'pcs' },
  { key: 'bag', text: 'bag', value: 'bag' },
  { key: 'bottle', text: 'bottle', value: 'bottle' },
  { key: 'box', text: 'box', value: 'box' },
  { key: 'case', text: 'case', value: 'case' },
  { key: 'pack', text: 'pack', value: 'pack' },
  { key: 'jar', text: 'jar', value: 'jar' },
  { key: 'can', text: 'can', value: 'can' },
  { key: 'bunch', text: 'bunch', value: 'bunch' },
  { key: 'roll', text: 'roll', value: 'roll' },
  { key: 'dozen', text: 'dozen', value: 'dozen' },
  { key: 'lbs', text: 'lbs', value: 'lbs' },
  { key: 'gal', text: 'gal', value: 'gal' }
];

class EditItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = (e, { value }) => this.setState({ value });

  render() {
    return (
      <FormFloater>
        <Form>
          <Form.Group widths="equal">
            <Form.Input fluid label="Product" />
            <Form.Input fluid label="How Much" placeholder="1" />
            <Form.Select
              fluid
              label="Unit"
              options={options}
              placeholder="Unit"
            />
          </Form.Group>
          <Form.Group inline>
            <Form.Input fluid label="Price (per item)" />
          </Form.Group>
          <Form.TextArea label="Notes" placeholder="Something noteworthy.." />
          <Form.Group>
            <Form.Field control={Button} color="teal">
              Save
            </Form.Field>
            <Form.Field control={Button} color="teal">
              Delete
            </Form.Field>
            <Form.Field
              control={Button}
              color="teal"
              onClick={this.props.cancelEdit}
            >
              Cancel
            </Form.Field>
          </Form.Group>
        </Form>
      </FormFloater>
    );
  }
}

export default EditItemForm;
