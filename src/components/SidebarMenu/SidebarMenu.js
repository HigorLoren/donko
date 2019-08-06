import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import boardIcon from '../../assets/board.svg';
import FloatMenu from '../UI/FloatMenu/FloatMenu';
import classes from './SidebarMenu.module.css';

const SidebarMenu = props => {
  const [showFloatMenu, changeShowFloatMenu] = useState(false);

  return (
    <div className={`${classes.SidebarMenu} ph0 fl flex flex-wrap flex-column`}>
      {props.boards.map(board => {
        return (
          <button
            key={board.id}
            type="button"
            onClick={() => props.boardClicked(board)}
            className={`${classes.BoardOption} tc w-100 ${
              props.boardSelected === board.id ? classes.BoardOptionSelected : 'pointer'
            }`}
          >
            <img src={boardIcon} alt="board Icon" className={classes.BoardIcon} />
            <p className="mb0 mt1 f7 fw7 mid-gray">{board.name}</p>
          </button>
        );
      })}
      <div className={`${classes.AddBoardOption} tc w-100 relative`}>
        <button className="pointer bg-black-03 ph3 pv2 br2" type="button" onClick={props.newBoard}>
          <FontAwesomeIcon icon="plus" size="lg" className="black-10" />
        </button>
      </div>
      <div
        className={`${classes.SettingsMenuOption} tc w-100 relative`}
        style={{ marginTop: 'auto' }}
      >
        <button
          className="pointer"
          type="button"
          onClick={() => changeShowFloatMenu(prevState => !prevState)}
        >
          <FontAwesomeIcon icon="cog" size="2x" className="light-silver" />
        </button>
        {showFloatMenu ? (
          <FloatMenu
            customStyle={{ left: '40%', right: 'auto', top: 'auto', bottom: '80%' }}
            buttons={[
              {
                // eslint-disable-next-line react/prop-types
                onClickFunction: () => props.history.push('/settings'),
                icon: '',
                text: 'Settings'
              }
            ]}
            deleteMe={() => changeShowFloatMenu(false)}
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

export default withRouter(SidebarMenu);
