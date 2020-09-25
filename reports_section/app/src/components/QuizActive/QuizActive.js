import React from 'react';
import axios from 'axios';
import bootstrap from '../../bootstrap.module.css';
import QuizHeader from './QuizHeader/QuizHeader.js';
import StartScreen from './StartScreen/StartScreen.js';
import FavoritesScreen from './FavoritesScreen/FavoritesScreen.js';
import SelectScreen from './SelectScreen/SelectScreen.js';
import SpecificationsScreen from './SpecificationsScreen/SpecificationsScreen.js';


/*
stages: [
  'start_screen',
  'favorites_screen',
  'types_screen',
  'criterians_screen',
  'adress_screen',
  'summary_screen'
]
*/
class QuizActive extends React.Component {
  
  state = {
    userId: '1',
    activeStage: null,
    lastStages: [],
    activeType: '',
    activeCriterian: '',
    specifications: []
  }

  componentDidMount() {
    this.setState({
      activeStage: 'start_screen'
    });
  }

  setStage = (stage) => {
    this.setState((prevValue) => ({
      activeStage: stage,
      lastStages: [...prevValue.lastStages, prevValue.activeStage]
    }));
  }

  backToStartHandle = () => {
    this.setState({
      activeStage: 'start_screen',
      lastStages: [],
      activeType: '',
      activeCriterian: '',
      specifications: []
    });
  }

  backButtonHandle = () => {
    const stages = this.state.lastStages.filter(el => el !== 'load_screen');
    const lastStage = stages[stages.length - 1];
    const stagesWithoutLast = stages.slice(0, stages.length - 1);
    this.setState({
      activeStage: lastStage,
      lastStages: stagesWithoutLast
    });
  }

  setActiveType = (type) => {
    this.setState({activeType: type});
  }

  setActiveCriterian = (criterian) => {
    this.setState({activeCriterian: criterian});
  }

  nextHandle = (nextStage = null) => {
    const stage = this.state.activeStage;
    
    this.setStage('load_screen');

    switch(stage) {
      case 'start_screen':
        if (nextStage === 'new_report')
          this.setStage('types_screen')
        else
          this.setStage('favorites_screen')
        break;
      case 'types_screen':
        this.setStage('criterians_screen');
        break;
      case 'criterians_screen':
        axios.get(`/0?type=${this.state.activeType}&cat=${this.state.activeCriterian}`)
        .then(response => {
          this.setState({labels: response})
          this.setStage('specifications_screen');
        })
        .catch(error => {
          this.setState({labels: ['address', 'Город', 'Район', 'Улица', 'Дом']})
          this.setStage('specifications_screen');
        })  // УДАЛИТЬ всю строчку
        break;
      case 'specifications_screen':
        this.setStage('summary_screen');
        break;
    }    
  }
  
  render() {
    const containerHeight = { 
      height: '500px'
    };
    const containerClasses = [
      bootstrap['p-2'],
      bootstrap['pt-3'],
      bootstrap['pb-3']
    ].join(' ');

    const loadScreenWrapperStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
    }
    const loadScreenClasses = [
      bootstrap['spinner-grow'],
      bootstrap['text-secondary']
    ].join(' ');

    return (
      <div style={containerHeight} className={containerClasses}>
        { 
          <QuizHeader
            activeStage={this.state.activeStage}
            backButtonHandle={this.backButtonHandle}
            backToStartHandle={this.backToStartHandle}
            nextHandle={this.nextHandle}
          /> 
        }
        {
          this.state.activeStage === 'load_screen' ?
            <div style={loadScreenWrapperStyle}>
              <div className={loadScreenClasses}>
                <span className={bootstrap['sr-only']}>Loading...</span>
              </div>
            </div>
          : this.state.activeStage === 'start_screen' ?
            <StartScreen nextHandle={this.nextHandle} />
          : this.state.activeStage === 'favorites_screen' ?
            <FavoritesScreen
              favorites={['1', '2', '3', '4', '5', '6', '7', 
                '87', '9', '5', '6', '7','5', '6', '7',]}
              setStage={this.setStage}
            />
          : this.state.activeStage === 'types_screen' ?
            <SelectScreen 
              screen='types_screen'
              search='types'
              label='Выбрать тип'
              activeItem={this.state.activeType}
              setActive={this.setActiveType}
              key='1001'
            />
          : this.state.activeStage === 'criterians_screen' ?
            <SelectScreen 
              screen='criterians_screen'
              search='criterians'
              label='Выбрать критерий'
              activeItem={this.state.activeCriterian}
              setActive={this.setActiveCriterian}
              key='1002'
              data={this.state.activeType}
            />
          : this.state.activeStage === 'specifications_screen' ?
            <SpecificationsScreen 
              activeType={this.state.activeType}
              activeCriterians={this.state.activeCriterian}
              list={this.state.labels}
            />
          : null
        }
      </div>
    );
  }
}

export default QuizActive;