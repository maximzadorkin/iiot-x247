import React from 'react';
import bootstrap from '../../../bootstrap.module.css';

const wrap = {
  height: '100%',
  display: 'flex',
  justifyContent: 'space-around',
  alignContent: 'space-around',
  flexWrap: 'wrap'
}
const newReportButtonStyle = {
  backgroundColor: '#0099ff',
  color: '#fff'
}
const newReportButtonClasses = [
  bootstrap['btn'],
  bootstrap['shadow']
];
const favoritesButtonClasses = [
  bootstrap['btn'],
  bootstrap['btn-warning'],
  bootstrap['text-white'],
  bootstrap['shadow']
]

export default (props) => (
  <div style={wrap}>
    <button 
      style={newReportButtonStyle}
      className={newReportButtonClasses.join(' ')}
      onClick={() => props.nextHandle('new_report')}
    >
      Создать новый отчет
    </button>
    <button
      className={favoritesButtonClasses.join(' ')}
      onClick={() => props.nextHandle('favorite_report')}
    >
      Загрузить из избранного
    </button>
  </div>
);