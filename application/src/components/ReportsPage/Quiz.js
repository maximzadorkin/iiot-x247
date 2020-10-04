import React from 'react';
import customClasses from './Quiz.module.css';
import axios from 'axios';
import StartScreen from './StartScreen/StartScreen.js';
import FavoritesScreen from './FavoritesScreen/FavoritesScreen.js';
import MainScreen from './MainScreen/MainScreen.js';
import SpecificationScreen from './SpecificationScreen/SpecificationScreen.js';
import TimesScreen from './TimesScreen/TimesScreen.js';
import Keys from '../../Functions/Keys.js';
import Report from './Report/Report.js';

class Quiz extends React.Component {

  state = {

    activeScreen: 'start_screen',
    screensSequence: [],

    activeType: '',
    activeCategory: '',
    activeTimePeriod: {from: null, to: null},
    searches: ['search1', 'search2', 'search3'],

    specification: {
      activeIndex: 0,
      content: [
        // {labels: ['Выбрать область', 'Выбрать город', 'Выбрать микрорайон'], items: []},
        // {labels: ['Выбрать компанию', 'Выбрать чтото еще',], items: []}
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
      // specification: {activeIndex: 0, content: []},
      activeTimePeriods: []
    }))
  setActiveCategory = (value) => this.setState(prevValue => ({
    ...prevValue,
    activeCategory: value,
    // specification: {activeIndex: 0, content: []},
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
  }
  setActiveDatePeriod = (value) => this.setState({activeTimePeriod: value})

  getActiveType = () => this.state.activeType
  getActiveCategory = () => this.state.activeCategory
  getSpecificationLabels = () => this.state.specification.content[this.state.specification.activeIndex].labels
  getSpecificationItems = () => this.state.specification.content[this.state.specification.activeIndex].items
  getActiveDatePeriod = () => this.state.activeTimePeriod
  getSearches = () => this.state.searches

  search = (value, sought) => {
    switch (sought) {
      case 'types':
        axios.get(`https://localhost:5001/api/EDSChart/?type=${value}`)
        .then(response => {
          console.log(response)
          this.setState({searches: response.data})
        });
        break;
      case 'categories':
        axios.get(`https://localhost:5001/api/EDSChart/?type=${this.state.activeType}&category=${value}&method=1`)
        .then(response => {
          console.log(response)
          this.setState({searches: response.data})
        });
        break;
      // case 'times_screen':
        // axios.
        // break;
      default:
        break;
    }
  }

  changeScreen = (newScreen) => {
    const activeScreen = this.state.activeScreen;
    let canChange = true;

    this.setState({activeScreen: 'load_screen'});

    switch (activeScreen) {
      case 'main_screen':
        if (this.state.activeCategory === '')
          canChange = false;
        else if (!this.state.specification.content[0])
          newScreen = 'times_screen';
        break;
      case 'specification_screen':
        const specificationContent = this.state.specification.content;
        const activeSpecification = this.state.specification.activeIndex;
        if (specificationContent) {
          if (specificationContent[activeSpecification] === [])
            canChange = false;
          else if (!specificationContent[activeSpecification + 1])
            newScreen = 'times_screen';
        } else {
          newScreen = 'times_screen';
        }
        break;
      case 'times_screen':
        canChange = Boolean(this.state.activeTimePeriod.from && this.state.activeTimePeriod.to);
        axios.post('https://localhost:5001/api/EDSChart/', {
          type: this.state.activeType,
          category: this.state.activeCategory,
          from: this.state.activeTimePeriod.from,
          to: this.state.activeTimePeriod.to
        }).then(response => {
          if (canChange) {
            this.setState(prevValue => ({
              ...prevValue,
              report: {
                ...this.state.report,
                content: response.data
              },
              searches: [],
              activeScreen: newScreen,
              screensSequence: [...prevValue.screensSequence, activeScreen]
            }))
          }
        });
        break;
      default:
        canChange = true;
    }
    if (canChange && activeScreen !== 'times_screen')
      this.setState(prevValue => ({
        ...prevValue,
        searches: [],
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
            getSearches={this.getSearches}
            search={this.search}
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
            search={this.search}
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
            items={this.state.specification.content[this.state.specification.activeIndex].items}
            setSpecification={this.setSpecificationItems}
            getSearches={this.getSearches}
            search={this.search}
          />
        );
        break;
      case 'times_screen':
        nextScreen =  (
          <TimesScreen 
            btnToStartHandle={this.btnToStartHandle}
            btnBackHandle={this.btnBackHandle}
            btnNextHandle={() => this.changeScreen('report_screen')}
            getDatePeriod={this.getActiveDatePeriod}
            setDatePeriod={this.setActiveDatePeriod}
          />
        );
        break;
      case 'report_screen':
        nextScreen = (
          <Report
            btnToStartHandle={this.btnToStartHandle}
            btnBackHandle={this.btnBackHandle}
            report={this.state.report}
          />
        );
        break;
      case 'load_screen':
        const load = <p className={customClasses.load}>&#xe02d;</p>;
        nextScreen = load;
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