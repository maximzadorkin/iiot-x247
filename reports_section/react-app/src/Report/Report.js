import React, { Component } from 'react';

class Report extends Component {

  ReportHeader() {
    return (
      <div className="reports_main row align-items-center border-bottom border-secondary">
          <span className="col- 12 col-md-5 col-xl-8 lead text-primary">
            {this.props.report.title}
          </span>
          <div className="col-12 col-md-7 col-xl-4 d-flex justify-content-end">
            <button type="button" className="btn btn-outline-warning mr-2">
              + в избранное
            </button>
            <button type="button" className="btn btn-success mr-2">
              Скачать отчет
            </button>
            <button className="btn btn-danger" onClick={this.props.closeReport}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
      </div>
    );
  }
  ReportLayers() {
    return (
      <div className="layers border-bottom overflow-auto border-secondary">
        <p className="lead border-bottom text-center p-2">Слои</p>
        <ul className="list-unstyled">
          {
            this.props.report.layers.map((text, index) => {
              const li = ['d-flex', 'align-content-center', 'justify-content-between', 'p-1'];
              if (index + 1 < this.props.report.layers.length) li.push('border-bottom');
              return (
                <li className={li.join(' ')}>
                  <label className="mb-0 p-0">
                    <input 
                      type="checkbox" 
                      className='mr-1' 
                      data-layers-key={index}
                      checked/>
                    {text}
                  </label>
                  <span className="click_this">&times;</span>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
  ReportSpecifications() {
    return (
      <div className="specifications overflow-auto">
        <p className="lead border-bottom text-center p-2">Характеристики</p>
        <ul className="list-unstyled">
          {
            this.props.report.specifications.map((text) => 
            <li className="border-bottom p-1">{text}</li>)
          }
        </ul>
      </div>
    );
  }

  render() {
    if (!this.props.show) return null;
    return (
      <section className="reports container border rounded border-secondary">
        {this.ReportHeader()}
        <div className="report row">
              <div className="information col-3 border-right border-secondary">
                {this.ReportLayers()}
                {this.ReportSpecifications() }
              </div>
              <div className="layout col-9">
              </div>
        </div>
      </section>  
    );
  }
}

export default Report;