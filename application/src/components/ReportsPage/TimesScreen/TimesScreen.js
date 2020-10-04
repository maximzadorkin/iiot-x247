import React from 'react';
import QuizHeader from '../QuizHeader/QuizHeader.js';
import customClasses from './TimesScreen.module.css';

class TimesScreen extends React.Component {
  state = {
    dateStart: '',
    dateEnd: ''
  }

  onChangeHandler(event, inputId) {
    if (inputId === 'input-1')
      this.setState({dateStart: event.target.value})
    else
      this.setState({dateEnd: event.target.value})
  }

  dateCasting = (date) => date.split('-').reverse().join('.')

  addDate = () => {
    if (this.state.dateStart && this.state.dateEnd)
      this.props.setDatePeriod({from :this.state.dateStart, to: this.state.dateEnd})
  }

  render() {
    return (
      <div className={customClasses.screen}>
        <QuizHeader
          showNext={true}
          btnToStartHandle={this.props.btnToStartHandle}
          btnBackHandle={this.props.btnBackHandle}
          btnNextHandle={this.props.btnNextHandle}
        />
        <p>
          {
            Boolean(this.props.getDatePeriod().from)
            ? `${this.dateCasting(this.props.getDatePeriod().from)} - ${this.dateCasting(this.props.getDatePeriod().to)}`
            : null
          }
        </p>
        <div className={customClasses.newPeriod}>
          <input
            className={customClasses.dateInput}
            onChange={(event) => this.onChangeHandler(event, 'input-1')}
            value={this.state.dateStart}
            type="date"
          />
          <p className={customClasses.icon}>&#x4b;</p>
          <input
            className={customClasses.dateInput}
            onChange={(event) => this.onChangeHandler(event, 'input-2')}
            value={this.state.dateEnd}
            type="date"
          />
          <button
            className={`${customClasses.btn} ${customClasses.icon}`}
            onClick={this.addDate}
          >
            &#x4c;
          </button>
        </div>
      </div>
    );
  }
}
export default TimesScreen;