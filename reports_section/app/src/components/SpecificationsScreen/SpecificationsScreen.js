import React from 'react';
import bootstrap from '../../bootstrap.module.css';
import SearchSelect from '../SearchSelect/SearchSelect.js';

class SpecificationsScreen extends React.Component {

  state = {
    steps: [],
    items: []
  }

  classes = {
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
      bootstrap['w-100'],
      bootstrap['btn'],
      bootstrap['btn-success']
    ].join(' ')
  };

  componentDidMount = () => {
    console.log(this.props.labelsSpecifications)
    const steps = this.props.labelsSpecifications.map((label, index) => ({
      name: label,
      search: false,
      activeItem: '',
      button: (
        <button
          className={this.classes.stepButton}
          onClick={this.setSearchActive}
          data-step-name={label}
          key={`${Math.floor(Math.random() * 100000)}`}
        >
          {`${label}: ${this.activeItem}`}
        </button>
      ),
      select: (
        <SearchSelect
          heightFinder={'100px'}
          closeButton={true}
          closeButtonHandler={this.clearStepsActive}
          label={label}
          activeItem={this.activeItem}
          setActive={(value) => this.setActive(this.name, value)}
          search={this.props.search}
          itemsToSelect={this.props.foundItemsSpecs}
          key={`${Math.floor(Math.random() * 100000)}`}
        />
      )
    }));
    this.setState({
      steps
    });
  }

  clearStepsActive = () => {
    this.setState({
      steps: this.state.steps.map(el => ({
        ...el,
        search: false
      }))
    });
  }

  addItem() {
    const newItem = this.state.steps
      .map(el => el.activeItem)
      .join(', ');
    this.setState({
      items: this.state.items.concat(newItem)
    });
    this.clearStepsActive();
  }

  setActive(value, stepName) {
    const updateSteps = this.state.steps.map(step => 
      step.name === stepName
      ? ({
        ...step,
        search: true,
        activeItem: value
      })
      : step
    );
    this.setState({steps: updateSteps});
    // this.setSearchDisable();
  }

  setSearchActive = event => {
    const stepName = event.target.getAttribute('data-step-name');
    const steps = this.state.steps
      .map(step => step.name === stepName
        ? {...step, search: true}
        : {...step, search: false}
      );
    this.setState({steps});
  }

  setSearchDisable = () => {
    const steps = this.state.steps
      .map(step => ({ name: step.name, search: false, active: step.active }));
    this.setState({steps});
  }

  componentWillUnmount() {
    this.props.setActiveSpecifications(this.state.items);
  }

  render() {
    
    return (
      <div>
        <div className={this.classes.stepsWrap} style={{height: '280px'}}>
          {
            this.state.steps.map(item => item.search ? item.select : item.button)
          }
        </div>
        {
          this.state.steps.filter(el => el.activeItem === '').length === 0
          ? <button
              className={this.classes.btn}
              onClick={this.addItem}
            >
              +
            </button>
          : null
        }
        <ul className={this.classes.ulSelected} style={{height: '100px'}}>
        {
          this.state.items.map(text =>
            <li className={bootstrap['border-bottom']}>{text}</li>)
        }
        </ul>
      </div>
    );
  }
}
export default SpecificationsScreen;