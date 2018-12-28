import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { Container } from 'semantic-ui-react';
import ShoppingTable from './components/ShoppingListTable';
import NewItemForm from './components/NewItemForm';
import Modal from './components/ModalExample';
import EditItemForm from './components/EditItemForm';
import Header from './components/Header';
import NameDisplay from './components/NameDisplay';

const dummyData = {
  Headers: ['', 'Total', 'Quantity', 'Price', '', ''],
  Items: [
    { name: 'Test1', qty: 1, price: '$1.99' },
    { name: 'Test2', qty: 2, price: '$2.99' },
    { name: 'Test3', qty: 3, price: '$3.99' },
    { name: 'Test4', qty: 4, price: '$4.99' }
  ]
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonName: 'New Item',
      newItem: false,
      tabledata: dummyData,
      editItem: false
    };
  }
  componentDidMount() {
    this.props.fetchUser();
  }

  onSubmitNewItem = item => {
    console.log(item);
  };

  onNewItemClick = e => {
    const newName = !this.state.newItem ? 'Done' : 'New Item';
    this.setState({ buttonName: newName, newItem: !this.state.newItem });
  };
  editItemHandler = e => {
    this.setState({ editItem: !this.state.editItem });
  };
  deleteItemHandler = e => {
    var obj = { ...this.state.tabledata }; // make a separate copy of the object
    var array = obj.Items; // make a separate copy of the array
    var i = e.target.value;
    array.splice(i, 1);
    obj.Items = array;
    this.setState({ tabledata: obj });
  };
  render() {
    return (
      <Container style={{ marginTop: '10px' }}>
        <NameDisplay />
        <Header
          onNewItemClick={this.onNewItemClick}
          newItemName={this.state.buttonName}
        />
        {this.state.newItem ? (
          <NewItemForm submitItem={this.onSubmitNewItem} />
        ) : null}
        {this.state.editItem ? (
          <Modal open={this.state.editItem}>
            <EditItemForm
              cancelEdit={e =>
                this.setState({
                  editItem: !this.state.editItem
                })
              }
            />
          </Modal>
        ) : null}

        <ShoppingTable
          onButtonClick={this.onNewItemClick}
          buttonName={this.state.buttonName}
          data={this.state.tabledata}
          editHandler={this.editItemHandler}
          deleteHandler={this.deleteItemHandler}
        />
      </Container>
    );
  }
}
export default connect(
  null,
  actions
)(App);
