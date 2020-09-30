import React from 'react';
import bootstrap from '../../bootstrap.module.css';
import SearchSelect from '../SearchSelect/SearchSelect.js';
import axios from 'axios';

class SpecificationsScreen extends React.Component {

  state = {
    steps: [],
    items: [],
    foundItemsSpecs: []
  }

  classes = {
    stepsWrap: [
      bootstrap['w-100'],
      bootstrap['border'],
      bootstrap['p-2'],
      bootstrap['mb-1'],
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

  dumpStepsActiveItem = () => {
    const steps = this.state.steps.map(item => ({...item, activeItem: ''}));
    this.setState({steps})
  }

  search = (word) => {
    axios.get(`/0?find3=${word}`).then(response => { 
      this.setState({foundItemsSpecs: response})
    })
    .catch(error => {
      this.setState({foundItemsSpecs: [`${Math.random()}`, `${Math.random()}`, `${Math.random()}`]})
    });
  }

  componentDidMount = () => {
    const steps = this.props.labelsSpecifications.map(label => {
      const step = {
        name: label,
        search: false,
        activeItem: ''
      }
      step.button = (
        <button
          className={this.classes.stepButton}
          onClick={this.setSearchActive}
          data-step-name={step.name}
          key={`${Math.floor(Math.random() * 100000)}`}
        >
          {`${label}: ${this.getActiveItemOfStep(step.name)}`}
        </button>
      );
      step.select = (
        <SearchSelect
          heightFinder={'100px'}
          closeButton={true}
          closeButtonHandler={this.setSearchFalse}
          label={label}
          activeItem={step.activeItem}
          setActive={(value) => this.setActive(value)}
          search={this.search}
          getItemsToSelect={this.getItemsToSelect}
          key={`${Math.floor(Math.random() * 100000)}`}
        />
      );
      return step;
    });
    this.setState({
      steps
    });
  }

  getActiveItemOfStep = (stepName) => {
    const step = this.state.steps.filter(el => el.name === stepName)[0];
    if (step) return step.activeItem;
    else return '';
  }

  getItemsToSelect = () => {
    return this.state.foundItemsSpecs;
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

  setSearchFalse = () => {
    this.setState({
      steps: this.state.steps.map(el => ({
        ...el,
        search: false
      }))
    });
  }

  addItem = () => {
    const newItem = this.state.steps
      .map(el => el.activeItem)
      .join(', ');
    this.setState({
      items: this.state.items.concat(newItem)
    });
  }

  setActive(value) {
    const steps = this.state.steps.map(step => 
      step.search
      ? {...step, activeItem: value}
      : step
    );
    this.setState({steps});
  }

  addButtonHandler = () => {
    this.addItem();
    this.dumpStepsActiveItem();
    this.setSearchFalse();
  }
  
  componentWillUnmount() {
    this.props.setActiveSpecifications(this.state.items);
  }

  render() {
    return (
      <div>
        <div className={this.classes.stepsWrap} style={{height: '280px'}}>
          {
            this.state.steps.map(item => {
              return item.search 
              ? (
                <SearchSelect
                  heightFinder={'100px'}
                  closeButton={true}
                  closeButtonHandler={this.setSearchFalse}
                  label={item.name}
                  activeItem={item.activeItem}
                  setActive={(value) => this.setActive(value)}
                  search={this.search}
                  getItemsToSelect={this.getItemsToSelect}
                  key={'1111'}
                />
              )
              : (
                <button
                  className={this.classes.stepButton}
                  onClick={this.setSearchActive}
                  data-step-name={item.name}
                  key={`${Math.floor(Math.random() * 100000)}`}
                >
                  {`${item.name}: ${item.activeItem}`}
                </button>
              );
            })
          }
        </div>
        {
          this.state.steps.filter(el => el.activeItem === '').length === 0
          ? <button
              className={this.classes.btn}
              onClick={this.addButtonHandler}
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