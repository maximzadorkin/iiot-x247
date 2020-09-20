import React from 'react';
import bootstrap from '../../bootstrap.module.css';
import classes from './Report.module.css';
import ReportHeader from '../../components/ReportHeader/ReportHeader.js';
import ReportLayers from '../../components/ReportLayers/ReportLayers.js';
import ReportSpecifications from '../../components/ReportSpecifications/ReportSpecifications.js';

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
const mobileReport = (props) => (
  <React.Fragment>
    <div className={[
      bootstrap['w-100'],
    ].join(' ')}>
      <div className={[
        classes['small-block'],
        bootstrap['overflow-auto'],
        bootstrap['border-bottom'],
        bootstrap['border-secondary']
      ].join(' ')}>
        <ReportLayers layers={props.layers} changeCheckbox={changeCheckbox} />
      </div>
      <div className={[
        classes['small-block'],
        bootstrap['overflow-auto']
      ].join(' ')}>
        <ReportSpecifications specifications={props.specifications} />
      </div>
    </div>
  </React.Fragment>
);
const desktopReport = (props) => (
  <React.Fragment>
    <div className={[
      bootstrap['col-3'],
      bootstrap['border-right'],
      bootstrap['border-secondary'],
      bootstrap['p-0']
    ].join(' ')}>
      <div className={[
        classes['small-block'],
        bootstrap['overflow-auto'],
        bootstrap['border-bottom'],
        bootstrap['border-secondary']
      ].join(' ')}>
        <ReportLayers layers={props.layers} changeCheckbox={changeCheckbox} />
      </div>
      <div className={[
        classes['small-block'],
        bootstrap['overflow-auto']
      ].join(' ')}>
        <ReportSpecifications specifications={props.specifications} />
      </div>
    </div>
    <div className={bootstrap['col-9']}>{props.main}</div>
  </React.Fragment>
);
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
        { props.isMobile ? mobileReport(props) : desktopReport(props) } 
      </div>
    </section>  
  );
};