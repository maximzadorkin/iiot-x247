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
    activeSpecifications: [],
    activeTimePeriods: [],
    searches: ['search1', 'search2', 'search3'],

    specification: {
      labelsArr: [['Выбрать область', 'Выбрать город', 'Выбрать микрорайон', 'Выбрать улицу', 'Выбрать дом'], ['Выбрать компанию', 'Выбрать чтото еще', 'Выбрать еще чтото']],
      activeIndex: 0
    },

    report: {
      title: '',
      content: []
    }
  }

  setActiveType = (value) => {
    this.setState({
      activeType: value,
      activeCategory: '',
      activeSpecifications: '',
      activeTimePeriods: []
    });
  }
  setActiveCategory = (value) => this.setState({activeCategory: value})
  setSpecification = (value) => {
      this.setState(prevValue => ({
      ...prevValue,
      activeSpecifications: [...prevValue.activeSpecifications, value],
      specification: {
        ...prevValue.specification,
        activeIndex: prevValue.specification.activeIndex + 1 
      }
    }))
  }
  setActiveTimePeriods = (value) => this.setState({activeTimePeriods: value})
  getActiveType = () => this.state.activeType
  getActiveCategory = () => this.state.activeCategory
  getActiveSpecification = () => this.state.activeSpecifications
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
        if (this.state.activeSpecifications[this.state.specification.activeIndex] === [])
          canChange = false;
        break;
      default:
        canChange = true;
    }

    if (canChange)
      this.setState(prevValue => ({
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
            setSpecification={this.setSpecification}
            labels={this.state.specification.labelsArr[this.state.specification.activeIndex]}
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

  btnToStartHandle = () =>
    this.setState({
      activeScreen: 'start_screen',
      screensSequence: []
    });


  btnBackHandle = () =>
    this.setState({activeScreen: this.state.screensSequence.pop()});


  btnNextHandle = () => {

  }

  render() {
    return (
      <div className={customClasses.quiz}>
        {this.returnScreen(this.state.activeScreen)}
      </div>
    );
  }
}
export default Quiz;