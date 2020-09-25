import React from 'react';
import bootstrap from '../bootstrap.module.css';
import Header from './Header/Header.js';
import Quiz from '../containers/Quiz/Quiz.js';
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

  componentDidMount() {
    this.setState({isMobile: document.body.clientWidth < 768});
  }

  render() {
    return (
      <div className={bootstrap.container}>
        <Header isMobile={this.state.isMobile}/>
        <Quiz isMobile={this.state.isMobile}/>
        {/* <Interview 
          isMobile={this.state.isMobile}
          types={this.state.types}
          criterions={this.state.criterions}/> */}
        {/* <button 
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
        </button> */}
        {
          this.state.showReport ?
            <Report 
            isMobile={this.state.isMobile}
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