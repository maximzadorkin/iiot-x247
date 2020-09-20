import React from 'react';
import bootstrap from '../../bootstrap.module.css';
import Selects from '../Selects/Selects.js';

/*
props
  .types
    description: received list of types
    type: Array[string, string...]
  .criterions
    description: received list of criterions
    type: Array[string, string...]
*/
export default (props) => (
  <React.Fragment>
    <Selects name='Выбрать тип:' children={props.types} />
    <Selects name='Выбрать критерий:' children={props.criterions} />
    <div className={[bootstrap.container, bootstrap.row].join(' ')}>
      <p className={[bootstrap['col-12'], bootstrap['mb-2'], bootstrap['p-0']].join(' ')}>Выбрать период:</p>
      <input type="date"
        className={[
          bootstrap['col-5'],
          bootstrap['form-control'],
          bootstrap['form-control-sm']
        ].join(' ')}/>
      <p className={[bootstrap['col-2'], bootstrap['text-center']].join(' ')}>-</p>
      <input type="date" 
        className={[
          bootstrap['col-5'],
          bootstrap['form-control'],
          bootstrap['form-control-sm']
        ].join(' ')}/>
    </div>
  </React.Fragment>
);