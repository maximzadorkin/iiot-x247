import React from 'react';
import customClasses from './Quiz.module.css';
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
      content: [
        ['1 dsdsqd sdsd ','2 adsds dsd dsd ','4 dszad dsad ds d32', 'sd sdsqwad d sd f', 's dsadqws dsd sf', 'bgrq dv ch 5', 'sdgff ', 'qt4j 3', 'qt fhdbrg43', 'qtzvd 43', 'hjzfdv ew'],
        ['1 dsdsswd sdsd ','2 sdsds dsd dsd ','4 dsxad dsad ds d32', 'sd sdsaasd d sd f', 's dsadswe dsd sf', 'bg dfsadv ch 5', 'szxdf ', 'qytt4 3', 'qtfbg 43', 'qtfdzv 43', 'hjarghe ew'],
        ['1 dsdcsde sdsd ','2 ddsds dsd dsd ','4 dsacd dsad ds d32', 'sd sdsad zxd sd f', 's dsads dersd sf', 'xcbg dv ch 5', 's vcf ', 'qt4yt 3', 'qt fbg43', 'qt zfdv43', 'hjsjrhyt ew'],
        ['1 dsdzsd rsdsd ','2 dsfds dsd dsd ','4 dsadv dsad ds d32', 'sd sdsad d ersd f', 's dsads dsdrt sf', 'bxcvg dv ch 5', 'scvdf ', 'qsrt4 3', 'qtdz 43', 'qt fdzv43', 'hj ahetew'],
        ['1 dsdxsd stdsd ','2 dsdgs dsd dsd ','4 dsad bdsad ds d32', 'sd sdsad d sddf f', 'ssd dsads dsd sf', 'bg fghdv ch 5', 'ssadf ', 'qthbg4 3', 'qfbxgt 43', 'qt zdfvs43', 'hjhfesdart ew'],
        ['1 dsdsd sdsyd ','2 dsds hdsd dsd ','4 dsad dsnad ds d32', 'sd sfgdsad d sd f', 's dsxcads dsd sf', 'bg dv czxch 5', 'sdhjf ', 'qtdbh4 3', 'qtfbvxg 43', 'qtfbxgd 43', 'hj fdszehbgew'],
        ['1 dsdsd sdsdu ','2 dsds djsd dsd ','4 dsad dsamd ds d32', 'sd sdscvad d sd f', 's dsadcvs dsd sf', 'bg tyujdv ch 5', 'sadf ', 'qtdbrxgtf4 3', 'qfgt 43', 'qtfhbghb 43', 'hzdfgbhsj ew'],
        ['1 dsdsd sdsd i','2 dsds dskd dsd ','4 dsad dsad, ds d32', 'sd sdsadvb d sd f', 's dsads ggdsd sf', 'bg dv ch 5', 'sdiuf ', 'qtfdrtg4 3', 'qt 4fbvxgg3', 'qt f43', 'hj sedrgew'],
        ['1 dsdsd sdsd u','2 dsds dsdl dsd ','4 dsad dsad .ds d32', 'sd sdsad dbn sd f', 's dsads dsbnd sf', 'bg dvfgh ch 5', 'sxcdf ', 'qtfdrtgsx4 3', 'qtfbxgc 43', 'qtfbgcgb 43', 'hjesarg ew'],
        ['1 dsdsd sdsd i','2 dsds dsd ;dsd ','4 dsad dsad d/s d32', 'sd sdsad d sghd f', 's dsads dsdjh sf', 'bg dv cfghh 5', 'sdnf ', 'qtfgb4 3', 'qt fhnbxg43', 'qt fdg43', 'haehrj ew'],
      ]
    }
  }

  setActiveType = (value) => this.setState(prevValue => ({
    ...prevValue,
      activeType: value.trim(),
      activeCategory: '',
      // specification: {activeIndex: 0, content: []},
      activeTimePeriods: []
    }))
  setActiveCategory = (value) => this.setState(prevValue => ({
    ...prevValue,
    activeCategory: value.trim(),
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
  getSearches = (value) => {
    switch (this.state.activeScreen) {
      case 'main_screen': 
        break;
      case 'specification_screen':
        break;
      case 'times_screen':
        // axios.
        break;
      default:
        break;
    }
    return [
      'dasd pouoi sdf ijo',
      Keys.getRandomKey(),
      Keys.getRandomKey(),
      Keys.getRandomKey(),
      Keys.getRandomKey(),
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
            items={this.state.specification.content[this.state.specification.activeIndex].items}
            setSpecification={this.setSpecificationItems}
            getSearches={this.getSearches}
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