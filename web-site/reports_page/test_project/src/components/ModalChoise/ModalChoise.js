import React from 'react';
import bootstrap from '../../bootstrap.module.css';
import customClasses from './ModalChoise.module.css';

export default (props) => {
  const styles = {
    wrap: {
      height: '100vh',
      width: '100vw',
      backgroundColor: '#eee',
      position: 'fixed',
      top: 0,
      left: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    block: {
      width: '250px',
      minHeight: '250px',
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderRadius: '10px',
      overflow: 'auto'
    },
    btns: {
      width: '90%',
      display: 'flex',
      justifyContent: 'space-around'
    },
    btn: {
      width: '100px'
    }
  }
  const classes = {
    wrap: [
      customClasses.modalAnimation
    ].join(' '),
    ok: [
      bootstrap['btn'],
      bootstrap['btn-success']
    ].join(' '),
    cancel: [
      bootstrap['btn'],
      bootstrap['btn-danger']
    ].join(' ')
  }
  return (
    <div
      style={styles.wrap}
      className={classes.wrap}
    >
      <div style={styles.block}>
        <label
          style={{textAlign: 'center'}}
          className={bootstrap['lead']}
        >
          {props.label}
        </label>
        <div style={styles.btns}>
          <button 
            className={classes.ok}
            style={styles.btn}
            onClick={props.ok}
          >
            Ок
          </button>
          <button
            className={classes.cancel}
            style={styles.btn}
            onClick={props.cancel}
          >
            Отменить
          </button>
        </div>
      </div>
    </div>
  );
};