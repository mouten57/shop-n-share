import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./actions";
import { Container } from "semantic-ui-react";
import ShoppingTable from "./components/ShoppingListTable";
import NewItemForm from "./components/NewItemForm";
import Modal from "./components/ModalExample";
import EditItemForm from "./components/EditItemForm";
import Header from "./components/Header";
import NameDisplay from "./components/NameDisplay";
import axios from "axios";
import PurchasedItems from "./components/PurchasedItems";

import openSocket from "socket.io-client";
const keys = require("./components/socketIOpath");
const socket = openSocket(keys.socketPath);

const headerData = ["", "Total", "Quantity", "Price", "", ""];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonName: "New Item",
      newItem: false,
      headerData,
      fakeAuth: false,
      unpurchasedItems: null,
      purchasedItems: null,
      editItem: false,
      editData: null,
    };
    socket.on("updateItems", async (items) => {
      let purchasedItems = await items.purchased;
      let unpurchasedItems = await items.unpurchased;

      this.setState({ unpurchasedItems, purchasedItems });
    });
  }
  async componentDidMount() {
    this.props.fetchUser();
    const fakeAuth = localStorage.getItem("fakeAuth");

    const res = await axios.get(`/api/items`);
    this.setState({
      unpurchasedItems: res.data.unpurchased,
      purchasedItems: res.data.purchased,
      fakeAuth,
    });
  }

  socketUpdate = () => {
    socket.emit("getItems", () => {});
  };

  onSubmitNewItem = async (formFields) => {
    console.log(formFields);
    const res = await axios.post("/api/items/create", formFields);

    let joined = [...this.state.unpurchasedItems, res.data];
    this.setState({
      unpurchasedItems: joined,
      newItem: false,
      buttonName: "New Item",
    });
    this.socketUpdate();
  };
  updateItem = async (newItem) => {
    await axios.post(`/api/items/${newItem._id}/update`, newItem);

    let unpurchasedItems = [...this.state.unpurchasedItems];
    const index = this.state.unpurchasedItems.findIndex(
      (item) => item._id === newItem._id
    );
    unpurchasedItems[index] = newItem;
    this.setState({ editItem: false, unpurchasedItems });
    this.socketUpdate();
  };

  onNewItemClick = (e) => {
    const newName = !this.state.newItem ? "Done" : "New Item";
    this.setState({ buttonName: newName, newItem: !this.state.newItem });
  };
  editItemHandler = async (id) => {
    const res = await axios.get(`/api/items/${id}/edit`);
    this.setState({ editItem: !this.state.editItem, editData: res.data });
  };
  deleteItemHandler = async (id) => {
    await axios.post(`/api/items/${id}/destroy`);
    const data = this.state.unpurchasedItems.filter((i) => i._id !== id);
    this.setState({ unpurchasedItems: data, editItem: false });
    this.socketUpdate();
  };
  markPurchased = async (item) => {
    //state update to make local changes faster than connected sockets
    switch (item.purchased) {
      case true:
        //purchased to unpurchased
        //cut from purchased
        const filterPurchased = this.state.purchasedItems.filter(
          (i) => i._id !== item._id
        );
        //add to unpurchased
        let data = this.state.unpurchasedItems;
        let newUnpurchased = [...data, item];
        //set state for both
        this.setState({
          unpurchasedItems: newUnpurchased,
          purchasedItems: filterPurchased,
        });
        break;
      default:
        //unpurchased to purchased
        //cut from unpurchased
        const filterUnpurchased = this.state.unpurchasedItems.filter(
          (i) => i._id !== item._id
        );
        //add to purchased
        let data2 = this.state.purchasedItems;
        let newPurchased = [...data2, item];
        //set state for both
        this.setState({
          unpurchasedItems: filterUnpurchased,
          purchasedItems: newPurchased,
        });

        break;
    }
    await axios.post(`/api/items/${item._id}/purchase`);
    await this.socketUpdate();
  };
  onSkipLogin = () => {
    this.setState({ fakeAuth: !this.state.fakeAuth });
    localStorage.setItem("fakeAuth", true);
  };

  render() {
    return (
      <Container style={{ marginTop: "10px" }}>
        <NameDisplay />
        <Header
          fakeAuth={this.state.fakeAuth}
          onNewItemClick={this.onNewItemClick}
          newItemName={this.state.buttonName}
          onSkipLogin={this.onSkipLogin}
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
              cancelEdit={(e) =>
                this.setState({
                  editItem: !this.state.editItem,
                })
              }
            />
          </Modal>
        ) : null}

        <div>
          <ShoppingTable
            onButtonClick={this.onNewItemClick}
            fakeAuth={this.state.fakeAuth}
            onSkipLogin={this.onSkipLogin}
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
