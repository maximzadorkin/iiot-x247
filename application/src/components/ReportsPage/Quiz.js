import React from 'react';
import customClasses from './Quiz.module.css';
import StartScreen from './StartScreen/StartScreen.js';
import MainScreen from './MainScreen/MainScreen.js';
import Keys from '../../Functions/Keys.js';

class Quiz extends React.Component {

  state = {

    activeScreen: 'start_screen',
    screensSequence: [],

    activeType: '',
    activeCategory: '',
    activeSpecifications: [],
    activeTimesPeriod: [],
    searches: ['search1', 'search2', 'search3'],

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
      activeTimesPeriod: []
    });
  }
  setActiveCategory = (value) => this.setState({activeCategory: value});
  setActiveSpecification = (value) => this.setState({activeSpecifications: value});
  getActiveType = () => this.state.activeType;
  getActiveCategory = () => this.state.activeCategory;
  getActiveSpecification = () => this.state.activeSpecifications;
  getSearches = (value) => {
    return [Keys.getRandomKey(), Keys.getRandomKey()];
    // this.state.searches;
  }

  changeScreen = (newScreen) => {
    this.setState({activeScreen: 'load_screen'});

    this.setState({activeScreen: newScreen});
  }

  returnScreen = (screen) => {
    let nextScreen;
    switch (screen) {
      case 'start_screen':
        nextScreen = <StartScreen changeScreen={this.changeScreen}/>
        break;
      case 'main_screen':
        nextScreen = (
          <MainScreen
            btnToStartHandle={this.btnToStartHandle}
            btnBackHandle={this.btnBackHandle}
            btnNextHandle={this.btnNextHandle}
            setActiveType={this.setActiveType}
            getActiveType={this.getActiveType}
            setActiveCategory={this.setActiveCategory}
            getActiveCategory={this.getActiveCategory}
            getSearches={this.getSearches}
          />
        );
        break;
      case 'specification_screen':
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

  btnToStartHandle = () => {}

  btnBackHandle = () => {}

  btnNextHandle = () => {}

  render() {
    return (
      <div className={customClasses.quiz}>
        {this.returnScreen(this.state.activeScreen)}
      </div>
    );
  }
}
export default Quiz;