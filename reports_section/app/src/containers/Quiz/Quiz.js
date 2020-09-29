import React from 'react';
import bootstrap from '../../bootstrap.module.css';
import QuizActive from '../../components/QuizActive/QuizActive.js';

/*
props
  .isMobile
    description: this is mobile screen width?
    type: bool
*/
export default (props) => {
  const classes = {
    section: [
      bootstrap.container,
      bootstrap['mb-2'],
      bootstrap['border'],
      bootstrap['rounded'],
      bootstrap['bg-light'],
      bootstrap['shadow-sm']
    ].join(' ')
  };
  return (
    <section className={classes.section}>
        <QuizActive
          isMobile={props.isMobile}

          openReport={props.openReport}
          closeReport={props.closeReport}

          stepHandler={props.stepHandler}
          activeStep={props.activeStep}
          backToStartStep={props.backToStartStep}
          backOneStep={props.backOneStep}

          types={props.types}
          activeType={props.activeType}
          setActiveType={props.setActiveType}

          categories={props.categories}
          activeCategory={props.activeCategory}
          setActiveCategory={props.setActiveCategory}

          labelsSpecifications={props.labelsSpecifications}
          setActiveSpecifications={props.setActiveSpecifications}
          foundItemsSpecs={props.foundItemsSpecs}

          setTimesPeriod={props.setTimesPeriod}

          
          areAllFill={props.areAllFill}
          search={props.search}
        />
    </section>
  );
};