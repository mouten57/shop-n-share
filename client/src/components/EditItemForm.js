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
    this.state = {
      formFields: {
        product: '',
        qty: '',
        unit: '',
        price: '',
        notes: ''
      }
    };
  }
  componentDidMount() {
    let item = this.props.editData[0];
    this.setState({
      formFields: item
    });
  }

  handleChange = e => {
    let formFields = { ...this.state.formFields };
    formFields[e.target.name] = e.target.value;
    this.setState({
      formFields
    });
  };
  handleSelectChange = e => {
    let formFields = { ...this.state.formFields };
    formFields['unit'] = e.target.value;
    this.setState({ formFields });
  };

  onSubmit = item => {
    this.props.updateItem(item);
  };

  render() {
    const { _id, _user, product, qty, price, notes } =
      this.state.formFields || false;
    return (
      <FormFloater>
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Product"
              name="product"
              value={product}
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              label="How Much"
              name="qty"
              placeholder="1"
              value={qty}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Unit</label>
              <select
                style={{ height: '38px' }}
                value={this.state.unit}
                name="unit"
                onChange={this.handleSelectChange}
              >
                {options.map(unit => {
                  return (
                    <option key={unit.key} name={unit.text} value={unit.text}>
                      {unit.text}
                    </option>
                  );
                })}
              </select>
            </Form.Field>
            <Form.Input
              fluid
              label="Price (per item)"
              name="price"
              value={price}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.TextArea
            label="Notes"
            name="notes"
            placeholder="Something noteworthy.."
            value={notes}
            onChange={this.handleChange}
          />
          <h5 style={{ textAlign: 'center', marginTop: '0px' }}>
            Added to cart by: {_user !== undefined ? _user.name : null}
          </h5>
          <Form.Group inline widths="equal">
            <Form.Field
              control={Button}
              color="teal"
              fluid
              onClick={e => this.onSubmit(this.state.formFields)}
            >
              Save
            </Form.Field>
            <Form.Field
              control={Button}
              color="teal"
              fluid
              onClick={e => this.props.deleteItem(_id)}
            >
              Delete
            </Form.Field>
            <Form.Field
              control={Button}
              color="teal"
              fluid
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
