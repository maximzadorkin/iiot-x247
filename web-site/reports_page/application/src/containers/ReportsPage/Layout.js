import React from 'react';
import SideContents from '../../components/SideContents/SideContents.js';
import Quiz from '../../components/ReportsPage/Quiz.js';
import './Layout.module.sass';

class Layout extends React.Component {
  state = {
    isMobile: false
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        {/* <SideContents 
          activePageTitle={'Отчеты'}
        /> */}
        <Quiz />
      </div>
    );
  }
}
export default Layout;  