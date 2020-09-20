import React from 'react';
import bootstrap from '../bootstrap.module.css';
import Header from './Header/Header.js';
import Interview from '../containers/Interview/Interview.js';
import Report from '../containers/Report/Report.js';

class Layout extends React.Component {
  state = {
    isMobile: false,
    showReport: false
  }
  constructor(props) {
    super(props);
    window.addEventListener('resize', () => {
      this.setState({isMobile: document.body.clientWidth < 768});
    });
  }
  render() {
    const isMobile = document.body.clientWidth < 768;
    return (
      <div className={bootstrap.container}>
        <Header isMobile={isMobile}/>
        <Interview isMobile={isMobile}/>
        <button 
            type="button"
            className={[
              bootstrap['d-block'],
              bootstrap['mx-auto'],
              bootstrap['mt-3'],
              bootstrap['mb-5'],
              bootstrap['btn'],
              bootstrap['btn-primary']
            ].join(' ')}
            onClick={() => this.setState({showReport: true})}>
            Сформировать отчет
        </button>
        {
          this.state.showReport ?
            <Report 
            isMobile={isMobile}
            title={'super puper big of big of big lalalal biggest lol title'}
            layers={['1', '2', '3', '4', '5']}
            specifications={['a', 'b', 'c', 'd', 'e', 'f']}
            main={[]}
            closeReport={() => this.setState({showReport: false})}/>
          : null
        }
      </div>
    )
  }
}

export default Layout;