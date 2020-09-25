import React from 'react';
import bootstrap from '../../../bootstrap.module.css';

const wrapperClasses = [
  bootstrap['d-flex'],
  bootstrap['justify-content-between']
].join(' ');
const toStartButtonClasses = [
  bootstrap['btn'],
  bootstrap['btn-outline-info'],
  bootstrap['mr-1'],
  bootstrap['mr-md-4'],
  bootstrap['shadow']
];
const backButtonClasses = [
  bootstrap['btn'],
  bootstrap['btn-outline-info'],
  bootstrap['shadow']
];
const nextButtonClasses = [
  bootstrap['btn'],
  bootstrap['btn-success'],
  bootstrap['shadow']
];

export default (props) => (
  <div className={wrapperClasses}>
    {
      props.activeStage !== 'start_screen' && 
      props.activeStage !== 'load_screen' ?
        <div className={bootstrap['mb-3']}>
          <button 
            className={toStartButtonClasses.join(' ')}
            onClick={props.backToStartHandle}
          >
            В начало
          </button>
          <button 
            className={backButtonClasses.join(' ')}
            onClick={props.backButtonHandle}
          >
            &#9668;
          </button>
        </div>
      : null
    }
    {
      props.activeStage !== 'start_screen' && 
      props.activeStage !== 'summary_screen' &&
      props.activeStage !== 'load_screen' ?
        <div className={bootstrap['text-right']}>
          <button className={nextButtonClasses.join(' ')}
            onClick={props.nextHandle}>
            Далее
          </button>
        </div>
      : null
    }
  </div>
);