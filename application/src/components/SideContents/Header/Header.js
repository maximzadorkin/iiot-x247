import React from 'react';
import customClasses from './Header.module.css';

export default (props) => {
  return (
    <div className={`${customClasses.header} ${customClasses.black}`}>
      <p className={`${customClasses.icon} ${customClasses.click}`}>&#x61;</p>
      <h1>{props.activePageTitle}</h1>
      <a 
        href={props.linkToRoom}
        className={`${customClasses.icon} ${customClasses.click}`}
      >
        &#xe0fc;
      </a>
    </div>
  );
}