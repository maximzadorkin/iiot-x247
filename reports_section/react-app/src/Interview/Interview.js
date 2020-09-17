import React, { Component } from 'react';
import Modal from '../Modal';
import arrowDown from './ArrowDown.svg';

export class Interview extends Component {

  state = {
    interview: {
      types: ['1', '2', '3'],
      criteria: ['1', '2', '3']
    },
    favorites: ['1', '2', '3', '4', '5', '6', '7', 'lol'],
    modalFavoritesShow: false
  };

  Selects(name, elements) {
    const options = [];
    elements.forEach((el, index) => {
      if (index === 0)
        options.push(<option selected key={index}>{ el }</option>);
      else
        options.push(<option value = { index } key={index}>{ el }</option>);
    });

    return (
      <div className = "mb-2">
        <label className = "mr-sm-2" > { name } </label>
        <select className = "custom-select" > { options } </select>
      </div>
    );
  }

  InterviewNew(isHidden) {
    let divClasses;
    if (isHidden) divClasses = 'col-12';
    else divClasses = 'col-6 border-right';

    return (
      <div className = { divClasses }>
        {
          [
            this.Selects('Выбрать тип:', this.state.interview.types),
            this.Selects('Выбрать критерий:', this.state.interview.criteria)
          ]
        }

        <div className = "container row">
          <p className = "mb-2 col-12 p-0">Выбрать период:</p>
          <input 
            type="date"
            className = "form-control form-control-sm col-5"
          />
          <p className = "col-2 text-center">-</p>
          <input
            type="date"
            className = "form-control form-control-sm col-5"
          />
        </div>
      </div>
    );
  }

  ModalFavorites() {
    
    Modal()

    return (
      
    );
  }

  InterviewFavorites(hidden) {
    if (hidden) {
      return (
        <div className = "container text-right">
          <button 
            type = "button"
            className = "btn btn-outline-warning text-body"
            onClick = { () => {
              this.setState({ modalFavoritesShow: true })
            } }>
            Избранное
            <img src={ arrowDown } alt="Открыть избранное"/>
          </button>
        </div>
      );  
    }

    return (
      <div className = "col-6">
        <div className = "form-group">
          <label className = "lead text-warning">Избранное</label>
          <select 
            className = "form-control mb-1"
            size="5">
            { this.state.favorites.map(text => <option>{text}</option>) }
          </select>
          <button type = "button" className = "btn btn-dark mr-1">Загрузить</button>
          <button type = "button" className = "btn btn-danger">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    );
  }

  render() {
    const hidden = document.body.clientWidth < 1024;
    return (
      <React.Fragment>
        <section className = "row mb-3">
        { 
          [
            this.InterviewNew(hidden),
            this.InterviewFavorites(hidden)
          ] 
        }
        </section>

        <button type="button" className="btn btn-primary d-block mx-auto mb-5">Сформировать отчет</button>

        { this.state.modalFavoritesShow ? this.ModalFavorites() : null }
      </React.Fragment>
    );
  }
}

