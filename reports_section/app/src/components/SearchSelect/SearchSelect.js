import React from 'react';
import bootstrap from '../../bootstrap.module.css';
import customClasses from './SearchSelect.module.css';

/*
props
  .label
  .list
  .next
  .screen
*/
class SearchSelect extends React.Component {

  state = {
    idInput: `input-${Math.floor(Math.random() * 10000)}`
  }

  componentDidMount() {
    this.props.search(this.props.activeItem);
    const idInput = `#${this.state.idInput}`;
    document.querySelector(idInput).value = this.props.activeItem;
  }

  setActive = (event) => {
    let value;
    const node = event.target.nodeName;
    switch (node) {
      case 'LI':
        value = event.target.textContent;
        break;
      case 'INPUT':
        value = event.target.value;
        break;
      default:
        break;
    }
    const idInput = `#${this.state.idInput}`;
    document.querySelector(idInput).value = value;
    this.props.setActive(value);
    this.props.search(value);
  }

  render() {
    const styles = {
      header: {
        display: 'flex',
        justifyContent: 'space-between'
      },
      ul: {height: this.props.heightFinder}
    };
    const classes = {
      ul: [
        bootstrap['list-unstyled'],
        bootstrap['mb-0'],
        bootstrap['bg-white'],
        bootstrap['overflow-auto']
      ].join(' '),
      li: [
        bootstrap['border-bottom'],
        bootstrap['p-1'],
        customClasses.click_this
      ].join(' '),
      closeButton: [
        bootstrap['btn'],
        bootstrap['btn-light'],
        bootstrap['text-secondary'],
      ].join(' '),
      input: [
        bootstrap['form-control']
      ].join(' ')
    };

    const sought = [];
    this.props.getItemsToSelect().forEach(element =>
      sought.push(
        <li 
          className={classes.li} 
          onClick={this.setActive}
          key={Math.floor(Math.random() * 10000)}
        >
            {element}
        </li>)
      );

    return (
      <div>
        <div style={styles.header}>
          <strong className={bootstrap['lead']}>
            {this.props.label}
          </strong>
          {
            this.props.closeButton
              ? <button 
                  className={classes.closeButton}
                  onClick={() => this.props.closeButtonHandler()}
                >
                  &#9650;
                </button>
              : null
          }
        </div>
        <input 
          className={classes.input}
          style={styles.input}
          type="text"
          placeholder="Поиск"
          onChange={this.setActive}
          id={this.state.idInput}
          autoComplete="off"
        /> 
        <div className={bootstrap['border']}>
          <ul
            className={classes.ul}
            style={styles.ul}
          >
            {sought}
          </ul>
        </div>
      </div>
    );
  }
}
export default SearchSelect;