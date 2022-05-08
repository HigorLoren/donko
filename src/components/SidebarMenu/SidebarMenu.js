import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import boardIcon from '../../assets/board.svg';
import FloatMenu from '../UI/FloatMenu/FloatMenu';
import classes from './SidebarMenu.module.css';
import ClickedOutside from '../../hoc/ClickedOutside';

const SidebarMenu = props => {
  const [showFloatMenuConfig, changeShowFloatMenuConfig] = useState(false);
  const [showFloatMenuBoard, changeShowFloatMenuBoard] = useState(false);
  const navigate = useNavigate();

  const floatMenuBoard = showFloatMenuBoard ? (
    <FloatMenu
      customStyle={{ left: '40%', right: 'auto', top: 'auto', bottom: '80%' }}
      buttons={[
        {
          // eslint-disable-next-line react/prop-types
          onClickFunction: () => null,
          icon: '',
          text: 'Delete Board'
        }
      ]}
      deleteMe={() => changeShowFloatMenuBoard(false)}
    />
  ) : null;

  let showDelete = false;

  const handleMouseLeaveBoardOption = (event, board) => {
    if (showDelete === true) {
      showDelete = false;
      console.log(`Leave  id: ${Math.round(Math.random() * 100)}`);
    }
  };

  const handleMouseUpBoardOption = (event, board) => {
    event.preventDefault();

    if (showDelete) {
      props.boardClicked(board);
    }
    showDelete = false;
  };

  const handleMouseDownBoardOption = (event, board) => {
    showDelete = true;

    document.getElementById(`boardOption_${board.id}`).addEventListener('mouseleave', () => {
      showDelete = false;
    });

    setTimeout(() => {
      if (showDelete === true) {
        document.getElementById(`boardOption_${board.id}`).style.left = 0;
        showDelete = false;
      }
    }, 500);
  };

  return (
    <div className={`${classes.SidebarMenu} ph0 fl flex flex-wrap flex-column`}>
      {props.boards.map(board => {
        return (
          <div key={`boardOption_${board.id}`} className={`${classes.BoardOption} noselect`}>
            <button
              key={board.id}
              type="button"
              onMouseUp={e => handleMouseUpBoardOption(e, board)}
              onTouchStart={e => handleMouseDownBoardOption(e, board)}
              onTouchEnd={e => handleMouseUpBoardOption(e, board)}
              onMouseDown={e => handleMouseDownBoardOption(e, board)}
              onMouseLeave={e => handleMouseLeaveBoardOption(e, board)}
              className={`tc w-100 ${classes.BoardOptionButton} ${
                props.boardSelected === board.id ? classes.BoardOptionSelected : 'pointer'
              }`}
            >
              <img src={boardIcon} alt="board Icon" className={classes.BoardIcon} />
              <p className="mb0 mt1 f7 fw7 mid-gray">{board.name}</p>
            </button>
            <ClickedOutside
              onClickedOutside={() => {
                document.getElementById(`boardOption_${board.id}`).style.left = '100%';
              }}
            >
              <button
                type="button"
                id={`boardOption_${board.id}`}
                className={`${classes.DeleteBoardButton} pointer`}
                onClick={() => props.handleDeleteBoard(board)}
              >
                <FontAwesomeIcon icon="trash-alt" className="white f3" />
              </button>
            </ClickedOutside>
          </div>
        );
      })}
      {floatMenuBoard}
      <div className={`${classes.AddBoardOption} tc w-100 relative`}>
        <button className="pointer bg-black-07 ph3 pv2 br2" type="button" onClick={props.newBoard}>
          <FontAwesomeIcon icon="plus" size="lg" className="black-20" />
        </button>
      </div>
      <div
        className={`${classes.SettingsMenuOption} tc w-100 relative`}
        style={{ marginTop: 'auto' }}
      >
        <button
          className="pointer"
          type="button"
          onClick={() => changeShowFloatMenuConfig(prevState => !prevState)}
        >
          <FontAwesomeIcon icon="cog" size="2x" className="light-silver" />
        </button>
        {showFloatMenuConfig ? (
          <FloatMenu
            customStyle={{ left: '40%', right: 'auto', top: 'auto', bottom: '80%' }}
            buttons={[
              {
                // eslint-disable-next-line react/prop-types
                onClickFunction: () => navigate('/settings'),
                icon: '',
                text: 'Settings'
              }
            ]}
            deleteMe={() => changeShowFloatMenuConfig(false)}
          />
        ) : null}
      </div>
    </div>
  );
};

SidebarMenu.propTypes = {
  newBoard: PropTypes.func,
  boards: PropTypes.arrayOf(PropTypes.object).isRequired,
  boardClicked: PropTypes.func,
  boardSelected: PropTypes.number
};

SidebarMenu.defaultProps = {
  boardClicked: () => null,
  newBoard: () => null,
  boardSelected: null
};

export default SidebarMenu;
