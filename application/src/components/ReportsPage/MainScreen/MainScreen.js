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
        activeSearch: false,
        getActiveValue: this.props.getActiveType,
        setActiveValue: this.props.setActiveType,
        getSearches: this.props.getSearches
      },
      {
        title: 'Выбрать категорию',
        activeSearch: false,
        getActiveValue: this.props.getActiveCategory,
        setActiveValue: this.props.setActiveCategory,
        getSearches: this.props.getSearches
      }
    ]
  }

  openSearch = (item) => {
    this.setState({
      elements: [
        ...this.state.elements
          .map(el =>
            el.title === item.title
            ? {...el, activeSearch: true}
            : {...el, activeSearch: false})
      ]
    });
  }

  closeSearch = (item) => {
    this.setState({
      elements: [
        ...this.state.elements
          .map(el => el.title === item.title ? {...el, activeSearch: false} : el)
      ]
    });
  }

  getPreFilledChecks = (beforeIndex) => this.state.elements.reduce(
    (acc, item, index) =>
      index < beforeIndex
      ? acc * (item.getActiveValue() !== '')
      : acc,
    true
  )

  getSteps = () => this.state.elements.map((item, index) =>
    !this.getPreFilledChecks(index) ? null :
      item.activeSearch
      ? (
        <SearchWithSelection
          canClose={true}
          Close={() => this.closeSearch(item)}
          title={item.title}
          setActiveValue={item.setActiveValue}
          getActiveValue={item.getActiveValue}
          getSearches={item.getSearches}
          key={Keys.getRandomKey()}
        />
      )
      : (
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
          btnNextHandle={this.props.btnNextHandle}
        />
        <div className={customClasses.mainBlock}>
          {this.getSteps()}
        </div>
      </div>
    );
  }
}
export default MainScreen;