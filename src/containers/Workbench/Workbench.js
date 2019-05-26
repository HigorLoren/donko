import React, { Component } from "react";
import { createPortal } from "react-dom";
import Header from "../../components/Header/Header";
import SidebarMenu from "../../components/SidebarMenu/SidebarMenu";
import Cards from "../../components/Cards/Cards";
import Modal from "../../components/Modal/Modal";

let user = {
  name: "",
  image: ""
};

export default class Workbench extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newBoardModalShow: false,
      boards: [],
      openBoard: {
        id: null,
        name: "",
        cards: []
      }
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  componentDidMount() {
    // prettier-ignore
    // BACKENDPLACEHOLDER:
    this.setState({boards: [{id: "0",name: "Board 1"},{id: "1",name: "Board 2"},{id: "2",name: "Board 3"}]});
    user = {
      name: "Higor Lorenzon",
      image: "https://api.adorable.io/avatars/40/abott@adorable.png"
    };
    // --END--
  }

  handleSidebarItemChange = board => {
    // BACKENDPLACEHOLDER:
    // prettier-ignore
    let cardsFromBoard = [
      { id: 0, name: "Backlog", dashColor: "#f1c96f", notes: ["item 1", "item 2", "item 3"].map((text, id) => ({ id, text })) },
      { id: 1, name: "To Do", dashColor: "#f76e6e", notes: ["item 1", "item 2", "item 3"].map((text, id) => ({ id, text })) },
      { id: 2, name: "Doing", dashColor: "#8086ca", notes: ["item 1", "item 2", "item 3"].map((text, id) => ({ id, text })) },
      { id: 3, name: "Done", dashColor: "#72f1b7", notes: ["item 1", "item 2", "item 3"].map((text, id) => ({ id, text })) }
    ];
    // --END--

    document.title = board.name + " - Donko Board";
    this.setState({
      openBoard: {
        id: board.id,
        name: board.name,
        cards: cardsFromBoard
      }
    });
  };

  //
  // Handler Cards

  handleDeleteCard = cardToDelete => {
    // BACKENDPLACEHOLDER:
    let updatedCards = this.state.openBoard.cards.filter(card => card.id !== cardToDelete.id);
    // --END--

    this.setState({ openBoard: { cards: updatedCards } });
  };

  handleNewBoard = event => {
    event.preventDefault();
    // BACKENDPLACEHOLDER:
    let maxBoardId = 0;
    this.state.boards.forEach(board => {
      if (board.id > maxBoardId) maxBoardId = board.id;
    });

    let newBoard = { id: maxBoardId + 1, name: this.state.inputNewBoardName };
    let updatedBoards = [...this.state.boards, newBoard];
    // --END--
    console.log("TCL: updatedBoards", updatedBoards);

    this.setState({ boards: updatedBoards, newBoardModalShow: false });
    this.handleSidebarItemChange(newBoard);
  };

  render() {
    let modal = null;

    if (this.state.newBoardModalShow) {
      modal = createPortal(
        <Modal
          title="New Board"
          callbackCloseModal={() => this.setState({ newBoardModalShow: false })}
          footer={
            <button
              className="ba br1 mt3 pointer pv1 ph3 b--light-silver dim mid-gray"
              onClick={this.handleNewBoard}
              type="button"
            >
              Salvar
            </button>
          }
        >
          <form onSubmit={this.handleNewBoard}>
            <input
              type="text"
              autoFocus
              className="w-100 br2 ba pv1 b--light-gray pl2 lh-copy"
              id="inputNewBoardName"
              placeholder="New board name"
              onChange={this.handleChange}
              name="inputNewBoardName"
            />
          </form>
        </Modal>,
        document.body
      );
    }

    return (
      <React.Fragment>
        {modal}
        <Header user={user} />
        <div className="flex" style={{ minHeight: "calc(100vh - 132px)", overflow: "auto" }}>
          <SidebarMenu
            boardClicked={this.handleSidebarItemChange.bind(this)}
            boardSelected={this.state.openBoard.id}
            boards={this.state.boards}
            newBoard={() => this.setState({ newBoardModalShow: true })}
          />
          <div className="fl pa4 w-100 items-start flex">
            {this.state.openBoard.cards.length > 0 ? (
              <Cards cards={this.state.openBoard.cards} deleteCard={this.handleDeleteCard} />
            ) : (
              <p className="fw1 f3 h100 flex items-center center light-silver">
                Select a board to start.
              </p>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
