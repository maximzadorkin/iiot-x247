import React from 'react';
import Keys from '../../../Functions/Keys.js';
import QuizHeader from '../QuizHeader/QuizHeader.js';
import SearchWithSelection from '../../SearchWithSelection/SearchWithSelection.js';
import css from './SpecificationScreen.module.css';

class SpecificationScreen extends React.Component {

  state = {
    steps: []
  }

  componentDidMount = () => this.setState({
      steps: this.props.getLabels().map((item, index) => ({
        isSearch: false,
        title: item,
        index: index,
        item: '',
        search: (valueForSearch) => this.props.search(
          [...this.state.steps.slice(0, index).map(({item}) => item), valueForSearch].join('-'),
          'specification')
      }))
    });

  addItem = () => {
    const addedItem = this.state.steps.map(step => step.item);
    if (!this.props.getItems().map(item => item.join('')).includes(addedItem.join(''))) {
      this.props.setSpecification([...this.props.getItems(), addedItem])
      this.setState(prevValue => ({
        steps: prevValue.steps.map(el => ({...el, isSearch: false, item: ''}))
      }))
    }
  }

  deleteItem = (itemForDelete, itemForDeleteIndex) => this.props
    .setSpecification(this.props.getItems().filter((item, index) => index !== itemForDeleteIndex))

  deleteAllItem = () => this.props.setSpecification([])

  setActiveValue = (changedStep, value) => this.setState(prevValue => {
    changedStep.search(value);
    return {
      steps: [
        ...prevValue.steps.slice(0, changedStep.index),
        { ...prevValue.steps.slice(changedStep.index, changedStep.index + 1)[0], item: value },
        ...prevValue.steps.slice(changedStep.index + 1).map(step => ({...step, item: ''}))
      ]
    }
  })

  getActiveValue = (step) => step.item

  isSomeOneActiveSearch = () => this.state.steps.reduce(
    (acc, step) => step.isSearch + acc, false)

  areAllFill = () => this.state.steps
    .reduce((acc, step) => step.item.length !== 0 * acc, true)

  openSearch = (stepLink) => this.setState(prevValue => {
    stepLink.search(stepLink.item);
    return {
      steps: [
        ...this.state.steps
          .map(step =>
            step.title === stepLink.title
            ? {...step, isSearch: true}
            : {...step, isSearch: false})
      ]
    }
  })

  closeSearch = () => this.setState({
      steps: [
        ...this.state.steps
          .map(step => ({...step, isSearch: false}))
      ]
    });

  getSteps = () => this.state.steps.map(step =>
    step.isSearch
      ? (
        <SearchWithSelection
          heightList={'100px'}
          canClose={true}
          Close={this.closeSearch}
          title={step.title}
          onChangeHandler={(value) => this.setActiveValue(step, value)}
          getInputValue={() => this.getActiveValue(step)}
          getList={() => this.props.getSearches(step.item)}
          key={Keys.getRandomKey()}
        />
      )
      : this.isSomeOneActiveSearch() ? null : (
        <button
          className={css.openSearchBtn}
          onClick={() => this.openSearch(step)}
          key={Keys.getRandomKey()}
        >
            <small style={{fontFamily: 'ElegantIcons', fontSize: '15px'}}>&#x55;</small> {`${step.title} [${step.item}]`}
        </button>
      )
  )

  render() {
    return (
      <div className={css.screen}>
        <QuizHeader
          showNext={true}
          btnToStartHandle={this.props.btnToStartHandle}
          btnBackHandle={this.props.btnBackHandle}
          btnNextHandle={this.props.btnNextHandle}
        />
        <div className={css.mainBlock}>
            <div className={css.stepsBlock}>
              {this.getSteps()}
              {
                <button
                  className={`${css.btn}`}
                  onClick={this.addItem}
                >
                  &#x4c;
                </button>
              }
            </div>
            <div className={css.itemsBlock}>
              <ul className={css.itemsUl}>
                  {
                    this.props.getItems().map((item, index) =>
                    <li className={css.itemLi} key={Keys.getRandomKey()}>
                      {item.join(', ')}
                      <button
                        className={css.closeBtn}
                        onClick={() => this.deleteItem(item, index)}
                      >
                        &#x4d;
                      </button>
                    </li>
                    )
                  }
              </ul>
              <button
                className={`${css.btn} ${css.red}`}
                onClick={this.deleteAllItem}
              >
                Удалить все
              </button>
            </div>
        </div>
      </div>
    );
  }
}
export default SpecificationScreen;