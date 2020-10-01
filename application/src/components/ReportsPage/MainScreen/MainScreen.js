import React from 'react';
import QuizHeader from '../QuizHeader/QuizHeader.js';
import customClasses from './MainScreen.module.css';

class MainScreen extends React.Component {
  
  
  
  render() {
    return (
      <div className={customClasses.mainScreen}>
        <QuizHeader
          btnToStartHandle={this.props.btnToStartHandle}
          btnBackHandle={this.props.btnBackHandle}
          btnNextHandle={this.props.btnNextHandle}
        />
      </div>
    );
  }
}
export default MainScreen;