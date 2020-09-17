import React, { Component } from 'react';
import menu_btn from './menu_button.svg';
import personal from './personal-page_button.svg';

export class Header extends Component {

  render() {

    //  получить ссылку ЛИЧНОЙ СТРАНИЦЫ
    const linkToPersonalRoom = '';

    const width = document.body.clientWidth;
    const h1Classes = ['col-8', 'd-flex', 'justify-content-center'];
    if (width < 768) {
      h1Classes.push('h3')
    } else {
      h1Classes.push('h1');
    }

    return (
      <header 
        className = "header row align-items-center mb-3" >

        <div 
          className = "col-2 d-flex justify-content-start">
            <img
              className = "img-fluid click_this rounded"
              src = { menu_btn }
              alt = "Кнопка меню" />
        </div>

        <h1
          className = { h1Classes.join(' ') } >
          { this.props.section }
        </h1>

        <a
          href = { linkToPersonalRoom }
          className = "col-2 d-flex justify-content-end" >

          <img 
            className = "img-fluid click_this"
            src = { personal }
            alt = "Перейти на персональную страницу" />
        </a>

        <div className = "w-100 border-bottom" />
      </header>
    );
  }
}