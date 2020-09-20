import React from 'react';
import bootstrap from '../../bootstrap.module.css';
import classes from './Header.module.css';
import menu_button from './menu_button.svg';
import personalPage_button from './personal-page_button.svg';

// Получить ссылку на личный кабинет.
/*
props
  .isMobile
    description: this is mobile screen width?
    type: bool
*/
export default (props) => {
  const headerClasses = [
    classes.header,
    bootstrap['row'],
    bootstrap['align-items-center'],
    bootstrap['mb-3']
  ];
  const menuClasses = [
    bootstrap['col-2'],
    bootstrap['d-flex'],
    bootstrap['justify-content-start']
  ];
  const titleClasses = [
    bootstrap['col-8'],
    bootstrap['d-flex'],
    bootstrap['justify-content-center'],
  ];
  const personalRoomClasses = [
    bootstrap['col-2'],
    bootstrap['d-flex'],
    bootstrap['justify-content-end']
  ];
  const imgClasses = [
    bootstrap['img-fluid'],
    bootstrap['rounded'],
    classes.click_this,
    classes.icon
  ];

  if (props.isMobile) titleClasses.push(bootstrap['h3']);
  else titleClasses.push(bootstrap['h1']);

  return (
    <header className={headerClasses.join(' ')}>
      <div className={menuClasses.join(' ')}>
        <img src={menu_button} alt="Меню" className={imgClasses.join(' ')}/>
      </div>
      <h1 className={titleClasses.join(' ')}>Отчеты</h1>
      <a href={null} className={personalRoomClasses.join(' ')}>
        <img src={personalPage_button} alt="Личный кабинет" className={imgClasses.join(' ')}/>
      </a>
      <div className={[bootstrap['w-100'], bootstrap['border-bottom']].join(' ')} />
    </header>
  );

}