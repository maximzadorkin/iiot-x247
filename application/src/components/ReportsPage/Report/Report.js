import React from 'react';
import QuizHeader from '../QuizHeader/QuizHeader.js';
import Keys from '../../../Functions/Keys.js';
import customClasses from './Report.module.css';

class Report extends React.Component {

  parseTable = (content) => {
    const lines = [];
    for (let i = 0; i < content.length; i += 1) {
      const line = [];
      const lineContent = Object.values(content[i]);
      for (let j = 0; j < lineContent.length; j += 1) {
        const textOfCell = lineContent[j];
        const cell = <td key={Keys.getRandomKey()} className={customClasses.cell}>{textOfCell}</td>;
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
      <div className={customClasses.screen}>
        <QuizHeader
          showNext={false}
          btnToStartHandle={this.props.btnToStartHandle}
          btnBackHandle={this.props.btnBackHandle}
        />
        <select className={customClasses.tab}>
          <option defaultValue className={customClasses.pane}>Отчет</option>
          <option defaultValue className={customClasses.pane}>Характеристики</option>
          <option defaultValue className={customClasses.pane}>Слои</option>
        </select>
        <div className={customClasses.tableWrap}>
          {this.parseTable(this.props.report.content)}
        </div>
      </div>
    );
  }
}
export default Report;