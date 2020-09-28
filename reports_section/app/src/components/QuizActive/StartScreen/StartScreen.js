import React from 'react';
import bootstrap from '../../../bootstrap.module.css';

export default (props) => {
  const styles = {
    wrap: {
      height: '100%',
      display: 'flex',
      justifyContent: 'space-around',
      alignContent: 'space-around',
      flexWrap: 'wrap'
    }
  };
  const classes = {
    newReportButton: [
      bootstrap['btn'], 
      bootstrap['btn-secondary'],
      bootstrap['shadow']
    ].join(' '),
    favoritesButton: [
      bootstrap['btn'],
      bootstrap['btn-warning'],
      bootstrap['text-white'],
      bootstrap['shadow']
    ].join(' ')
  };

  return (
    <div style={styles.wrap}>
      <button 
        className={classes.newReportButton}
        onClick={() => props.stepHandler('new_report')}
      >
        Создать новый отчет
      </button>
      <button
        className={classes.favoritesButton}
        onClick={() => props.stepHandler('favorite_report')}
      >
        Загрузить из избранного
      </button>
    </div>
  );
};