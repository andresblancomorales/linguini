import React, {Component} from 'react';
import * as _ from '../../../utils/utilities';

export default class Bubble extends Component {

  render() {
    let direction = this.props.direction === 'left' ? 'bubble-left' : 'bubble-right';
    return (
      <div className={`bubble ${direction} ${_.isDefined(this.props.className) ? this.props.className: ''}`}>
        <div className='bubble-content'>
          {this.props.children}
        </div>
      </div>
    )
  }
}