import React from 'react';
import bootstrap from '../../bootstrap.module.css';

/*
props
  .specifications
    description: list of specifications
    type: Array[string. string...]
*/
export default (props) => (
  <React.Fragment>
    <p className={[
      bootstrap['p-2'],
      bootstrap['border-bottom'],
      bootstrap['lead'],
      bootstrap['text-center']
    ].join(' ')}>
      Характеристики
    </p>
    <ul className={bootstrap['list-unstyled']}>
      {
        props.specifications.map((text, index) => {
          const li = [bootstrap['p-2']];
          if (index + 1 < props.specifications.length) li.push(bootstrap['border-bottom']);
          return <li className={li.join(' ')} key={Math.floor(Math.random()*100000)}>{text}</li>;
        })
      }
    </ul>
  </React.Fragment>
);