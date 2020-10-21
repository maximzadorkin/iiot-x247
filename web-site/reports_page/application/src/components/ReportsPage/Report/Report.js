import React from 'react';
import axios from 'axios';
import QuizHeader from '../QuizHeader/QuizHeader.js';
import Keys from '../../../Functions/Keys.js';
import FileDownload from '../../FileDownload/FileDownload.js';
import css from './Report.module.css';

class Report extends React.Component {

  parseTable = (content) => {
    const lines = [];
    for (let i = 0; i < content.length; i += 1) {
      const line = [];
      const lineContent = Object.values(content[i]);
      for (let j = 0; j < lineContent.length; j += 1) {
        const textOfCell = lineContent[j];
        const cell = <td key={Keys.getRandomKey()} className={css.cell}>{textOfCell}</td>;
        line.push(cell);
      }
      lines.push(<tr key={Keys.getRandomKey()}>{line}</tr>)
    }
    const tbody = <tbody>{lines}</tbody>;
    const table = <table>{tbody}</table>;
    return table;
  }

  render() {
    return (
      <div className={css.screen}>
        <QuizHeader
          showNext={false}
          btnToStartHandle={this.props.btnToStartHandle}
          btnBackHandle={this.props.btnBackHandle}
        />
        <div className={css.header}>
          <select className={css.tab}>
            <option defaultValue className={css.pane}>Отчет</option>
            <option defaultValue className={css.pane}>Характеристики</option>
            <option defaultValue className={css.pane}>Слои</option>
          </select>
          <button
            className={css.download}
            onClick = { 
              () => axios.post(`http://dcorpse.keenetic.pro/api/EDSChart/file.xlsx/?`, this.props.report.post)
                .then(response => FileDownload(response))
            }
          >
            <small style={{fontFamily: 'ElegantIcons', fontSize: '15px'}}>&#xe092;</small> 
          </button>
        </div>
        <div className={css.tableWrap}>
          {this.parseTable(this.props.report.content)}
        </div>
      </div>
    );
  }
}
export default Report;