import React, {Component} from 'react';
import {isFunction, isDefined} from "../../../utils/utilities";
import Bubble from '../layout/bubble';
import NewStep from './newStep';
import DraggableList from "../../misc/draggableList";

export default class PreparationManagement extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dragIndex: undefined,
      dragOver: undefined,
    };
  }

  componentDidUpdate() {
    if (this.bubbleContainer.scrollHeight > this.bubbleContainer.offsetHeight) {
      this.bubbleContainer.scrollTo(0, this.bubbleContainer.scrollHeight);
    }
  }

  handleStepAdded(step) {
    if (isFunction(this.props.onStepAdded)) {
      this.props.onStepAdded(step);
    }
  }

  renderItem(item, dragDetails) {
    let dragStyle = '';
    if (dragDetails.isDraggedOver) {
      dragStyle = dragDetails.direction === 'UP' ? 'dragOverHigh' : 'dragOverLow'
    }
    let draggingStyle = '';
    if (dragDetails.isDragged) {
      draggingStyle = 'dragging';
    }
    return (
      <div className={`stepDetail ${dragStyle} ${draggingStyle}`}>
        <div className='actions'>
          <button className='action fa fa-bars'/>
        </div>
        <div className='stepDescription'>
          {item}
        </div>
        <button className='delete fa fa-trash'/>
      </div>
    )
  }

  render() {
    let {steps} = this.props;

    let blockScrollStyle = undefined;
    if (isDefined(this.state.touchDrag)) {
      blockScrollStyle = {
        overflow: 'hidden'
      }
    }

    return (
      <div className='bubbleContainer' style={blockScrollStyle} ref={element => this.bubbleContainer = element}>
        <Bubble direction='right'>
          <span>Steps</span>
        </Bubble>
        <DraggableList className='notepad preparation_notepad'
                       items={steps}
                       itemRenderer={this.renderItem.bind(this)}
                       onItemMoved={this.props.onStepMoved}
        />
        <Bubble className='stepBubble' direction='left'>
          <NewStep onSubmit={this.handleStepAdded.bind(this)}/>
        </Bubble>
      </div>
    )
  }
}