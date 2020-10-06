import React from 'react';
import customClasses from './Quiz.module.css';
import axios from 'axios';
import StartScreen from './StartScreen/StartScreen.js';
import FavoritesScreen from './FavoritesScreen/FavoritesScreen.js';
import MainScreen from './MainScreen/MainScreen.js';
import SpecificationScreen from './SpecificationScreen/SpecificationScreen.js';
import DatesScreen from './DatesScreen/DatesScreen.js';
import Report from './Report/Report.js';

class Quiz extends React.Component {

  state = {

    activeScreen: 'start_screen',
    screensSequence: [],

    activeType: '',
    activeCategory: '',
    activeTimePeriod: {from: '', to: ''}, // по умолчанию сегодняшний день
    searches: [],

    specification: {
      activeIndex: 0,
      content: [
        {labels: ['Выбрать область', 'Выбрать город', 'Выбрать микрорайон'], items: []},
        // {labels: ['Выбрать компанию', 'Выбрать чтото еще',], items: []}
      ]
    },

    report: {
      title: '',
      content: []
    }
  }

  setActiveType = (value) => {
    this.search(value, 'types');
    this.setState(prevValue => ({
    ...prevValue,
      activeType: value,
      activeCategory: '',
      specification: {activeIndex: 0, content: []},
      activeTimePeriods: []
    }))
  }
  setActiveCategory = (value) => {
    this.search(value, 'categories');
    this.setState(prevValue => ({
      ...prevValue,
      activeCategory: value,
      specification: {activeIndex: 0, content: []},
      activeTimePeriods: []
    }))
  }
  setSpecificationItems = (value) => this.setState(prevValue => ({
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
  setActiveDatePeriod = (value) => this.setState({activeTimePeriod: value})

  getActiveType = () => this.state.activeType
  getActiveCategory = () => this.state.activeCategory
  getSpecificationLabels = () => this.state.specification.content[this.state.specification.activeIndex].labels
  getSpecificationItems = () => this.state.specification.content[this.state.specification.activeIndex].items
  getActiveDatePeriod = () => this.state.activeTimePeriod
  getSearches = () => this.state.searches

  search = (value, sought) => {
    console.log('search')
    switch (sought) {
      case 'types':
        axios.get(`https://localhost:5001/api/EDSChart/?type=${value}`)
          .then(response => this.setState({searches: response.data}));
        break;
      case 'categories':
        axios.get(`https://localhost:5001/api/EDSChart/?type=${this.state.activeType}&category=${value}&method=1`)
          .then(response => this.setState({searches: response.data}));
        break;
      case 'specification':
        break;
      default:
        break;
    }
    this.setState({searches: ['По данному запросу ничего не найдено']})
  }

  //TODO: починить взаимодействие на нескольких спецификаторах
  changeScreen = (newScreen = null) => {
    const setScreen = (screen) => this.setState({activeScreen: screen});
    const setNextScreen = (screen, lastScreen) => this.setState(prevValue => ({
      ...prevValue,
      searches: [],
      activeScreen: screen,
      screensSequence: [...prevValue.screensSequence, lastScreen]
    })); 

    const activeScreen = this.state.activeScreen;
    let canChange;

    this.setState({activeScreen: 'load_screen'});

    switch (activeScreen) {
      case 'start_screen':
        setNextScreen(newScreen, 'start_screen');
        break;
      case 'main_screen':
        canChange = this.getActiveType() && this.getActiveCategory();
        const isSpecificationEmpty = this.state.specification.content.length === 0;
        if (canChange && isSpecificationEmpty)
          axios.get(`/localhost:5001`)
          .then(response => {
            const data = response.data;
            if (data.length !== 0) {
              this.setState({specification: {
                activeIndex: 0,
                content: data
              }})
              setNextScreen('specification_screen', 'main_screen')
            } else
              setNextScreen('dates_screen', 'main_screen')
          })
          .catch(err => {
            const data = [
              {labels: ['Выбрать область', 'Выбрать город', 'Выбрать микрорайон'], items: []},
              // {labels: ['Выбрать компанию', 'Выбрать чтото еще',], items: []}
            ];
            if (data.length !== 0) {
              this.setState({specification: {
                activeIndex: 0,
                content: data
              }})
              setNextScreen('specification_screen', 'main_screen')
            } else
              setNextScreen('dates_screen', 'main_screen')
          });
        else if (canChange)
          setNextScreen('specification_screen', 'main_screen');
        else
          setScreen('main_screen');
        break;
      case 'specification_screen':
        const activeSpecification = this.state.specification.activeIndex + 1;
        const specificationContent = this.state.specification.content;
        console.log(specificationContent)
        if (specificationContent[activeSpecification]) {
          setNextScreen('specification_screen', 'specification_screen');
          this.setState({specification: {
            activeIndex: activeSpecification,
            content: specificationContent
          }});
        } else {
          setNextScreen('dates_screen', 'specification_screen');
        }
        break;
      case 'dates_screen':
        const haveDatePeriod = this.state.activeTimePeriod.from && this.state.activeTimePeriod.to;
        if (haveDatePeriod) {
          axios.post('https://localhost:5001/api/EDSChart/', {
            type: this.state.activeType,
            category: this.state.activeCategory,
            from: this.state.activeTimePeriod.from,
            to: this.state.activeTimePeriod.to
          }).then(response => this.setState(prevValue => ({
            ...prevValue,
            report: {...prevValue.report, content: response.data},
            searches: [],
            activeScreen: 'report_screen',
            screensSequence: [...prevValue.screensSequence, activeScreen]
          })))
          .catch(err => {
            const data = [['sdg', 'sfg'], ['sd', 'sdf']]
            this.setState(prevValue => ({
              ...prevValue,
              report: {...prevValue.report, content: data},
              searches: [],
              activeScreen: 'report_screen',
              screensSequence: [...prevValue.screensSequence, activeScreen]
            }))
          });
        } else {
          setScreen('dates_screen')
        }
        break;
      default:
        console.log('The desired window does not exist. Redirected to start screen');
        this.btnToStartHandle();
        break;
    }
  }

  btnToStartHandle = () => this.setState(prevValue => ({
    ...prevValue,
    activeScreen: 'start_screen',
    screensSequence: []
  }));

  //TODO: адаптировать для нескольких specification
  btnBackHandle = () =>
    this.setState({activeScreen: this.state.screensSequence.pop()});

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
      case 'dates_screen':
        nextScreen =  (
          <DatesScreen 
            btnToStartHandle={this.btnToStartHandle}
            btnBackHandle={this.btnBackHandle}
            btnNextHandle={this.changeScreen}
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
      default:
        nextScreen = <p className={customClasses.load}>&#xe02d;</p>;
        break;
    }
    return nextScreen;
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