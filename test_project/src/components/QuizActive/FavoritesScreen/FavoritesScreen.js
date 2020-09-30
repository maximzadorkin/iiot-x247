import React from 'react';
import bootstrap from '../../../bootstrap.module.css';
import classes from './Favorites_Screen.module.css';

const wrapperClasses = [
  bootstrap['w-100'],
  bootstrap['p-3'],
  bootstrap['mb-4'],
  bootstrap['h-75']
].join(' ')

export default (props) => (
  <div className={wrapperClasses}>
      <strong className={ bootstrap['text-warning'] }>
        Избранное
      </strong>
      <ul className={[
          bootstrap['list-unstyled'],
          bootstrap['mb-0'],
          bootstrap['overflow-auto'],
          bootstrap['border'],
          bootstrap['rounded']
        ].join(' ')} style={{height: '350px'}}
      >
        {
          props.favorites.map((text, index) => {
            const li = [
              bootstrap['d-flex'],
              bootstrap['align-content-center'],
              bootstrap['justify-content-between'],
              bootstrap['p-2']
            ];

            if (index + 1 < props.favorites.length)
              li.push(bootstrap['border-bottom']);

              return (
              <li className={li.join(' ')}
                key={Math.floor(Math.random()*100000)}
              >
                <label className={[
                    bootstrap['mb-0'],
                    bootstrap['p-0']
                  ].join(' ')}
                >
                  {text}
                </label>
                <span className={classes['click_this']}>
                  &times;
                </span>
              </li>
            );
          })
        }
      </ul>
  </div>
);