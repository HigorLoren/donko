import React, { Component } from "react";
import Cards from "../../components/Cards/Cards";

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
    // prettier-ignore
    let cardsFromBoard = [
      { id: 0, name: "Backlog", dashColor: "#f1c96f", notes: ["item 1", "item 2", "item 3"].map((text, id) => ({ id, text })) },
      { id: 1, name: "To Do", dashColor: "#f76e6e", notes: ["item 1", "item 2", "item 3"].map((text, id) => ({ id, text })) },
      { id: 2, name: "Doing", dashColor: "#8086ca", notes: ["item 1", "item 2", "item 3"].map((text, id) => ({ id, text })) },
      { id: 3, name: "Done", dashColor: "#72f1b7", notes: ["item 1", "item 2", "item 3"].map((text, id) => ({ id, text })) }
    ];
    // --END--

    this.setState({
      openBoard: {
        id: 1,
        name: "teste",
        cards: cardsFromBoard
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        {/* <Header /> */}
        <div className="flex" style={{ minHeight: "calc(100vh - 132px" }}>
          {/* <SidebarMenu /> */}
          <div className="fl pa4 w-100 items-start flex">
            {this.state.openBoard.cards.length > 0 ? (
              <Cards cards={this.state.openBoard.cards} />
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
