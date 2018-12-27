import React from 'react';
import { Table, Checkbox, Button } from 'semantic-ui-react';

const TableExample = props => (
  <div>
    <Table singleLine unstackable>
      <Table.Header>
        <Table.Row>
          {props.data.Headers.map((header, index) => {
            return <Table.HeaderCell key={index}>{header}</Table.HeaderCell>;
          })}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.data.Items.map((item, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell width={1}>
                <Checkbox />
              </Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.qty}</Table.Cell>
              <Table.Cell>{item.price}</Table.Cell>
              <Table.Cell width={1}>
                <Button
                  size="mini"
                  circular
                  icon="edit outline"
                  floated="right"
                  onClick={props.editHandler}
                />
              </Table.Cell>
              <Table.Cell width={1}>
                <Button
                  size="mini"
                  circular
                  icon="delete"
                  floated="left"
                  value={index}
                  onClick={props.deleteHandler}
                />
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  </div>
);

export default TableExample;
