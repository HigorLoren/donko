import React, { useState } from "react";
import PropTypes from "prop-types";
import ClickedOutside from "../../hoc/ClickedOutside/ClickedOutside";
import searchIcon from "../../assets/search.svg";
import classes from "./SearchBar.module.css";

const SearchBar = props => {
  const [searchInput, setSearchInput] = useState("");
  const [showSearchList, setShowSearchList] = useState(false);
  const [searchResultItems, setSearchResultItems] = useState([]);

  const handleSearch = inputText => {
    // TODO: SEARCH SCRIPT
    let dataToSearch = [];

    dataToSearch.push({
      title: "",
      path: "",
      type: ""
    });

    const inputTextFormatedAndSplited = inputText.toLowerCase().split(" ");

    // Search Script
    dataToSearch = dataToSearch.filter(item => {
      const itemFormated = JSON.stringify(item).toLowerCase();
      let allWordsMatched;

      // Do while returning true
      inputTextFormatedAndSplited.every(word => {
        allWordsMatched = itemFormated.indexOf(word) !== -1;
        return allWordsMatched;
      });

      return allWordsMatched;
    });

    setSearchResultItems(dataToSearch);
  };

  const handleOnChangeSearchInput = ({ target }) => {
    setSearchInput(target.value);
    if (target.value) {
      handleSearch(target.value);
      setShowSearchList(true);
    } else {
      setShowSearchList(false);
      setSearchResultItems([]);
    }
  };

  return (
    <ClickedOutside onClickedOutside={() => setShowSearchList(false)}>
      <div
        className={`${classes.SearchDiv} relative items-center inline-flex w-100 ${
          props.customStyle ? props.customStyle : ""
        }`}
      >
        <img src={searchIcon} alt="Search Icon" className={`${classes.SearchIcon} absolute z-3`} />
        <input
          type="search"
          name="search"
          id="search"
          onFocus={() => setShowSearchList(true)}
          value={searchInput}
          onChange={handleOnChangeSearchInput}
          className={`${classes.SearchInput} f5 lh-solid w-100 items-center z-2`}
          placeholder="Where did I put that thing?"
        />
        {showSearchList ? (
          <ul
            className={`${
              classes.SearchResultItemList
            } flex shadow-6 br2 flex-column overflow-auto bg-white pl0 mv0 top100 absolute w-100 z-1`}
          >
            {searchResultItems.map((item, index) => {
              return (
                <a
                  key={index}
                  href="#a"
                  onClick={() => setShowSearchList(false)}
                  className={`${classes.SearchItem} dark-gray link dim`}
                >
                  <h4 className="fw5 mv0 mr2">
                    {item.title}
                    <div className={`ml2 badge capitalize ${classes[item.type]}`}>{item.type}</div>
                  </h4>
                  {item.path ? (
                    <p className="mt0 mb1 f7 silver">
                      {item.path} {">"} {item.title}
                    </p>
                  ) : null}
                </a>
              );
            })}
          </ul>
        ) : null}
      </div>
    </ClickedOutside>
  );
};

SearchBar.propTypes = {
  customStyle: PropTypes.string
};

SearchBar.defaultProps = {
  customStyle: ""
};

export default SearchBar;
