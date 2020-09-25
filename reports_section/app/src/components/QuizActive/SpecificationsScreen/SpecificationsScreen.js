import React from 'react';
import bootstrap from '../../../bootstrap.module.css';
import SelectScreen from '../SelectScreen/SelectScreen.js';

class SpecificationsScreen extends React.Component {

  state = {
    name: '',
    labels: '',
    index: 0
  }

  componentDidMount() {
    this.setState({
      name: this.props.list[0],
      labels: this.props.list.splice(0, 1)
    })
  }

  setActive = () => {

  }

  render() {
    const fullComplete = 100;
    const partComplete = this.state.index;
    return (
      <div>
        <div className={[bootstrap['w-100'], bootstrap['border']].join(' ')} style={{height: '10px'}}>
          <div className={bootstrap['bg-info']} style={{width: `${fullComplete / partComplete}%`, height: '100%'}}/>
        </div>   
        {
          <SelectScreen
            screen='specifications_screen'
            search='specifications'
            label={`Выбрать ${this.state.labels[this.state.index]}`}
            // activeItem={}
            setActive={this.setActive}
            // data={}
            key='1003'
          />
        }
        <ul className={[
          bootstrap['list-unstyled'],
          bootstrap['mt-2'],
          bootstrap['mb-0'],
          bootstrap['border'],
          bootstrap['rounded'],
          bootstrap['overflow-auto']
        ].join(' ')} style={{height: '100px'}}>
          <li className={bootstrap['border-bottom']}>geyrn</li>
        </ul>
      </div>
    );
  }
}
export default SpecificationsScreen;