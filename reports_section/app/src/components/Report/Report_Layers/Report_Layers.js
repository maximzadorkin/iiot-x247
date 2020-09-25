import React from 'react';
import bootstrap from '../../../bootstrap.module.css';
import classes from './Report_Layers.module.css';

/*
props
  .layers
    description: list of layers
    type: Array[string. string...]
  .changeCheckbox
    description:
    type: function
*/
export default (props) => (
  <React.Fragment>
    <p className={[
      bootstrap['p-2'],
      bootstrap['lead'],
      bootstrap['border-bottom'],
      bootstrap['text-center']
    ].join(' ')}>
      Слои
    </p>
    <ul className={[bootstrap['list-unstyled'], bootstrap['mb-0']].join(' ')}>
      {
        props.layers.map((text, index) => {
          const li = [
            bootstrap['d-flex'],
            bootstrap['align-content-center'],
            bootstrap['justify-content-between'],
            bootstrap['p-2']
          ];
          if (index + 1 < props.layers.length) li.push(bootstrap['border-bottom']);
          return (
            <li className={li.join(' ')} key={Math.floor(Math.random()*100000)}>
              <label className={[bootstrap['mb-0'], bootstrap['p-0']].join(' ')}>
                <input 
                  type="checkbox" 
                  className={bootstrap['mr-2']} 
                  data-layers-key={index}
                  defaultChecked = {true}
                  onChange={props.changeCheckbox}/>
                {text}
              </label>
              <span className={classes['click_this']}>&times;</span>
            </li>
          );
        })
      }
    </ul>
  </React.Fragment>
);