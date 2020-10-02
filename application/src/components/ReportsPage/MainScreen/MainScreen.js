import React from 'react';
import Keys from '../../../Functions/Keys.js';
import QuizHeader from '../QuizHeader/QuizHeader.js';
import SearchWithSelection from '../../SearchWithSelection/SearchWithSelection.js';
import customClasses from './MainScreen.module.css';

// setActiveType
// getActiveType
// setActiveCategory
// getActiveCategory
// getSearches

class MainScreen extends React.Component {
  
  state = {
    elements: [
      {
        title: 'Выбрать тип',
        isSearch: false,
        getActiveValue: this.props.getActiveType,
        setActiveValue: this.props.setActiveType,
        getSearches: this.props.getSearches
      },
      {
        title: 'Выбрать категорию',
        isSearch: false,
        getActiveValue: this.props.getActiveCategory,
        setActiveValue: this.props.setActiveCategory,
        getSearches: this.props.getSearches
      }
    ]
  }

  isSomeOneActiveSearch = () => this.state.elements.reduce(
    (acc, item) => item.isSearch + acc, false)

  arePreFilled = (beforeIndex) => this.state.elements.reduce(
    (acc, item, index) =>
      index < beforeIndex
      ? acc * (item.getActiveValue() !== '')
      : acc,
    true
  )

  openSearch = (item) => {
    this.setState({
      elements: [
        ...this.state.elements
          .map(el =>
            el.title === item.title
            ? {...el, isSearch: true}
            : {...el, isSearch: false})
      ]
    });
  }

  closeSearch = (item) => {
    this.setState({
      elements: [
        ...this.state.elements
          .map(el => ({...el, isSearch: false}))
      ]
    });
  }

  getSteps = () => this.state.elements.map((item, index) =>
    !this.arePreFilled(index) ? null :
      item.isSearch
      ? (
        <SearchWithSelection
          heightSearchesUl={'200px'}
          canClose={true}
          Close={() => this.closeSearch(item)}
          title={item.title}
          setActiveValue={item.setActiveValue}
          getActiveValue={item.getActiveValue}
          getSearches={() => item.getSearches(item.getActiveValue())}
          key={Keys.getRandomKey()}
        />
      )
      : this.isSomeOneActiveSearch() ? null : (
        <button
          className={customClasses.openSearchBtn}
          onClick={() => this.openSearch(item)}
          key={Keys.getRandomKey()}
        >
            {`${item.title} (${item.getActiveValue()})`}
        </button>
      )
  )
  
  render() {
    return (
      <div className={customClasses.mainScreen}>
        <QuizHeader
          btnToStartHandle={this.props.btnToStartHandle}
          btnBackHandle={this.props.btnBackHandle}
          btnNextHandle={() => this.props.btnNextHandle('specification_screen')}
        />
        <div className={customClasses.mainBlock}>
          {this.getSteps()}
        </div>
      </div>
    );
  }
}
export default MainScreen;