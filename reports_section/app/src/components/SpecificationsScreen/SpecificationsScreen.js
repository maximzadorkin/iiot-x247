import React from 'react';
import bootstrap from '../../bootstrap.module.css';
import SearchSelect from '../SearchSelect/SearchSelect.js';

class SpecificationsScreen extends React.Component {

  state = {
    steps: this.props.labelsSpecifications.map(el => (
      {
        name: el,
        search: false,
        active: ''
      }
    )),
    actives: []
  }

  setActive(value, stepName) {  //////////////////////////////////
    const updateSteps = this.state.steps.map(step => 
      step.name === stepName
      ? ({name: step.name, search: true, active: value})
      : step
    );
    this.setState({steps: updateSteps});
    // this.setSearchDisable();
  }

  setSearchActive = event => {
    const stepName = event.target.getAttribute('data-step-name');
    const steps = this.state.steps
      .map(step => step.name === stepName
        ? { name: step.name, search: true, active: step.active }
        : { name: step.name, search: false, active: step.active }
      );
    this.setState({steps});
  }

  setSearchDisable = () => {
    const steps = this.state.steps
      .map(step => ({ name: step.name, search: false, active: step.active }));
    this.setState({steps});
  }

  render() {
    const classes = {
      stepsWrap: [
        bootstrap['w-100'],
        bootstrap['border'],
        bootstrap['p-2'],
        bootstrap['overflow-auto']
      ].join(' '),  
      stepButton: [
        bootstrap['btn'],
        bootstrap['btn-link'],
        bootstrap['p-0'],
        bootstrap['w-100'],
        bootstrap['text-left']
      ].join(' '),
      ulSelected: [
        bootstrap['list-unstyled'],
        bootstrap['mt-2'],
        bootstrap['mb-0'],
        bootstrap['border'],
        bootstrap['rounded'],
        bootstrap['overflow-auto']
      ].join(' '),
      btn: [
        bootstrap['btn'],
        bootstrap['btn-success']
      ].join(' ')
    };
    return (
      <div>
        <div className={classes.stepsWrap} style={{height: '280px'}}>
          {
            this.state.steps.map((step, index) => (
              <div key={Math.floor(Math.random() * 10000)}>
                {
                  step.search ?
                    <SearchSelect
                      heightFinder={'100px'}
                      label={step.name}
                      activeItem={step.active}
                      setActive={(value) => this.setActive(step.name, value)}
                      search={this.props.search}
                      itemsToSelect={this.props.foundItemsSpecs}
                    />
                  : (
                    <button
                      className={classes.stepButton}
                      onClick={this.setSearchActive}
                      data-step-name={step.name}
                      key={Math.random() * 100 * index}
                    >
                      {`${step.name}: ${step.active}`}
                    </button>
                  )
                }
              </div>
            ))
          }
        </div>
        {
          this.state.steps.filter(el => el.active === '').length === 0
          ? <button className={classes.btn}>+</button>
          : null
        }
        <ul className={classes.ulSelected} style={{height: '100px'}}>
        {
          this.state.actives.map(text =>
            <li className={bootstrap['border-bottom']}>{text}</li>)
        }
        </ul>
      </div>
    );
  }
}
export default SpecificationsScreen;