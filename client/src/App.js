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
import { subscribeToTimer } from './components/socket';
import axios from 'axios';
import PurchasedItems from './components/PurchasedItems';

const headerData = ['', 'Total', 'Quantity', 'Price', '', ''];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonName: 'New Item',
      newItem: false,
      headerData,
      unpurchasedItems: null,
      purchasedItems: null,
      editItem: false,
      editData: null
    };
    subscribeToTimer((err, itemdata) => {
      this.setState({
        itemdata: itemdata.unpurchased,
        purchasedItems: itemdata.purchased
      });
    });
  }
  async componentDidMount() {
    await this.props.fetchUser();
    const res = await axios.get(`/api/items`);
    await this.setState({
      unpurchasedItems: res.data.unpurchased,
      purchasedItems: res.data.purchased
    });
  }

  onSubmitNewItem = async formFields => {
    const res = await axios.post('/api/items/create', formFields);

    let joined = [...this.state.unpurchasedItems, res.data];
    this.setState({
      unpurchasedItems: joined,
      newItem: false,
      buttonName: 'New Item'
    });
  };
  updateItem = async newItem => {
    await axios.post(`/api/items/${newItem._id}/update`, newItem);

    let unpurchasedItems = [...this.state.unpurchasedItems];
    const index = this.state.unpurchasedItems.findIndex(
      item => item._id === newItem._id
    );
    unpurchasedItems[index] = newItem;
    this.setState({ editItem: false, unpurchasedItems });
  };

  onNewItemClick = e => {
    const newName = !this.state.newItem ? 'Done' : 'New Item';
    this.setState({ buttonName: newName, newItem: !this.state.newItem });
  };
  editItemHandler = async id => {
    const res = await axios.get(`/api/items/${id}/edit`);
    this.setState({ editItem: !this.state.editItem, editData: res.data });
  };
  deleteItemHandler = id => {
    axios.post(`/api/items/${id}/destroy`);
    const data = this.state.unpurchasedItems.filter(i => i._id !== id);
    this.setState({ unpurchasedItems: data, editItem: false });
  };
  markPurchased = async id => {
    await axios.post(`/api/items/${id}/purchase`);
  };

  render() {
    return (
      <Container style={{ marginTop: '10px' }}>
        <NameDisplay />
        <Header
          onNewItemClick={this.onNewItemClick}
          newItemName={this.state.buttonName}
        />

        <NewItemForm
          show={this.state.newItem}
          submitItem={this.onSubmitNewItem}
        />

        {this.state.editItem ? (
          <Modal open={this.state.editItem} header="Edit">
            <EditItemForm
              editData={this.state.editData}
              editItem={this.state.editItem}
              updateItem={this.updateItem}
              deleteItem={this.deleteItemHandler}
              cancelEdit={e =>
                this.setState({
                  editItem: !this.state.editItem
                })
              }
            />
          </Modal>
        ) : null}

        <div>
          <ShoppingTable
            onButtonClick={this.onNewItemClick}
            buttonName={this.state.buttonName}
            headerdata={this.state.headerData}
            unpurchasedItems={this.state.unpurchasedItems}
            editHandler={this.editItemHandler}
            deleteHandler={this.deleteItemHandler}
            markPurchased={this.markPurchased}
          />
          <PurchasedItems
            purchasedItems={this.state.purchasedItems}
            markPurchased={this.markPurchased}
          />
        </div>
      </Container>
    );
  }
}
export default connect(
  null,
  actions
)(App);
