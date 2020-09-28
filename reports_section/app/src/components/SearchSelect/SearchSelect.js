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
    // this.props.search(this.props.activeItem);
    // const idInput = `#${this.state.idInput}`;
    // document.querySelector(idInput).value = this.props.activeItem;
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
    this.props.setActive(value, 'Регион'); //////////////////////////////////
    this.props.search(value);
  }

  render() {
    const styles = {
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
      ].join(' ')
    };

    const sought = [];
    this.props.itemsToSelect.forEach(element =>
      sought.push(
        <li className={classes.li} 
          onClick={this.setActive}
          key={Math.floor(Math.random() * 10000)}
        >
            {element}
        </li>)
      );

    return (
      <div>
        <strong className={bootstrap['lead']}>
          {this.props.label}
        </strong>
        <input 
          className={bootstrap['form-control']}
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