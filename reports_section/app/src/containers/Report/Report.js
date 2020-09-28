import React from 'react';
import bootstrap from '../../bootstrap.module.css';
import customClasses from './Report.module.css';
import ReportHeader from '../../components/Report/ReportHeader/ReportHeader.js';
import ReportLayers from '../../components/Report/ReportLayers/ReportLayers.js';
import ReportSpecifications from '../../components/Report/ReportSpecifications/ReportSpecifications.js';

/*
props
  .isMobile
    description: this is mobile screen width?
    type: bool
  .title
    description: title of report
    type: string
  .layers
    description:
    type:
  .specifications
    description:
    type:
  .main
    description:
    type:
  .closeReport
    description: close report
    type: function
*/

const changeCheckbox = (event) => {
  console.log(event.target.getAttribute('data-layers-key'))
};

export default (props) => {
  const classes = {
    section: [
      customClasses.reports,
      bootstrap.container,
      bootstrap['mb-2'],
      bootstrap.rounded,
      bootstrap.border,
      bootstrap.shadow,
      bootstrap['bg-light'],
    ].join(' '),
    groupSmallBlocks:[
      props.isMobile ? 
        bootstrap['w-100']
        :  
          [
            bootstrap['col-3'],
            bootstrap['border-right'],
            bootstrap['p-0']
          ].join(' ') 
    ].join(' ')
  };

  return (
    <section className={classes.section}>
      <ReportHeader 
        title={props.report.title}
        isMobile={props.isMobile}
        closeReport={props.closeReport}
      />
      <div className={bootstrap.row}>
        <div className={classes.groupSmallBlocks}>
          <ReportLayers 
            layers={props.report.layers} 
            changeCheckbox={changeCheckbox} 
          />
          <ReportSpecifications specifications={props.report.specifications} />
        </div>
        {
          !props.isMobile ? 
            <div className={bootstrap['col-9']}>
              {props.main}
            </div>
          : null
        }
      </div>
    </section>  
  );
};