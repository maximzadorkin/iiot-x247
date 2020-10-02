import React from 'react';
import Keys from '../../../Functions/Keys.js';
import QuizHeader from '../QuizHeader/QuizHeader.js';
import SearchWithSelection from '../../SearchWithSelection/SearchWithSelection.js';
import customClasses from './SpecificationScreen.module.css';

class SpecificationScreen extends React.Component {

  state = {
    steps: []
  }

  componentDidMount = () => {
    this.setState({
      steps: this.props.getLabels().map(item => ({
        isSearch: false,
        title: item,
        item: ''
      }))
    });
  }

  componentWillUnmount = () => {}

  addItem = (value) => this.props.setSpecification([...this.props.getItems(), value])

  deleteItem = (value) => this.props
    .setSpecification(this.props.getItems().filter(item => item !== value))

  deleteAllItem = () => this.props.setSpecification([])

  setActiveValue = (changedStep, value) => this.setState(prevValue => ({
    steps: prevValue.steps.map(step =>
      step.title === changedStep.title
      ? {...step, item: value}
      : step
    )
  }))

  getActiveValue = (step) => step.item

  isSomeOneActiveSearch = () => this.state.steps.reduce(
    (acc, step) => step.isSearch + acc, false)

  areAllNotFill = () => {
    console.log(this.state.steps)
    // console.log(this.state.steps ? this.state.steps[0].item !== '' : null)
    console.log(this.state.steps.reduce(
      (acc, step) => step.item !== '' + acc, false))
    return this.state.steps.reduce(
    (acc, step) => step.item !== '' + acc, false)
  }

  openSearch = (stepLink) => {
    this.setState({
      steps: [
        ...this.state.steps
          .map(step =>
            step.title === stepLink.title
            ? {...step, isSearch: true}
            : {...step, isSearch: false})
      ]
    });
  }

  closeSearch = () => {
    this.setState({
      steps: [
        ...this.state.steps
          .map(step => ({...step, isSearch: false}))
      ]
    });
  }

  getSteps = () => this.state.steps.map(step =>
    step.isSearch
      ? (
        <SearchWithSelection
          heightSearchesUl={'150px'}
          canClose={true}
          Close={this.closeSearch}
          title={step.title}
          setActiveValue={(value) => this.setActiveValue(step, value)}
          getActiveValue={() => this.getActiveValue(step)}
          getSearches={() => this.props.getSearches(step.item)}
          key={Keys.getRandomKey()}
        />
      )
      : this.isSomeOneActiveSearch() ? null : (
        <button
          className={customClasses.openSearchBtn}
          onClick={() => this.openSearch(step)}
          key={Keys.getRandomKey()}
        >
            {`${step.title} (${step.item})`}
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
            <div className={customClasses.steps}>{this.getSteps()}</div>
            {
              // this.areAllNotFill()
              // ? null
              // : (
                <button
                  className={`${customClasses.btn}`}
                  onClick={this.addItem}
                >
                  &#x4c;
                </button>
              // )
            }
            {/* {} проверка, что все заполнены. если заполнены - кнопка добавления */}
            <ul className={customClasses.itemsUl}>
                {
                  this.props.items.map(item =>
                  <li className={customClasses.itemLi}>
                    {item}
                    <button
                      className={customClasses.closeBtn}
                      onClick={() => this.deleteItem(item)}
                    >
                      &#x4d;
                    </button>
                  </li>
                  )
                }
            </ul>
            <button
              className={`${customClasses.btn} ${customClasses.red}`}
              onClick={this.deleteAllItem}
            >
              Удалить все
            </button>
        </div>
      </div>
    );
  }
}
export default SpecificationScreen;