import React from 'react';

import Header from './Header/Header';
import Interview from './Interview/Interview';
import './css/normalize.css';
import './css/bootstrap.min.css';
import './css/style.css';

function App() {
  return (
    <div className="container">
      <Header section="Отчеты"/>
      <Interview />
      {/* <Menu /> */}
    </div>
  );
}

export default App;
