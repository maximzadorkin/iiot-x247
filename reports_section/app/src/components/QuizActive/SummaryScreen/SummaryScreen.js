import React from 'react';
import bootstrap from '../../../bootstrap.module.css';

class SummaryScreen extends React.Component {

  state = {
    showReport: null
  }

  componentDidMount() {
    this.setState({showReport: false});
  }

  render() {

    return (
      <div className={bootstrap['mb-2']}>
        <div className={[bootstrap['container'], bootstrap['row']].join(' ')}>
          <p className={[bootstrap['mb-2'], bootstrap['col-12'], bootstrap['p-0']].join(' ')}>Выбрать период:</p>
          <input type="date" className={[bootstrap['form-control'], bootstrap['form-control-sm'], bootstrap['col-5']].join(' ')}/>
          <p className={[bootstrap['col-2'], bootstrap['text-center']].join(' ')}>-</p>
          <input type="date" className={[bootstrap['form-control'], bootstrap['form-control-sm'], bootstrap['col-5']].join(' ')}/>
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
        </div>
      </div>
    );
  }
}
export default SummaryScreen;