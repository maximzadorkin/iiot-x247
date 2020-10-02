import React from 'react';
import customClasses from './Quiz.module.css';
import StartScreen from './StartScreen/StartScreen.js';
import FavoritesScreen from './FavoritesScreen/FavoritesScreen.js';
import MainScreen from './MainScreen/MainScreen.js';
import SpecificationScreen from './SpecificationScreen/SpecificationScreen.js';
import Keys from '../../Functions/Keys.js';

class Quiz extends React.Component {

  state = {

    activeScreen: 'start_screen',
    screensSequence: [],

    activeType: '',
    activeCategory: '',
    activeTimePeriods: [],
    searches: ['search1', 'search2', 'search3'],

    specification: {
      activeIndex: 0,
      content: [
        {labels: ['Выбрать область', 'Выбрать город', 'Выбрать микрорайон'], items: []},
        {labels: ['Выбрать компанию', 'Выбрать чтото еще',], items: []}
      ]
    },

    report: {
      title: '',
      content: []
    }
  }

  setActiveType = (value) => this.setState(prevValue => ({
    ...prevValue,
      activeType: value,
      activeCategory: '',
      specification: {activeIndex: 0, content: []},
      activeTimePeriods: []
    }))
  setActiveCategory = (value) => this.setState(prevValue => ({
    ...prevValue,
    activeCategory: value,
    specification: {activeIndex: 0, content: []},
    activeTimePeriods: []
  }))
  setSpecificationItems = (value) => {
    this.setState(prevValue => ({
    ...prevValue,
    specification: {
      ...prevValue.specification,
      content: this.state.specification.content.map((el, index) =>
        index === this.state.specification.activeIndex
        ? {labels: el.labels, items: value}
        : el
      )
    }
  }))
  console.log(this.state)
  }
  setActiveTimePeriods = (value) => this.setState({activeTimePeriods: value})

  getActiveType = () => this.state.activeType
  getActiveCategory = () => this.state.activeCategory
  getSpecificationLabels = () => this.state.specification.content[this.state.specification.activeIndex].labels
  getSpecificationItems = () => this.state.specification.content[this.state.specification.activeIndex].items
  getSearches = (value) => {
    return [
      'dasd pouoi sdf ijo',
      Keys.getRandomKey(),
      Keys.getRandomKey(),
      Keys.getRandomKey(),
      Keys.getRandomKey(),
      Keys.getRandomKey(),
      Keys.getRandomKey(),
      Keys.getRandomKey(),
      Keys.getRandomKey()
    ];
    // this.state.searches;
  }

  changeScreen = (newScreen) => {
    const activeScreen = this.state.activeScreen;
    let canChange = true;

    this.setState({activeScreen: 'load_screen'});

    switch (activeScreen) {
      case 'main_screen':
        if (this.state.activeCategory === '')
          canChange = false;
        break;
      case 'specification_screen':
        if (this.state.specification.content[this.state.specification.activeIndex] === [])
          canChange = false;
        break;
      default:
        canChange = true;
    }

    if (canChange)
      this.setState(prevValue => ({
        ...prevValue,
        activeScreen: newScreen,
        screensSequence: [...prevValue.screensSequence, activeScreen]
      }));
    else
      this.setState({activeScreen: activeScreen});
  }

  returnScreen = (screen) => {
    let nextScreen;
    switch (screen) {
      case 'start_screen':
        nextScreen = <StartScreen changeScreen={this.changeScreen}/>
        break;
      case 'favorites_screen':
        nextScreen = (
          <FavoritesScreen
            setActiveType={this.setActiveType}
            setActiveCategory={this.setActiveCategory}
            setActiveSpecification={this.setActiveSpecification}
            setActiveTimePeriods={this.setActiveTimePeriods}
            btnToStartHandle={this.btnToStartHandle}
            changeScreen={this.changeScreen}
          />
        )
        break;
      case 'main_screen':
        nextScreen = (
          <MainScreen
            btnToStartHandle={this.btnToStartHandle}
            btnBackHandle={this.btnBackHandle}
            btnNextHandle={this.changeScreen}
            setActiveType={this.setActiveType}
            getActiveType={this.getActiveType}
            setActiveCategory={this.setActiveCategory}
            getActiveCategory={this.getActiveCategory}
            getSearches={this.getSearches}
          />
        );
        break;
      case 'specification_screen':
        nextScreen = (
          <SpecificationScreen 
            btnToStartHandle={this.btnToStartHandle}
            btnBackHandle={this.btnBackHandle}
            btnNextHandle={this.changeScreen}
            getLabels={this.getSpecificationLabels}
            getItems={this.getSpecificationItems}
            setSpecification={this.setSpecificationItems}
            getSearches={this.getSearches}
          />
        );
        break;
      case 'finish_screen':
        break;
      default:
        const load = <p className={customClasses.load}>&#xe02d;</p>;
        nextScreen = load;
        break;
    }
    return nextScreen;
  }

  btnToStartHandle = () => this.setState(prevValue => ({
      ...prevValue,
      activeScreen: 'start_screen',
      screensSequence: []
    }));


  btnBackHandle = () =>
    this.setState({activeScreen: this.state.screensSequence.pop()});

  render() {
    return (
      <div className={customClasses.quiz}>
        {this.returnScreen(this.state.activeScreen)}
      </div>
    );
  }
}
export default Quiz;