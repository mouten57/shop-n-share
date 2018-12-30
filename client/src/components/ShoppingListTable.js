import React, { Component } from 'react';
import { Table, Checkbox, Button } from 'semantic-ui-react';

class TableExample extends Component {
  renderTable() {
    switch (this.props.itemdata) {
      case null:
        return;

      default:
        return (
          <Table singleLine unstackable>
            <Table.Header>
              <Table.Row>
                {this.props.headerdata.map((header, index) => {
                  return (
                    <Table.HeaderCell key={index}>{header}</Table.HeaderCell>
                  );
                })}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.itemdata.map((item, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell width={1}>
                      <Checkbox />
                    </Table.Cell>
                    <Table.Cell>{item.product}</Table.Cell>
                    <Table.Cell>{item.qty}</Table.Cell>
                    <Table.Cell>{item.price}</Table.Cell>
                    <Table.Cell width={1}>
                      <Button
                        size="mini"
                        circular
                        icon="edit outline"
                        floated="right"
                        onClick={e => this.props.editHandler(item._id)}
                      />
                    </Table.Cell>
                    <Table.Cell width={1}>
                      <Button
                        size="mini"
                        circular
                        icon="delete"
                        floated="left"
                        value={index}
                        onClick={e => this.props.deleteHandler(item._id)}
                      />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        );
    }
  }
  render() {
    return <div>{this.renderTable()}</div>;
  }
}

export default TableExample;