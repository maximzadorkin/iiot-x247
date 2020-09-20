import React, { Component } from 'react';
import Favorites from './Favorites';
import Report from '../Report/Report';

class Interview extends Component {

  state = {
    interview: {
      types: ['1', '2', '3'],
      criteria: ['1', '2', '3']
    },
    favorites: ['1', '2', '3', '4', '5', '6', '7', 'lol'],
    showReport: false,
    report: {
      title: 'name_of_the_report',
      layers: [
        'layer_1',
        'layer_2',
        'layer_3',
        'layer_4',
        'layer_5 ,sdfpsdj fpsdj pdsjfp s fsdf sdf sd sd sdf hyrtyu ytuftghjf ',
        'layer_6',
        'layer_7',
      ],
      specifications: [
        'sad gffds opiewr jklsdf',
        'fsdf lkju power poi ',
        'sad gffds opiewr jklsdf',
        'sad gffds opiewr jklsdf',
        'sad gffds opiewr jklsdf'
      ]
    },
  };

  Selects(name, elements) {
    const options = [];

    elements.forEach((el, index) => {
      if (index === 0) options.push(<option selected key={index}>{el}</option>);
      else options.push(<option value = { index } key={index}>{el}</option>);
    });

    return (
      <div className="mb-2">
        <label className="mr-sm-2" >{name}</label>
        <select className="custom-select" >{options}</select>
      </div>
    );
  }

  InterviewNew(isMobile) {
    let divClasses;
    if (isMobile) divClasses = 'col-12';
    else divClasses = 'col-6 border-right';

    return (
      <div className={divClasses}>
        { 
          [ this.Selects('Выбрать тип:', this.state.interview.types),
            this.Selects('Выбрать критерий:', this.state.interview.criteria) ] 
        }

        <div className="container row">
          <p className="mb-2 col-12 p-0">Выбрать период:</p>
          <input type="date" className="form-control form-control-sm col-5"/>
          <p className="col-2 text-center">-</p>
          <input type="date" className="form-control form-control-sm col-5"/>
        </div>
      </div>
    );
  }

  createReport = () => {
    // получение данных и тд
    this.setState({showReport: true});
  }
  closeReport = () => this.setState({showReport: false});

  render() {
    const isMobile = document.body.clientWidth < 1024;
    return (
      <React.Fragment>
        <section className="row mb-3">
          {this.InterviewNew(isMobile)}
          <Favorites isMobile={isMobile} favorites={this.state.favorites} />
        </section>

        <button 
          type="button"
          className="btn btn-primary d-block mx-auto mb-5"
          onClick={this.createReport}>
          Сформировать отчет
        </button>

        <Report 
          show={this.state.showReport} 
          report={this.state.report}
          isMobile={isMobile}
          closeReport={this.closeReport} /> 
      </React.Fragment>
    );
  }
}

export default Interview;
