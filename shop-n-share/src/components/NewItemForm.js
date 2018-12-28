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

class NewItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = (e, { value }) => {
    this.setState({ value });
    console.log(this.state);
  };
  click = e => {
    console.log('click');
  };

  render() {
    const { product, qty, unit } = this.state;
    return (
      <FormFloater>
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Product"
              name="Product"
              value={product}
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              label="How Much"
              placeholder="1"
              name="How Much"
              value={qty}
              onChange={this.handleChange}
            />
            <Form.Select
              fluid
              label="Unit"
              options={options}
              placeholder="Unit"
              name="Unit"
              value={unit}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group inline>
            <Form.Input
              fluid
              label="Price (per item)"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.TextArea
            label="Notes"
            placeholder="Something noteworthy.."
            onChange={this.handleChange}
          />
          <Form.Field control={Button} onClick={this.click} primary>
            Add to List
          </Form.Field>
        </Form>
      </FormFloater>
    );
  }
}

export default NewItemForm;
