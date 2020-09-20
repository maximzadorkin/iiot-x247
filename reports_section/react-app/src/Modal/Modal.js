import React from 'react';
import './Modal.css';

class Modal extends React.Component {
  render() {
    const spaceBackgroundStyle = {
      position: 'fixed',
      top: '0',
      left: '0',
      height: '100vh',
      width: '100vw'
    };
    const closeButtonStyle = {
      position: 'absolute',
      top: '5px',
      right: '5px'
    };
  
    const blockСlasses = [
      'container',
      'bg-light',
      'border',
      'rounded',
      'p-3'
    ];
    const blockStyle = {
      position: 'relative'
    }
  
    return (
      <div style={spaceBackgroundStyle}
        className="container-fluid d-flex justify-content-center align-items-center bg-light modal">
          <div className={blockСlasses.join(' ')} style={blockStyle}>
            <button className="btn btn-outline-dark" style={closeButtonStyle} onClick={this.props.closeModal}>
              <span>&times;</span>
            </button>
            {this.props.contents}
          </div>
      </div>
    );
  }
}

export default Modal;