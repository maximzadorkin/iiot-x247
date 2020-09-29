import React from 'react';
import bootstrap from '../../bootstrap.module.css';
import QuizHeader from './QuizHeader/QuizHeader.js';
import StartScreen from './StartScreen/StartScreen.js';
import FavoritesScreen from './FavoritesScreen/FavoritesScreen.js';
import SearchSelect from '../SearchSelect/SearchSelect.js';
import SpecificationsScreen from '../SpecificationsScreen/SpecificationsScreen.js';
import SummaryScreen from './SummaryScreen/SummaryScreen.js';


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
  
  getActiveScreen(styles, classes) {
    switch (this.props.activeStep) {
      case 'start_screen':
        return <StartScreen stepHandler={this.props.stepHandler} />;
      case 'types_screen':
        return (
          <SearchSelect
            heightFinder='350px'
            closeButton={false}
            label='Выбрать тип'
            getItemsToSelect={() => this.props.types}
            activeItem={this.props.activeType}
            setActive={this.props.setActiveType}
            search={this.props.search}
            key='1000'
          />
        );
      case 'categories_screen':
        return (
          <SearchSelect
            heightFinder='350px'
            closeButton={false}
            label='Выбрать критерий'
            getItemsToSelect={() => this.props.categories}
            activeItem={this.props.activeCategory}
            setActive={this.props.setActiveCategory}
            search={this.props.search}
            key='1001'
          />
        );
      case 'specifications_screen':
        return (
          <SpecificationsScreen
            labelsSpecifications={this.props.labelsSpecifications}
            setActiveSpecifications={this.props.setActiveSpecifications}
            foundItemsSpecs={this.props.foundItemsSpecs}
            search={this.props.search}
          />
        );
      case 'times_screen':
        return <SummaryScreen openReport={this.props.openReport}/>;
      case 'summary_screen':
        return <SummaryScreen openReport={this.props.openReport}/>;
      case 'favorites_screen':
        return (
          <FavoritesScreen
            favorites={['1', '2', '3', '4', '5', '6', '7', 
                '87', '9', '5', '6', '7','5', '6', '7',]}
            stepHandler={this.props.stepHandler}
          />
        );
      default:
        return(
          <div style={styles.loadScreenWrap}>
            <div className={classes.loadScreen}>
              <span className={bootstrap['sr-only']}>Loading...</span>
            </div>
          </div>
        );
    }
  }

  render() {
    const classes = {
      container: [
        bootstrap['p-2'],
        bootstrap['pt-3'],
        bootstrap['pb-3']
      ].join(' '),
      loadScreen: [
        bootstrap['spinner-grow'],
        bootstrap['text-secondary']
      ].join(' ')
    };
    const styles = {
      container: {
        height: '500px'
      },
      loadScreenWrap: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }
    };

    return (
      <div style={styles.container} className={classes.container}>
        {
          <QuizHeader
            activeStep={this.props.activeStep}
            stepHandler={this.props.stepHandler}
            backToStartStep={this.props.backToStartStep}
            backOneStep={this.props.backOneStep}
          />
        }
        {this.getActiveScreen(styles, classes)}
      </div>
    );
  }
}

export default QuizActive;