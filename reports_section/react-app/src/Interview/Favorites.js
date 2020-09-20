import React, { Component } from 'react';
import Modal from '../Modal/Modal';
import arrowDown from './ArrowDown.svg';

class Favorites extends Component {

  state = {
    isShowModal: false
  }

  openModal = () => {
    this.setState({isShowModal: true});
  }
  closeModal = () => {
    this.setState({isShowModal: false});
  }

  FavoritesList() {
    return (
      <div className="form-group">
          <label className="lead text-warning">Избранное</label>
          <select className="form-control mb-1" size="5">
            { this.props.favorites.map(text => <option>{text}</option>) }
          </select>
          <button type="button" className="btn btn-dark mr-1">Загрузить</button>
          <button type="button" className="btn btn-danger">Удалить из избранного</button>
      </div>
    );
  }

  render() {
    if (!this.props.isMobile)
      return <div className="col-6">{this.FavoritesList()}</div>;

    if (this.state.isShowModal)
      return <Modal contents={this.FavoritesList()} closeModal={this.closeModal}/>;

    return (
      <div className="container text-right">
        <button 
          type = "button"
          className = "btn btn-outline-warning text-body"
          onClick = {this.openModal}>
          Избранное
          <img src={arrowDown} alt="Открыть избранное"/>
        </button>
      </div>
    );  
  }
}

export default Favorites;