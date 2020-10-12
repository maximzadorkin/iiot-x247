import React from 'react';
import css from './StartScreen.module.css';

export default (props) => (
  <div className={css.startScreen}>
    <button
      className={`${css.btn} ${css.light} ${css.click}`}
      onClick={props.changeScreen.bind(this, 'main_screen')}
    >
      Создать отчет
    </button>
    <button
      className={`${css.btn} ${css.yellow} ${css.click}`}
      onClick={props.changeScreen.bind(this, 'favorites_screen')}
      disabled
    >
      Избранное
    </button>
  </div>
);