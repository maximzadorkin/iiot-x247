import React from 'react';
import bootstrap from '../../../bootstrap.module.css';
import classes from './ReportHeader.module.css';
import download from './download.svg';

/* 
props
  .isMobile
    description: this is mobile screen width?
    type: bool
  .title
    description: title of report
    type: string
  .closeReport
    description: close report
    type: function
*/

export default (props) => (
  <div className={[
    classes['report_main'],
    bootstrap['row'],
    bootstrap['align-items-center'],
    bootstrap['border-bottom']
  ].join(' ')}>
      <span className={[
        bootstrap['col-6'],
        bootstrap['col-md-5'],
        bootstrap['col-xl-8'],
        bootstrap['lead'],
        classes['text-hidden']
      ].join(' ')}>
        {props.title}
      </span>
      <div className={[
        bootstrap['col-6'],
        bootstrap['col-md-7'],
        bootstrap['col-xl-4'],
        bootstrap['mb-1'],
        bootstrap['d-flex'],
        bootstrap['justify-content-end']
      ].join(' ')}>
        {/* {
          <button 
            className={[
              bootstrap['btn'],
              bootstrap['btn-light'],
            ].join(' ')}
            onClick={props.reportToFullScreen}
          >
            &#8597;
          </button>
        } */}
        <button type="button" className={[bootstrap['mr-2'], bootstrap.btn, bootstrap['btn-success']].join(' ')}>
          {props.isMobile ? <img className={classes.icon} src={download} alt='Скачать отчет' /> : 'Скачать отчет'}
        </button>
        <button type="button" className={[bootstrap['mr-2'], bootstrap.btn, bootstrap['btn-outline-warning']].join(' ')} disabled>
          {props.isMobile ? '+' : '+ в избранное'}
        </button>
        <button className={[bootstrap.btn, bootstrap['btn-danger']].join(' ')} onClick={props.closeReport}>
          <span>&times;</span>
        </button>
      </div>
  </div>
);
