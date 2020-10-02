import React from 'react';
import Keys from '../../../Functions/Keys.js';
import QuizHeader from '../QuizHeader/QuizHeader.js';
import SearchWithSelection from '../../SearchWithSelection/SearchWithSelection.js';
import customClasses from './SpecificationScreen.module.css';

class SpecificationScreen extends React.Component {

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

  componentDidMount = () => {
    this.setState({
      elements: [
        
      ]
    });
  }

  isSomeOneActiveSearch = () => this.state.elements.reduce(
    (acc, item) => item.activeSearch + acc, false)

  getSteps = () => this.state.elements.map((item, index) =>
    item.activeSearch
      ? (
        <SearchWithSelection
          heightSearchesUl={'200px'}
          canClose={true}
          Close={() => this.closeSearch(item)}
          title={item.title}
          setActiveValue={item.setActiveValue}
          getActiveValue={item.getActiveValue}
          getSearches={item.getSearches}
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
      <div className={customClasses.screen}>
        <QuizHeader
          btnToStartHandle={this.props.btnToStartHandle}
          btnBackHandle={this.props.btnBackHandle}
          btnNextHandle={() => this.props.btnNextHandle('next_screen')}
        />
        <div className={customClasses.mainBlock}>
          <ul className={customClasses.specificationBlock}>
            <li>
              <button
                className={customClasses.openSearchBtn}
                // onClick={() => this.openSearch(item)}
                key={Keys.getRandomKey()}
              >
                  {/* {`${item.title} (${item.getActiveValue()})`} */}
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default SpecificationScreen;