import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TwitterPicker } from 'react-color';
import Modal from '../../Modal/Modal';
import FloatMenu from '../../UI/FloatMenu/FloatMenu';
import Notes from './Notes/Notes';
import classes from './Card.module.css';

const colorsPicker = [
  '#f1c96f',
  '#f76e6e',
  '#8086ca',
  '#72f1b7',
  '#000000',
  '#FF6900',
  '#FCB900',
  '#7BDCB5',
  '#00D084',
  '#8ED1FC',
  '#0693E3',
  '#ABB8C3',
  '#EB144C',
  '#F78DA7',
  '#9900EF'
];

export default class Card extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cardName: this.props.cardName,
      dashColor: this.props.dashColor,
      dashNewColor: this.props.dashColor,
      dashColorChangePickerShow: false,
      renameCardModalShow: false,
      deleteCardModalShow: false,
      showFloatMenu: false,
      todo: '',
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
    const updatedNotes = [
      ...this.state.notes,
      {
        id: Math.random()
          .toString(36)
          .substr(2, 6),
        text: this.state.todo
      }
    ];
    // --END--
    this.setState(prevState => ({
      notes: updatedNotes,
      todo: ''
    }));
  };

  handleDeleteNote = idNoteToDelete => {
    // BACKENDPLACEHOLDER:
    // eslint-disable-next-line react/no-access-state-in-setstate
    const updatedNotes = this.state.notes.filter(note => note.id !== idNoteToDelete);
    //  --END--
    this.setState({ notes: updatedNotes });
  };

  // Cards Handlers
  //

  handleCardRename = event => {
    event.preventDefault();
    // BACKENDPLACEHOLDER:
    // eslint-disable-next-line react/no-access-state-in-setstate
    const updatedCardName = this.state.inputRenameCard || '.';
    // --END--
    this.setState({ cardName: updatedCardName, renameCardModalShow: false });
  };

  handleCardDashColorChange = event => {
    // BACKENDPLACEHOLDER:
    // eslint-disable-next-line react/no-access-state-in-setstate
    const updatedDashColor = this.state.dashNewColor;
    // --END--
    this.setState({ dashColor: updatedDashColor, dashColorChangePickerShow: false });
  };

  render() {
    return (
      <div className={`${classes.Card} mh3 br3 shadow-6 relative`}>
        {this.state.dashColorChangePickerShow ? (
          <React.Fragment>
            <div
              className="fixed bg-black-20 z-2 top-0 right-0 left-0 bottom-0"
              onClick={() => this.setState({ dashColorChangePickerShow: false })}
            />
            <div
              className={classes.DashColorCard}
              style={{ background: this.state.dashNewColor }}
            />
            <div className="absolute mt3 left30 shadow-5 z-3 bg-white br2 flex justify-end flex-wrap">
              <TwitterPicker
                color={this.state.dashNewColor}
                colors={colorsPicker}
                onChange={color => this.setState({ dashNewColor: color.hex })}
                width="100%"
              />
              <button
                className="ba br1 mt2 mr2 mb2 pointer pv1 ph3 b--light-silver dim mid-gray"
                onClick={this.handleCardDashColorChange}
                type="button"
              >
                Salvar
              </button>
            </div>
          </React.Fragment>
        ) : (
          <div className={classes.DashColorCard} style={{ background: this.state.dashColor }} />
        )}
        <div className="ph3">
          <div className="flex mt3 mb3 mb4-m justify-between items-center relative">
            <h5 className="f5 f4-m gray ma0 fw5">{this.state.cardName}</h5>
            <button
              className="button-reset pointer gray hover-mid-gray textshadow-1"
              onClick={() =>
                this.setState(prevState => ({ showFloatMenu: !prevState.showFloatMenu }))
              }
              type="button"
            >
              <FontAwesomeIcon icon="ellipsis-v" className="" />
            </button>
            {this.state.showFloatMenu ? (
              <FloatMenu
                buttons={[
                  {
                    onClickFunction: () => this.setState({ dashColorChangePickerShow: true }),
                    icon: 'palette',
                    text: 'Change dash color'
                  },
                  {
                    onClickFunction: () =>
                      this.setState(prevState => ({
                        inputRenameCard: prevState.cardName,
                        renameCardModalShow: true
                      })),
                    icon: 'pen-square',
                    text: 'Rename Card'
                  },
                  {
                    onClickFunction: () => this.setState({ deleteCardModalShow: true }),
                    icon: 'trash-alt',
                    text: 'Delete Card'
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
                placeholder="New item"
                name="todo"
                value={this.state.todo}
                onChange={this.handleChange}
              />
              <button
                onClick={this.handleAddNote}
                className="lh-copy w2-5 pointer ba br2 shadow-6 bg-moon-gray white ml1 b--light-gray dim"
                type="button"
              >
                <FontAwesomeIcon icon="plus" className="" style={{ width: '.575em' }} />
              </button>
            </div>
          </form>
        </div>

        {this.state.deleteCardModalShow ? (
          <Modal
            title="Delete Card"
            callbackCloseModal={() => this.setState({ deleteCardModalShow: false })}
          >
            <div className="flex justify-center">
              <button
                className="ba br1 mt3 pointer pv2 lh-copy ph3 bg-red b--black-025 dim btn-visible-focus white"
                onClick={this.props.deleteMe}
                autoFocus
                type="button"
              >
                I really want to delete.
              </button>
            </div>
          </Modal>
        ) : null}

        {this.state.renameCardModalShow ? (
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
                value={this.state.inputRenameCard}
                onChange={this.handleChange}
                name="inputRenameCard"
              />
            </form>
          </Modal>
        ) : null}
      </div>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  dashColor: PropTypes.string.isRequired,
  notes: PropTypes.arrayOf(PropTypes.object),
  deleteMe: PropTypes.func.isRequired
};

Card.defaultProps = {
  notes: []
};
