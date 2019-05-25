import React, { PureComponent } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../../Modal/Modal";
import FloatMenu from "../../UI/FloatMenu/FloatMenu";
import Notes from "./Notes/Notes";
import "./Card.css";

export default class Card extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cardName: this.props.cardName,
      dashColor: this.props.dashColor,
      renameCardModalShow: false,
      deleteCardModalShow: false,
      showFloatMenu: false,
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

  // Cards Handlers
  //

  handleCardRename = event => {
    event.preventDefault();
    // BACKENDPLACEHOLDER:
    let updatedCardName = this.state.inputRenameCard;
    // --END--
    this.setState({ cardName: updatedCardName, renameCardModalShow: false });
  };

  render() {
    let modal = null;

    if (this.state.renameCardModalShow) {
      modal = createPortal(
        <Modal
          title="Rename Card"
          callbackCloseModal={() => this.setState({ renameCardModalShow: false })}
          footer={
            <button
              className="ba br1 mt3 pointer pv1 ph3 b--light-silver dim mid-gray"
              onClick={this.handleCardRename}
              type="button"
            >
              Salvar
            </button>
          }
        >
          <form onSubmit={this.handleCardRename}>
            <input
              type="text"
              autoFocus
              className="w-100 br2 ba pv1 b--light-gray pl2 lh-copy"
              id="inputRenameCard"
              placeholder="New name"
              onChange={this.handleChange}
              name="inputRenameCard"
            />
          </form>
        </Modal>,
        document.body
      );
    }

    if (this.state.deleteCardModalShow) {
      modal = createPortal(
        <Modal
          title="Delete Card"
          callbackCloseModal={() => this.setState({ deleteCardModalShow: false })}
        >
          <div className="flex justify-center">
            <button
              className="ba br1 mt3 pointer pv2 lh-copy ph3 bg-red b--black-025 dim white"
              onClick={this.props.deleteMe}
            >
              I really want to delete.
            </button>
          </div>
        </Modal>,
        document.body
      );
    }

    return (
      <div className="w-25 mh3 br3 shadow-6 bg-content relative">
        <div className="dash-gradient-card" style={{ background: this.state.dashColor }} />
        <div className="ph3">
          <div className="flex mt3 mb4 justify-between items-center relative">
            <h5 className="f4 gray ma0 fw5">{this.state.cardName}</h5>
            <button
              className="button-reset pointer gray hover-mid-gray textshadow-1"
              onClick={() =>
                this.setState(prevState => ({ showFloatMenu: !prevState.showFloatMenu }))
              }
            >
              <FontAwesomeIcon icon="ellipsis-v" className="" />
            </button>
            {this.state.showFloatMenu ? (
              <FloatMenu
                buttons={[
                  {
                    onClickFunction: () => this.setState({ renameCardModalShow: true }),
                    icon: "pen-square",
                    text: "Rename Card"
                  },
                  {
                    onClickFunction: () => this.setState({ deleteCardModalShow: true }),
                    icon: "trash-alt",
                    text: "Delete Card"
                  }
                ]}
                deleteMe={() => this.setState({ showFloatMenu: false })}
              />
            ) : null}
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
        {modal}
      </div>
    );
  }
}
