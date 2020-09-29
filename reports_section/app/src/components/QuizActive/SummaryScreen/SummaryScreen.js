import React from 'react';
import bootstrap from '../../../bootstrap.module.css';

class SummaryScreen extends React.Component {

  state = {
    showReport: null,
    timesPeriod: ''
  }

  componentDidMount() {
    this.setState({
      showReport: false,
      inputDate1Id: `input-${Math.floor(Math.random() * 100000)}`,
      inputDate2Id: `input-${Math.floor(Math.random() * 100000)}`,
    });
  }

  addTimes = () => {
    const date1Id = `#${this.state.inputDate1Id}`;
    const date2Id = `#${this.state.inputDate2Id}`;
    const date1 = document.querySelector(date1Id).value;
    const date2 = document.querySelector(date2Id).value;
    this.props.setTimesPeriod([date1, date2]);
    const timesPeriod = `${date1} - ${date2}`;
    this.setState({timesPeriod});
  }

  render() {
    return (
      <div className={bootstrap['mb-2']}>
        <div className={[bootstrap['container'], bootstrap['row'], bootstrap['p-0'], bootstrap['m-0']].join(' ')}>
          <div className={[bootstrap['container'], bootstrap['row'], bootstrap['p-0']].join(' ')}>
            <p className={[bootstrap['mb-2'], bootstrap['col-12']].join(' ')}>Период: {this.state.timesPeriod}</p>
            <div 
              className={bootstrap['col-12']}
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                maxWidth: '700px'
              }}
            >
              <input
                type="date"
                className={[bootstrap['form-control'], bootstrap['form-control-sm']].join(' ')}
                style={{width: '25%'}}
                id={this.state.inputDate1Id}
              />
              <p 
                className={[bootstrap['text-center'], bootstrap['m-0']].join(' ')}
                // style={{width: '50px'}}
              >
                -
              </p>
              <input
                type="date"
                className={[bootstrap['form-control'], bootstrap['form-control-sm'], bootstrap['mr-1']].join(' ')}
                style={{width: '25%'}}
                id={this.state.inputDate2Id}
              />
              <span 
                className={[
                  bootstrap['btn'],
                  bootstrap['btn-success'],
                  bootstrap['p-0'],
                  bootstrap['mh-100']
                ].join(' ')} 
                style={{width: '50px'}}
                onClick={this.addTimes}
              >
                +
              </span>
            </div>
          </div>
          {
            this.props.areAllFill
              ? (
                <button 
                  type="button"
                  className={[
                    bootstrap['d-block'],
                    bootstrap['mx-auto'],
                    bootstrap['mt-3'],
                    bootstrap['mb-5'],
                    bootstrap['btn'],
                    bootstrap['btn-outline-secondary']
                  ].join(' ')}
                  onClick={this.props.openReport}
                >
                  Сформировать отчет
                </button>
              )
              : null
          }
        </div>
      </div>
    );
  }
}
export default SummaryScreen;