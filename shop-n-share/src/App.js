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
import axios from 'axios';

const headerData = ['', 'Total', 'Quantity', 'Price', '', ''];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonName: 'New Item',
      newItem: false,
      headerData,
      itemdata: null,
      editItem: false,
      editData: null
    };
  }
  async componentDidMount() {
    this.props.fetchUser();
    const res = await axios.get(`/api/items`);
    this.setState({ itemdata: res.data });
  }

  onSubmitNewItem = async formFields => {
    const res = await axios.post('/api/items/create', formFields);
    this.setState({ newItem: false });
    let joined = [...this.state.itemdata, res.data];
    this.setState({ itemdata: joined });
  };
  updateItem = async formFields => {
    await axios.post(`/api/items/${formFields._id}/update`, formFields);
    this.setState({ editItem: false });
    let newItem = formFields;
    const data = this.state.itemdata.filter(i => i._id !== newItem._id);
    let joined = [...data, newItem];
    this.setState({ itemdata: joined });
  };

  onNewItemClick = e => {
    const newName = !this.state.newItem ? 'Done' : 'New Item';
    this.setState({ buttonName: newName, newItem: !this.state.newItem });
  };
  editItemHandler = async id => {
    const res = await axios.get(`/api/items/${id}/edit`);
    this.setState({ editItem: !this.state.editItem, editData: res.data });
  };
  deleteItemHandler = (index, id) => {
    axios.post(`/api/items/${id}/destroy`);
    const data = this.state.itemdata.filter(i => i._id !== id);
    this.setState({ itemdata: data });
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
          <Modal open={this.state.editItem}>
            <EditItemForm
              editData={this.state.editData}
              editItem={this.state.editItem}
              updateItem={this.updateItem}
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
          headerdata={this.state.headerData}
          itemdata={this.state.itemdata}
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
