import React from 'react';
import customClasses from '../Quiz.module.css';

export default (props) => (
  <div className={customClasses.startScreen}>
    <button
      className={`${customClasses.btn} ${customClasses.light} ${customClasses.click}`}
      onClick={props.changeScreen.bind(this, 'main_screen')}
    >
      Создать отчет
    </button>
    <button
      className={`${customClasses.btn} ${customClasses.yellow} ${customClasses.click}`}
      onClick={props.changeScreen.bind(this, 'favorites_screen')}
      disabled
    >
      Избранное
    </button>
  </div>
);