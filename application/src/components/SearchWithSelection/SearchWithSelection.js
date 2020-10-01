import React from 'react';
import Keys from '../../Functions/Keys.js';
import customClasses from './SearchWithSelection.module.css';

// canClose
// Close
// setActiveValue
// getActiveValue
// getSearches
class SearchWithSelection extends React.Component {

  changeValueHandle = (value) =>
    this.props.setActiveValue(value);

  getCloseButton = () => (
    this.props.canClose
    ?
    <button className={customClasses.closeBtn}>
      &#x42;
    </button>
    : null
  )

  getActiveSearches = () => (
    this.props.getSearches().map(item => (
      <li
        className={customClasses.searchLi}
        onClick={(event) => this.changeValueHandle(event.target.textContent)}
        key={Keys.getRandomKey()}
      >
        {item}
      </li>
    ))
  );

  render() {
    return (
      <div className={customClasses.container}>
        <div
          className={customClasses.searchHeader}
          onClick={this.props.Close}
        >
          <label className={customClasses.searchLabel}>
            {this.props.title}
          </label>
          {this.getCloseButton()}
        </div>
        <input
          type="text"
          className={customClasses.searchInput}
          onChange={(event) => this.changeValueHandle(event.target.value)}
          value={this.props.getActiveValue()}
          autoFocus
        />

        <ul
          className={customClasses.searchUl}
          style={{height: '250px'}}
        >
          {this.getActiveSearches()}
        </ul>
      </div>
    );
  }
}
export default SearchWithSelection;