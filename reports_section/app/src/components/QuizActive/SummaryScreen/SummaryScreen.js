import React from 'react';
import bootstrap from '../../../bootstrap.module.css';

export default () => (
  <div className={bootstrap['mb-2']}>
    <div className={[bootstrap['container'], bootstrap['row']].join(' ')}>
      <p className={[bootstrap['mb-2'], bootstrap['col-12'], bootstrap['p-0']].join(' ')}>Выбрать период:</p>
      <input type="date" className={[bootstrap['form-control'], bootstrap['form-control-sm'], bootstrap['col-5']].join(' ')}/>
      <p className={[bootstrap['col-2'], bootstrap['text-center']].join(' ')}>-</p>
      <input type="date" className={[bootstrap['form-control'], bootstrap['form-control-sm'], bootstrap['col-5']].join(' ')}/>
    </div>
  </div>
);