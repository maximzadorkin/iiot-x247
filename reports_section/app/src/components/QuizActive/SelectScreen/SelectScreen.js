import React from 'react';
import axios from 'axios';
import bootstrap from '../../../bootstrap.module.css';
import classes from './SelectScreen.module.css';

/*
props
  .label
  .list
  .next
  .screen
*/
class SelectScreen extends React.Component {

  state = {
    showList: false,
    activeItem: '',
    list: []
  }

  componentDidMount() {
    document.querySelector('#searchInput').value = this.props.activeItem;
  }

  search = (event) => {
    const searchData = event.target.value;
    this.setState({showList: true})

    switch (this.props.search) {
      case 'types':
        axios.get(`/0?find0=${searchData}`)
        .then(response => this.setState({list: response}))
        .catch(error => this.setState({list: ['1', '2', 'a', 'vc', 'f', 'hg']}))  // УДАЛИТЬ всю строчку
        break;
      case 'criterians':
        axios.get(`/0?find1=${searchData}`)
        .then(response => this.setState({list: response}))
        .catch(error => this.setState({list: ['45', '67', 'dg', '67', 'dg', '67', 'dg', 'vvcb', 'bv', 'hg']}))  // УДАЛИТЬ всю строчку
        break;
      case 'classif':
        axios.get(`/0?find2=${searchData}`)
        .then(response => this.setState({list: response}))
        .catch(error => this.setState({list: ['45', '67', 'dg', '67', 'dg', '67', 'dg', 'vvcb', 'bv', 'hg']}))  // УДАЛИТЬ всю строчку
        break;
      case 'address':
        axios.get(`/0?find3=${searchData}`)
        .then(response => this.setState({list: response}))
        .catch(error => this.setState({list: ['45', '67', 'dg', '67', 'dg', '67', 'dg', 'vvcb', 'bv', 'hg']}))  // УДАЛИТЬ всю строчку
        break;
      case 'comp':
        axios.get(`/0?find4=${searchData}`)
        .then(response => this.setState({list: response}))
        .catch(error => this.setState({list: ['45', '67', 'dg', '67', 'dg', '67', 'dg', 'vvcb', 'bv', 'hg']}))  // УДАЛИТЬ всю строчку
        break;
    }
  }

  setActive = (event) => {
    const value = event.target.textContent;
    document.querySelector('#searchInput').value = value;
    this.props.setActive(value);
    this.setState({
      activeItem: value,
      showList: false
    });
  }

  render() {

    const ulStyle = {
      maxHeight: '300px'
    }
    const ulClasses = [
      bootstrap['list-unstyled'],
      bootstrap['overflow-auto'],
      bootstrap['bg-white'],
      bootstrap['mb-0']
    ].join(' ');
    const liClasses = [
      bootstrap['border-bottom'],
      bootstrap['p-1'],
      classes.click_this
    ].join(' ');

    const sought = [];
    this.state.list.forEach(element =>
      sought.push(
        <li className={liClasses} 
          onClick={this.setActive}
          key={Math.random()*100000000}>
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
          onChange={this.search}
          onFocus={this.search}
          // onBlur={this.setActive}
          id='searchInput'
        />
        {
          this.state.showList ? 
            <div className={[bootstrap['border']].join(' ')}>
              <ul className={ulClasses} style={ulStyle}>
                {sought}
              </ul>
            </div>
          : null
        }
      </div>
    );
  }
}

export default SelectScreen;