import React from 'react';
import bootstrap from '../../bootstrap.module.css';
import classes from './Report.module.css';
import ReportHeader from '../../components/Report/Report_Header/Report_Header.js';
import ReportLayers from '../../components/Report/Report_Layers/Report_Layers.js';
import ReportSpecifications from '../../components/Report/Report_Specifications/Report_Specifications.js';

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
  let groupOfSmallBlocksClasses = [
    
  ];
  if (props.isMobile) groupOfSmallBlocksClasses.unshift(bootstrap['w-100']);
  else groupOfSmallBlocksClasses.unshift();

  return (
    <section className={[
      classes.reports,
      bootstrap.container,
      bootstrap['mb-2'],
      bootstrap.rounded,
      bootstrap.border,
      bootstrap['border-secondary']
    ].join(' ')}>
      <ReportHeader title={props.title} isMobile={props.isMobile} closeReport={props.closeReport}/>
      <div className={bootstrap.row}>
        <div className={
          props.isMobile ? bootstrap['w-100']
          : [ bootstrap['col-3'],
              bootstrap['border-right'],
              bootstrap['border-secondary'],
              bootstrap['p-0'] ].join(' ')
        }>
          <div className={[
            classes['small-block'],
            bootstrap['overflow-auto'],
            bootstrap['border-bottom'],
            bootstrap['border-secondary']
          ].join(' ')}>
            <ReportLayers layers={props.layers} 
              changeCheckbox={changeCheckbox} 
            />
          </div>
          <div className={[
            classes['small-block'],
            bootstrap['overflow-auto']
          ].join(' ')}>
            <ReportSpecifications specifications={props.specifications} />
          </div>
        </div>
        { !props.isMobile ? <div className={bootstrap['col-9']}>{props.main}</div> : null }
      </div>
    </section>  
  );
};