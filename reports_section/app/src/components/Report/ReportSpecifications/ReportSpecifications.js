import React from 'react';
import bootstrap from '../../../bootstrap.module.css';
import customClasses from './ReportSpecifications.module.css';

/*
props
  .specifications
    description: list of specifications
    type: Array[string. string...]
*/
export default (props) => {
  const classes = {
    section: [
      bootstrap['border-bottom'],
      customClasses['small-block'],
      bootstrap['overflow-auto']
    ].join(' '),
  };

  return (
    <div className={classes.section}>
      <p className={[
        bootstrap['p-2'],
        bootstrap['border-bottom'],
        bootstrap['lead'],
        bootstrap['text-center']
      ].join(' ')}>
        Характеристики
      </p>
      <ul className={[bootstrap['list-unstyled'], bootstrap['mb-0']].join(' ')}>
        {
          props.specifications.map((text, index) => {
            const li = [bootstrap['p-2']];
            if (index + 1 < props.specifications.length) li.push(bootstrap['border-bottom']);
            return <li className={li.join(' ')} key={Math.floor(Math.random()*100000)}>{text}</li>;
          })
        }
      </ul>
    </div>
  );
};