import React from 'react';
// import axios from 'axios';
import customClasses from './FavoritesScreen.module.css';

class FavoritesScreen extends React.Component {

  state = {
    activeFavorite: '',
    favorites: []
  }

  componentDidMount() {
    this.setState({
      favorites: this.getSearches().map(item => ({title: item, active: false})) 
    });
  }

  setParams = () => {
    // запросить данное избранное и активировать параметры
    this.props.setActiveType();
    this.props.setActiveCategory();
    this.props.setActiveSpecification();
    this.props.setActiveTimePeriods();
    this.props.changeScreen('finish_screens');
  }
  setFavorite = (event) => {
    const value = event.target.textContent;
    this.setState(prevValue => ({
      activeFavorite: value,
      favorites: prevValue.favorites
        .map(item => item.title === value
          ? {...item, active: true}
          : {...item, active: false})
    }));
  }
  getFavorite = () => this.state.activeFavorite

  getSearches = () => [
    'd sa',
    ' zxcfv j',
    ' zxcfv g',
    ' zxcfv b',
    ' zxcfv 1',
    ' zxcfv e',
    ' zxcfv w',
    ' zxcfv a',
    ' zxcfv d',
    'fsdf vcxvc cv'
  ]

  render() {
    return (
      <div className={customClasses.favoritesScreen}>
        <button
          className={`${customClasses.btn} ${customClasses.text} ${customClasses.dark}`}
          onClick={this.props.btnToStartHandle}
        >
          &#x38;
        </button>
        <div className={customClasses.mainBlock}>
          <label className={customClasses.title}>Избранное</label>
          <ul className={customClasses.favoritesUl}>
            {
              this.state.favorites.map(item =>
                <li 
                  className={item.active
                    ? `${customClasses.favoritesLi} ${customClasses.active}`
                    : customClasses.favoritesLi}
                  onClick={this.setFavorite}
                >
                  {item.title}
                </li>
              )
            }
          </ul>
        </div>
        <button
          className={`${customClasses.btn} ${customClasses.yellow}`}
          onClick={this.setParams}
        >
          Загрузить избранное
        </button>
      </div>
    );
  }
}
export default FavoritesScreen;