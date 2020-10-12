import React from 'react';
import css from './QuizHeader.module.css';

export default (props) => (
  <div className={css.quizHeader}>
    <div className={css.groupBtn}>
      <button
        className={`${css.btn} ${css.textRed} ${css.icon}`}
        onClick={props.btnToStartHandle}
      >
        &#x38;
      </button>
      <button
        className={`${css.btn} ${css.icon}`}
        onClick={props.btnBackHandle}
      >
        &#x34;
      </button>
    </div>
    {
      props.showNext
      ? (
        <button
          className={`${css.btn} ${css.icon}`}
          onClick={props.btnNextHandle}
        >
          &#x35;
        </button>
      )
      : (
        <button
          className={`${css.btn} ${css.icon} ${css.textRed}`}
          onClick={props.btnNextHandle}
        >
          &#x69;
        </button>
      )
    }
  </div>
);