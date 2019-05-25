import React, { Component } from "react";
import Header from "../../components/Header/Header";
import SidebarMenu from "../../components/SidebarMenu/SidebarMenu";
import Cards from "../../components/Cards/Cards";

let user = {
  name: "",
  image: ""
};

export default class Workbench extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [],
      openBoard: {
        id: null,
        name: "",
        cards: []
      }
    };
  }

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

  handleDeleteCard = cardToDelete => {
    // BACKENDPLACEHOLDER:
    let updatedCards = this.state.openBoard.cards.filter(card => card.id !== cardToDelete.id);
    // --END--

    this.setState({ openBoard: { cards: updatedCards } });
  };

  render() {
    return (
      <React.Fragment>
        <Header user={user} />
        <div className="flex" style={{ minHeight: "calc(100vh - 132px)", overflow: "auto" }}>
          <SidebarMenu
            boardClicked={this.handleSidebarItemChange.bind(this)}
            boardSelected={this.state.openBoard.id}
            boards={this.state.boards}
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
