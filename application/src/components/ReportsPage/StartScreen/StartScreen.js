import React from 'react';
import customClasses from '../Quiz.module.css';

export default (props) => (
  <div className={customClasses.startScreen}>
    <button
      className={`${customClasses.btn} ${customClasses.light} ${customClasses.click}`}
      onClick={() => props.changeScreen('main_screen')}
    >
      Создать отчет
    </button>
    <button
      className={`${customClasses.btn} ${customClasses.yellow} ${customClasses.click}`}
      onClick={() => props.changeScreen('favorites_screen')}
    >
      Избранное
    </button>
  </div>
);