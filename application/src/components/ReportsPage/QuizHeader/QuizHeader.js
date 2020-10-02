import React from 'react';
import customClasses from './QuizHeader.module.css';

export default (props) => (
  <div className={customClasses.quizHeader}>
    <div className={customClasses.groupBtn}>
      <button
        className={`${customClasses.btn} ${customClasses.text} ${customClasses.red}`}
        onClick={props.btnToStartHandle}
      >
        &#x38;
      </button>
      <button
        className={customClasses.btn}
        onClick={props.btnBackHandle}
      >
        &#x34;
      </button>
    </div>
    <button
      className={`${customClasses.btn}`}
      onClick={props.btnNextHandle}
    >
      &#x35;
    </button>
  </div>
);