import React from 'react';
import Keys from '../../Functions/Keys.js';
import customClasses from './SearchWithSelection.module.css';

// heightSearchesUl={'250px'}
// canClose={true}
// Close={() => this.closeSearch(item)}
// title={item.title}
// setActiveValue={item.setActiveValue}
// getActiveValue={item.getActiveValue}
// getSearches={item.getSearches}
// key={Keys.getRandomKey()}
class SearchWithSelection extends React.Component {

  changeValueHandle = (value) => {
    this.props.setActiveValue(value);
    this.props.search();
  }

  // componentDidMount =() => this.props.search();

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
          style={{height: this.props.heightSearchesUl}}
        >
          {this.getActiveSearches()}
        </ul>
      </div>
    );
  }
}
export default SearchWithSelection;