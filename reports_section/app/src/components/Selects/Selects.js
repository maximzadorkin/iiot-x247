import React from 'react';
import bootstrap from '../../bootstrap.module.css';

/*
props
  .name
    description: name of Select
    type: string
  .children
    description: things list
    type: Array[string, string...]
*/
export default (props) => {
  const options = [];

  props.children.forEach((element, index) => {
    if (index === 0)
      options.push(<option selected key={index}>{element}</option>);
    else
      options.push(<option value={index} key={index}>{element}</option>);
  });

  return (
    <div className={bootstrap['mb-2']}>
      <label className={bootstrap['mr-sm-2']} >{props.name}</label>
      <select className={bootstrap['custom-select']} >{options}</select>
    </div>
  );
};