import React, { Component } from 'react';
import { Table, Checkbox } from 'semantic-ui-react';
import { connect } from 'react-redux';

class PurchasedItems extends Component {
  renderTable() {
    switch (this.props.purchasedItems) {
      case null:
        return;

      default:
        return (
          <div>
            <h2 style={{ marginTop: '10px' }}>Purchased Items</h2>
            <Table singleLine unstackable>
              <Table.Body>
                {this.props.purchasedItems.map((item, index) => {
                  console.log(item)
                  return (
                    <Table.Row key={index}>
                      <Table.Cell width={1}>
                        <Checkbox
                          checked
                          onChange={e => this.props.markPurchased(item)}
                        />
                      </Table.Cell>
                      <Table.Cell>{item.product}</Table.Cell>
                      <Table.Cell>{item.qty}</Table.Cell>
                      <Table.Cell>{item.price}</Table.Cell>
                      {console.log(this.props.auth)}
                      <Table.Cell width={1}>
                        <i>-{item._user.nickname}</i>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </div>
        );
    }
  }
  render() {
    return <div>{this.props.auth ? this.renderTable() : null}</div>;
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(PurchasedItems);
