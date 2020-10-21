import React from 'react';
import Keys from '../../../Functions/Keys.js';
import QuizHeader from '../QuizHeader/QuizHeader.js';
import SearchWithSelection from '../../SearchWithSelection/SearchWithSelection.js';
import css from './MainScreen.module.css';

class MainScreen extends React.Component {
  
  state = {
    elements: [
      {
        title: 'Выбрать тип',
        isSearch: false,
        getActiveValue: this.props.getActiveType,
        setActiveValue: (value) => {
          this.props.search(value, 'types');
          return this.props.setActiveType(value);
        },
        getSearches: this.props.getSearches,
        search: this.props.search.bind(this, this.props.getActiveType(), 'types')
      },
      {
        title: 'Выбрать категорию',
        isSearch: false,
        getActiveValue: this.props.getActiveCategory,
        setActiveValue: (value) => {
          this.props.search(value, 'categories');
          return this.props.setActiveCategory(value);
        },
        getSearches: this.props.getSearches,
        search: this.props.search.bind(this, this.props.getActiveCategory(), 'categories')
      }
    ]
  }

  isSomeOneActiveSearch = () => this.state.elements.reduce(
    (acc, item) => item.isSearch + acc, false)

  arePreFilled = (beforeIndex) => this.state.elements.reduce(
    (acc, item, index) =>
      index < beforeIndex
      ? acc * (item.getActiveValue().trim() !== '')
      : acc,
    true
  )

  openSearch = (item) => this.setState(prevValue => {
    item.search();
    return {
      elements: [
      ...prevValue.elements
        .map(el =>
          el.title === item.title
          ? {...el, isSearch: true}
          : {...el, isSearch: false})
      ]
    }
  })

  closeSearch = () => this.setState(prevValue => ({
      elements: [
        ...prevValue.elements
          .map(el => ({...el, isSearch: false}))
      ]
    }))

  getSteps = () => this.state.elements.map((item, index) =>
    !this.arePreFilled(index) ? null :
      item.isSearch
      ? (
        <SearchWithSelection
          heightList={'300px'}
          canClose={true}
          Close={this.closeSearch.bind(this, item)}
          title={item.title}
          onChangeHandler={item.setActiveValue}
          getInputValue={item.getActiveValue}
          getList={item.getSearches}
          key={Keys.getRandomKey()}
        />
      )
      : this.isSomeOneActiveSearch() ? null : (
        <button
          className={css.openSearchBtn}
          onClick={this.openSearch.bind(this, item)}
          key={Keys.getRandomKey()}
        >
          <small style={{fontFamily: 'ElegantIcons', fontSize: '14px'}}>&#x55;</small> {`${item.title} [${item.getActiveValue()}]`}
        </button>
      )
  )
  
  render() {
    return (
      <div className={css.mainScreen}>
        <QuizHeader
          showNext={true}
          btnToStartHandle={this.props.btnToStartHandle}
          btnBackHandle={this.props.btnBackHandle}
          btnNextHandle={this.props.btnNextHandle}
        />
        <div className={css.mainBlock}>
          {this.getSteps()}
        </div>
      </div>
    );
  }
}
export default MainScreen;