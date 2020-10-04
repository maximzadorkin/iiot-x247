import React from 'react';
import customClasses from './QuizHeader.module.css';

export default (props) => (
  <div className={customClasses.quizHeader}>
    <div className={customClasses.groupBtn}>
      <button
        className={`${customClasses.btn} ${customClasses.textRed} ${customClasses.icon}`}
        onClick={props.btnToStartHandle}
      >
        &#x38;
      </button>
      <button
        className={`${customClasses.btn} ${customClasses.icon}`}
        onClick={props.btnBackHandle}
      >
        &#x34;
      </button>
    </div>
    {
      props.showNext
      ? (
        <button
          className={`${customClasses.btn} ${customClasses.icon}`}
          onClick={props.btnNextHandle}
        >
          &#x35;
        </button>
      )
      : (
        <button
          className={`${customClasses.btn} ${customClasses.icon} ${customClasses.textRed}`}
          onClick={props.btnNextHandle}
        >
          &#x69;
        </button>
      )
    }
    
  </div>
);