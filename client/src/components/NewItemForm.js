import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import FormFloater from './Floater';
import FormErrors from './FormErrors';

const options = [
  { key: 'blank', text: '', value: '' },
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
    this.state = {
      formFields: {
        product: '',
        qty: '',
        unit: 'ea',
        price: '',
        notes: ''
      },
      formErrors: {},
      productValid: false,
      qtyValid: false,
      unitValid: false,
      priceValid: false,
      formValid: false
    };
  }
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let { productValid, qtyValid, unitValid, priceValid } = this.state;

    switch (fieldName) {
      case 'product':
        productValid = value.length >= 3;
        fieldValidationErrors.product = productValid ? '' : ' is too short';
        break;
      case 'qty':
        qtyValid = value.length >= 1;
        fieldValidationErrors.qty = qtyValid ? '' : ' is too short';
        break;

      case 'unit':
        unitValid = value.length >= 1;
        fieldValidationErrors.unit = unitValid ? '' : ' is too short';
        break;

      case 'price':
        priceValid = value.length >= 1;
        fieldValidationErrors.price = priceValid ? '' : ' is too short';
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        productValid,
        qtyValid,
        unitValid,
        priceValid
      },
      this.validateForm
    );
  }

  validateForm() {
    let { productValid, qtyValid, unitValid, priceValid } = this.state;

    this.setState({
      formValid: productValid && qtyValid && priceValid && unitValid
    });
  }
  handleSelectChange = e => {
    let formFields = { ...this.state.formFields };
    formFields['unit'] = e.target.value;
    this.setState({ formFields }, this.validateField('unit', e.target.value));
  };
  handleChange = e => {
    let formFields = { ...this.state.formFields };
    formFields[e.target.name] = e.target.value;
    this.setState(
      {
        formFields
      },
      this.validateField(e.target.name, e.target.value)
    );
  };
  onSubmit = item => {
    this.props.submitItem(item);
  };
  displayForm() {
    const { product, qty, price, notes } = this.state;
    switch (this.props.show) {
      case false:
        return null;
      default:
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
                  placeholder="1"
                  name="qty"
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
                    onChange={this.handleSelectChange}
                  >
                    {options.map(unit => {
                      return (
                        <option
                          key={unit.key}
                          name={unit.text}
                          value={unit.text}
                        >
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
              <Form.Group inline />
              <Form.TextArea
                label="Notes"
                name="notes"
                value={notes}
                placeholder="Something noteworthy.."
                onChange={this.handleChange}
              />
              <Form.Field
                control={Button}
                onClick={e => this.onSubmit(this.state.formFields)}
                primary
                disabled={!this.state.formValid}
              >
                Add to List
              </Form.Field>
            </Form>
          </FormFloater>
        );
    }
  }

  render() {
    return (
      <div>
        <FormErrors formErrors={this.state.formErrors} />
        {this.displayForm()}
      </div>
    );
  }
}

export default NewItemForm;
