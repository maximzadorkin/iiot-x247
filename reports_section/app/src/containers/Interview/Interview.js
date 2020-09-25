import React from 'react';
import bootstrap from '../../bootstrap.module.css';
import InterviewActive from '../../components/InterviewActive/InterviewActive.js';

/*
props
  .isMobile
    description: this is mobile screen width?
    type: bool
*/
export default (props) => (
  <section className={[bootstrap.container, bootstrap.row, bootstrap['m-0']].join(' ')}>
    <form className={bootstrap['m-auto']}>
      <InterviewActive 
        isMobile={props.isMobile}
        types={props.types}
        criterions={props.criterions}/>
    </form>
  </section>
);