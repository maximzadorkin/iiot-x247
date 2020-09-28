import React from 'react';
import bootstrap from '../bootstrap.module.css';
import Header from './Header/Header.js';
import Quiz from './Quiz/Quiz.js';
import Report from './Report/Report';

class Layout extends React.Component {
  state = {
    isMobile: document.body.clientWidth < 768
  }

  constructor(props) {
    super(props);
    window.addEventListener('resize', () => {
      const isMobile = document.body.clientWidth < 768;
      this.setState({ isMobile });
    });
  }

  render() {
    return (
      <div className={bootstrap.container}>
        <Header isMobile={this.state.isMobile}/>
        <Quiz 
          isMobile={this.state.isMobile}

          report={this.props.report}
          openReport={this.props.openReport}
          closeReport={this.props.closeReport}

          stepHandler={this.props.stepHandler}
          activeStep={this.props.activeStep}
          backToStartStep={this.props.backToStartStep}
          backOneStep={this.props.backOneStep}

          types={this.props.types}
          activeType={this.props.activeType}
          setActiveType={this.props.setActiveType}

          categories={this.props.categories}
          activeCategory={this.props.activeCategory}
          setActiveCategory={this.props.setActiveCategory}

          labelsSpecifications={this.props.labelsSpecifications}
          setActiveSpecifications={this.props.setActiveSpecifications}
          foundItemsSpecs={this.props.foundItemsSpecs}

          search={this.props.search}
        />
        {
          this.props.report.isShow ?
            <Report 
              isMobile={this.state.isMobile}
              report={this.props.report}
              closeReport={this.props.closeReport}
            />
          : null
        }
      </div>
    )
  }
}

export default Layout;