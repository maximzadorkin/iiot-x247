import React from 'react';
import Layout from '../containers/Layout.js';
import axios from 'axios';
import ModalChoise from '../components/ModalChoise/ModalChoise.js';

/*
steps [
  'start_screen',
  'favorites_screen',
  'types_screen',
  'categories_screen',
  'specifications_screen',
  'times_screen',
  'summary_screen',
  'load_screen'
]
*/
class QuizLogic extends React.Component {
  state = {
    report: {
      isShow: false,
      title: 'title of report',
      layers: [],
      specifications: []
    },

    favorites: [],

    activeStep: 'start_screen',
    lastSteps: [],

    activeType: null,
    types: [],

    activeCategory: null,
    categories: [],

    specifications: [],
    activeSpecification: {
      labels: [],
      actives: []
    },
    foundItemsSpecs: [],
    // specification: {
    //   labels: [],
    //   actives: [],
    // }

    timesPeriod: [],

    userId: '1',

    modal: {
      label: '',
      isShow: false
    }
  }

  componentDidMount = () => {}

  setStep = (step) => {
    const activeStep = this.state.activeStep;
    const lastSteps = this.state.lastSteps;
    this.setState({
      ...this.state,
      lastSteps: lastSteps.concat(activeStep)
        .filter(el => el !== 'load_screen'),
      activeStep: step
    });
  }

  stepHandler = (nextStep = null) => {
    const step = this.state.activeStep;

    this.setStep('load_screen');

    switch(step) {
      case 'start_screen':
        if (nextStep === 'new_report')
          this.setStep('types_screen');
        else
          this.setStep('favorites_screen');
        break;
      case 'types_screen':
        if (this.state.activeType)
          this.setStep('categories_screen');
        else
          this.setStep('types_screen');
        break;
      case 'categories_screen':
        if (this.state.activeCategory)
          axios.get(`/type=${this.state.activeType}&cat=${this.state.activeCategory}`)
            .then(response => {
              this.setState({
                specifications: response,
                activeSpecification: response[0]
              });
              this.setStep('specifications_screen');
            })
            .catch(err => {
              const response = [
                {
                  labels: ['Регион', 'Город', 'Микрорайон'],
                  actives: []
                },
                {
                  labels: ['Регион2', 'Город2', 'Микрорайон2'],
                  actives: []
                }
              ]
              this.setState({
                specifications: response,
                activeSpecification: response[0]
              });
              this.setStep('specifications_screen');
            });
        else
          this.setStep('categories_screen');
        break;
      case 'specifications_screen':
        this.setStep('summary_screen');
        break;
      default:
        this.setStep('start_screen');
        break;
    }
  }

  backOneStep = () => {
    const steps = this.state.lastSteps;
    const lastStep = steps[steps.length - 1];
    const stepsWithoutLast = steps.slice(0, steps.length - 1);
    this.setState({
      activeStep: lastStep,
      lastSteps: stepsWithoutLast
    });
  }

  backToStartStep = () => {
    this.setState({
      ...this.state,
      lastSteps: [],
      activeStep: 'start_screen'
    });
  }

  downloadFavorites() {}

  createReport() {}

  downloadReport = () => {
    axios.post('/', {
      type: this.state.activeType,
      category: this.state.activeCategory,
      specifications: this.state.activeSpecifications,
      times: this.state.timesPeriod
    })
    .then(response => {
      
    }).catch(error => {
      this.setState({labels: ['address', 'Город', 'Район', 'Улица', 'Дом']})
      this.setStage('specifications_screen');
    });
  }

  addLayer() {}

  openReport = () => {
    this.setState({
      report: { 
        ...this.state.report,
        isShow: true,
      }
    });
  }

  closeReport = () => {
    this.setState({
      ...this.state,
      modal: {
        label: 'Закрыть отчет?',
        isShow: true
      }
    });
  }

  clearReport = () => {
    this.setState(prevValue => (
      {
        ...prevValue,
        report: { 
          isShow: false,
          title: '',
          layers: [],
          specifications: []
        }
      }
    ));
    this.closeModal();
  }

  search = (word = '') => {
    switch (this.state.activeStep) {
      case 'types_screen':
        axios.get(`/0?find0=${word}`).then(response => {
          this.setState({types: response});
        }).catch(error => {
          if (word==='type3')
            this.setState({types: ['type4', 'type5', 'type6']});
          else
            this.setState({types: ['type1', 'type2', 'type3']});
        });
        break;
      case 'categories_screen':
        axios.get(`/0?find1=${word}`).then(response => {
          this.setState({categories: response});
        }).catch(error => {
          this.setState({categories: ['category1', 'category2', 'category3']});
        });
        break;
      case 'specifications_screen':
        axios.get(`/0?find3=${word}`).then(response => { 
          this.setState({foundItemsSpecs: response})
        })
        .catch(error => {
          this.setState({foundItemsSpecs: ['a', 'b', 'c', 'd']})
        });
        break;
      default:
        break;
    }
  }

  setActiveType = (value) => {
    this.setState({
      activeType: value,
      activeCategory: '',
      specifications: [],
      activeSpecification: {
        labels: [],
        actives: []
      },
      timesPeriod: []
    });
  }

  setActiveCategory = (value) => {
    this.setState({
      activeCategory: value,
      specifications: [],
      activeSpecification: {
        labels: [],
        actives: []
      },
      timesPeriod: []
    });
  } 

  setActiveSpecifications = (values) => {
    this.setState({
      activeSpecification: {
        ...this.state.activeSpecification,
        actives: values
      },
      timesPeriod: []
    });
  }

  setTimesPeriod = () => {}

  closeModal = () => {
    this.setState(prevValue => (
      {
        ...prevValue,
        modal: { 
          label: '',
          isShow: false
        }
      }
    ));
  }

  render() {
    return (
      <React.Fragment>
        <Layout
          openReport={this.openReport}
          closeReport={this.closeReport}
          report={this.state.report}
    
          stepHandler={this.stepHandler}
          activeStep={this.state.activeStep}
          backToStartStep={this.backToStartStep}
          backOneStep={this.backOneStep}

          types={this.state.types}
          activeType={this.state.activeType}
          setActiveType={this.setActiveType}

          categories={this.state.categories}
          activeCategory={this.state.activeCategory}
          setActiveCategory={this.setActiveCategory}

          labelsSpecifications={this.state.activeSpecification.labels}
          setActiveSpecifications={this.setActiveSpecifications}
          foundItemsSpecs={this.state.foundItemsSpecs}

          search={this.search}
        />
        {
          this.state.modal.isShow ? 
            <ModalChoise 
              label='Удалить отчет?'
              ok={this.clearReport}
              cancel={this.closeModal}
            />
            : null
        }
      </React.Fragment>
    );
  }
}
export default QuizLogic;