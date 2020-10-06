import React from 'react';
import QuizHeader from '../QuizHeader/QuizHeader.js';
import customClasses from './DatesScreen.module.css';

class TimesScreen extends React.Component {

  componentDidMount = () => {
    const notHaveStartDate = !this.props.getDatePeriod().from;
    const notHaveEndDate = !this.props.getDatePeriod().to;
    const prevValue = this.props.getDatePeriod();
    const stringDate = new Date().toLocaleDateString('en-CA');
    this.props.setDatePeriod({
      from: notHaveStartDate ? stringDate : prevValue.from, 
      to: notHaveEndDate ? stringDate : prevValue.to, 
    });
  }

  onChangeHandler(event, inputId) {
    if (inputId === 'input-1')
      this.props.setDatePeriod({
        from: event.target.value,
        to: this.props.getDatePeriod().to
      })
    else
      this.props.setDatePeriod({
        from: this.props.getDatePeriod().from,
        to: event.target.value
      })
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
        <div className={customClasses.newPeriod}>
          <input
            className={customClasses.dateInput}
            onChange={(event) => this.onChangeHandler(event, 'input-1')}
            value={this.props.getDatePeriod().from}
            type="date"
          />
          <p className={customClasses.icon}>&#x4b;</p>
          <input
            className={customClasses.dateInput}
            onChange={(event) => this.onChangeHandler(event, 'input-2')}
            value={this.props.getDatePeriod().to}
            type="date"
          />
        </div>
      </div>
    );
  }
}
export default TimesScreen;