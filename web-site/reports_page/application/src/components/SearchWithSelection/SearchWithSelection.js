import React from 'react';
import Keys from '../../Functions/Keys.js';
import css from './SearchWithSelection.module.css';

class SearchWithSelection extends React.Component {

  getActiveList = () => this.props.getList().map(item => (
    <li
      className={css.listItem}
      onClick={(event) => this.props.onChangeHandler(event.target.textContent)}
      key={Keys.getRandomKey()}
    >
      {item}
    </li>
  ))

  getHeader = () => (
    <div
      className={css.header}
      onClick={this.props.Close}
    >
      <label className={css.label}>
        {this.props.title}
      </label>
      {
        this.props.canClose
        ? <button className={css.closeBtn}>&#x42;</button>
        : null
      }
    </div>
  )

  getList = () => (
    <ul
      className={css.list}
      style={{height: this.props.heightList}}
    >
      {this.getActiveList()}
    </ul>
  )

  render() {
    return (
      <div className={css.container}>
        {this.getHeader()}

        <input
          type="text"
          className={css.input}
          onChange={(event) => this.props.onChangeHandler(event.target.value)}
          value={this.props.getInputValue()}
          //TODO: Сделать без автофокуса
          autoFocus
        />

        {this.getList()}
      </div>
    );
  }
}
export default SearchWithSelection;