import React, { Component } from "react";
import { createPortal } from "react-dom";
import Header from "../../components/Header/Header";
import SidebarMenu from "../../components/SidebarMenu/SidebarMenu";
import Modal from "../../components/Modal/Modal";
import Board from "../../components/Board/Board";

let user = Object.assign({
  name: null,
  image: null
});

export default class Workbench extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newBoardModalShow: false,
      boards: [],
      openedBoard: Object.assign({
        id: null,
        name: "",
        cards: []
      })
    };
  }

  componentDidMount() {
    // BACKENDPLACEHOLDER:
    // prettier-ignore
    let loadedBoards = [{id: 123,name: "Board 1"},{id: 123123,name: "Board 2"},{id: 2311,name: "Board 3"}];

    user = this.props.user;
    // --END--

    this.setState({ boards: loadedBoards });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSidebarItemChange = boardToChange => {
    // BACKENDPLACEHOLDER:
    // prettier-ignore
    let cardsFromBoard = [
      { id: 0, name: "Backlog", dashColor: "#f1c96f", notes: ["item 1", "item 2", "item 3"].map((text, id) => ({ id, text })) },
      { id: 1, name: "To Do", dashColor: "#f76e6e", notes: ["item 1", "item 2", "item 3"].map((text, id) => ({ id, text })) },
      { id: 2, name: "Doing", dashColor: "#8086ca", notes: ["item 1", "item 2", "item 3"].map((text, id) => ({ id, text })) },
      { id: 3, name: "Done", dashColor: "#72f1b7", notes: ["item 1", "item 2", "item 3"].map((text, id) => ({ id, text })) }
    ];
    // --END--

    document.title = boardToChange.name + " - Donko Board";

    this.setState({
      openedBoard: {
        id: boardToChange.id,
        name: boardToChange.name,
        cards: cardsFromBoard
      }
    });
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

    this.setState({ boards: updatedBoards, newBoardModalShow: false });
    this.handleSidebarItemChange(newBoard);
  };

  // Handle Cards
  handleNewCard = newCard => {
    // BACKENDPLACEHOLDER:
    let maxCardId = 0;
    this.state.openedBoard.cards.forEach(card => {
      if (card.id > maxCardId) maxCardId = card.id;
    });
    let updatedCards = [
      ...this.state.openedBoard.cards,
      {
        id: maxCardId + 1,
        name: newCard.name,
        dashColor: newCard.dashColor,
        notes: []
      }
    ];
    // --END--

    this.setState(prevState => ({
      openedBoard: {
        ...prevState.openedBoard,
        cards: updatedCards
      }
    }));
  };

  handleDeleteCard = cardToDelete => {
    // BACKENDPLACEHOLDER:
    let updatedCards = this.state.openedBoard.cards.filter(card => card.id !== cardToDelete.id);
    // --END--

    this.setState(prevState => ({
      openedBoard: {
        ...prevState.openedBoard,
        cards: updatedCards
      }
    }));
  };
  // End Handle CARDS

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
        <Header user={user} boardsToSearch={this.state.boards} />
        <div className="flex" style={{ minHeight: "calc(100vh - 132px)", overflow: "auto" }}>
          <SidebarMenu
            boardClicked={this.handleSidebarItemChange.bind(this)}
            boardSelected={this.state.openedBoard.id}
            boards={this.state.boards}
            newBoard={() => this.setState({ newBoardModalShow: true })}
          />
          <Board
            cards={this.state.openedBoard.cards}
            handleDeleteCard={this.handleDeleteCard}
            handleNewCard={this.handleNewCard}
          />
        </div>
      </React.Fragment>
    );
  }
}
