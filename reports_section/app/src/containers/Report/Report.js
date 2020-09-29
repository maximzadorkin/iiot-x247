import React from 'react';
import bootstrap from '../../bootstrap.module.css';
import customClasses from './Report.module.css';
import ReportHeader from '../../components/Report/ReportHeader/ReportHeader.js';
import ReportLayers from '../../components/Report/ReportLayers/ReportLayers.js';
import ReportSpecifications from '../../components/Report/ReportSpecifications/ReportSpecifications.js';

/*
props
  .isMobile
    description: this is mobile screen width?
    type: bool
  .title
    description: title of report
    type: string
  .layers
    description:
    type:
  .specifications
    description:
    type:
  .main
    description:
    type:
  .closeReport
    description: close report
    type: function
*/

class Report extends React.Component {

  changeCheckbox = (event) => {
    console.log(event.target.getAttribute('data-layers-key'))
  };
  
  state = {
    reportStyles: {
      height: '100%',
      position: 'relative'
    }
  }
  
  getRandomKey = () => {
    return `${Math.floor(Math.random() * 100000)}`;
  }
  parseTable = (content) => {

    const styles = {
      cell: {
        padding: '5px 5px 0px 5px',
        border: '1px solid #dee2e6',
        borderRadius: '1px'
      },
      line: {},
      table: {}
    };
    const lines = [];
    for (let i = 0; i < content.length; i += 1) {
      const line = [];
      for (let j = 0; j < content[i].length; j += 1) {
        const textOfCell = content[i][j];
        const cell = <td key={this.getRandomKey} style={styles.cell}>{textOfCell}</td>;
        line.push(cell);
      }
      lines.push(<tr key={this.getRandomKey}>{line}</tr>)
    }
    const tbody = <tbody>{lines}</tbody>;
    const table = <table>{tbody}</table>;
    return table;
  }
  // reportToFullScreen = () => {
  //   this.setState({reportStyles: {
  //     position: 'absolute',
  //     height: '100vh',
  //     width: '100wh',
  //   }})
  // }
  render () {
    const classes = {
      section: [
        customClasses.reports,
        bootstrap.container,
        bootstrap['mb-2'],
        bootstrap.rounded,
        bootstrap.border,
        bootstrap.shadow,
        bootstrap['bg-light'],
      ].join(' '),
      groupSmallBlocks:[
        this.props.isMobile ? 
          bootstrap['w-100']
          :  
            [
              bootstrap['col-3'],
              bootstrap['border-right'],
              bootstrap['p-0']
            ].join(' ') 
      ].join(' ')
    };
    return (
      <section className={classes.section}>
        <ReportHeader 
          title={this.props.report.title}
          isMobile={this.props.isMobile}
          closeReport={this.props.closeReport}
          // reportToFullScreen={this.reportToFullScreen}
        />
        <div className={bootstrap.row} style={{ height: '399px' }}>
          <div className={classes.groupSmallBlocks}>
            <ReportLayers 
              layers={this.props.report.layers} 
              changeCheckbox={this.changeCheckbox} 
            />
            <ReportSpecifications specifications={this.props.report.specifications} />
          </div>
          {
            !this.props.isMobile ? 
              <div className={[bootstrap['col-9'], bootstrap['overflow-auto'], bootstrap['p-0']].join(' ')}
                style={this.state.reportStyles}
              >
                {this.parseTable(this.props.report.content)}
              </div>
            : null
          }
        </div>
      </section>  
    );
  }
}
export default Report;