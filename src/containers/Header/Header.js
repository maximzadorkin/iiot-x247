import React from 'react';
import bootstrap from '../../bootstrap.module.css';
import customClasses from './Header.module.css';
import menu_button from './menu_button.svg';
import personalPage_button from './personal-page_button.svg';

// Получить ссылку на личный кабинет.
const linkToPersonal = null;

/*
props
  .isMobile
    description: this is mobile screen width?
    type: bool
*/
export default (props) => {

  const classes = {
    header: [
      customClasses.header,
      bootstrap['row'],
      bootstrap['align-items-center'],
      bootstrap['mb-3']
    ].join(' '),
    menu: [
      bootstrap['col-2'],
      bootstrap['d-flex'],
      bootstrap['justify-content-start']
    ].join(' '),
    title: [
      bootstrap['col-8'],
      bootstrap['d-flex'],
      bootstrap['justify-content-center'],
      props.isMobile ?
        bootstrap['h3']
        : bootstrap['h1']
    ].join(' '),
    personalRoom: [
      bootstrap['col-2'],
      bootstrap['d-flex'],
      bootstrap['justify-content-end']
    ].join(' '),
    img: [
      bootstrap['img-fluid'],
      bootstrap['rounded'],
      customClasses.click_this,
      customClasses.icon
    ].join(' '),
    hr: [
      bootstrap['w-100'],
      bootstrap['border-bottom']
    ].join(' ')
  };

  return (
    <header className={classes.header}>
      <div className={classes.menu}>
        <img 
          src={menu_button}
          alt='Меню'
          className={classes.img}
        />
      </div>
      <h1 className={classes.title}>
        Отчеты
      </h1>
      <a
        href={linkToPersonal}
        className={classes.personalRoom}
      >
        <img
          src={personalPage_button}
          alt='Личный кабинет'
          className={classes.img}
        />
      </a>
      <div className={classes.hr} />
    </header>
  );

}