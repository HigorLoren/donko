import React, { PureComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Notes from "./Notes/Notes";
import "./Card.css";

export default class Card extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cardName: this.props.cardName,
      dashColor: this.props.dashColor,
      todo: "",
      notes: this.props.notes
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  // Notes Handlers
  //

  handleAddNote = event => {
    event.preventDefault();
    // BACKENDPLACEHOLDER:
    let updatedNotes = [
      ...this.state.notes,
      { id: this.state.notes.length + 1, text: this.state.todo || "-" }
    ];
    // --END--
    this.setState(prevState => ({
      notes: updatedNotes,
      todo: ""
    }));
  };

  handleDeleteNote = event => {
    event.preventDefault();
    // BACKENDPLACEHOLDER:
    let updatedNotes = this.state.notes.filter(
      item => item.id !== +event.currentTarget.getAttribute("data-id")
    );
    //  --END--
    this.setState({ notes: updatedNotes });
  };

  render() {
    return (
      <div className="w-25 mh3 br3 shadow-6 bg-content relative">
        <div className="dash-gradient-card" style={{ background: this.state.dashColor }} />
        <div className="ph3">
          <div className="flex mt3 mb4 justify-between items-center relative">
            <h5 className="f4 gray ma0 fw5">{this.state.cardName}</h5>
            <button className="button-reset pointer gray hover-mid-gray textshadow-1">
              <FontAwesomeIcon icon="ellipsis-v" className="" />
            </button>
          </div>
          <div className="w-100 mb2">
            <Notes
              notesArray={this.state.notes}
              deleteNote={event => this.handleDeleteNote(event)}
            />
          </div>
          <form onSubmit={this.handleAddNote} autoComplete="off" className="w-100 mb2">
            <div className="flex mt-4 mb-1">
              <input
                type="text"
                className="w-90 br2 pv1 pl3 bn shadow-6 lh-copy f6"
                id="todoField"
                placeholder="new item"
                name="todo"
                value={this.state.todo}
                onChange={this.handleChange}
              />
              <button
                onClick={this.handleAddNote}
                className="lh-copy w2-5 pointer ba br2 shadow-6 bg-moon-gray white ml1 b--light-gray dim"
                type="button"
              >
                <FontAwesomeIcon icon="plus" className="" style={{ width: ".575em" }} />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
