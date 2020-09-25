import React from 'react';
import bootstrap from '../../bootstrap.module.css';
import QuizActive from '../../components/QuizActive/QuizActive.js';

export default (props) => (
  <section className={
    [
      bootstrap.container,
      bootstrap['border'],
      bootstrap['rounded'],
      bootstrap['bg-light'],
      bootstrap['shadow-sm'],
    ].join(' ')}
  >
      <QuizActive isMobile={props.isMobile} />
  </section>
);