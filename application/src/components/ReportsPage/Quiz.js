import React from 'react';
import customClasses from './Quiz.module.css';
import StartScreen from './StartScreen/StartScreen.js';
import MainScreen from './MainScreen/MainScreen.js';

class Quiz extends React.Component {

  state = {

    activeScreen: 'start_screen',

    report: {
      title: '',
      content: []
    }
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