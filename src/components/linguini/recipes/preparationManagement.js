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

  handleStepRemoved(item, index) {
    if (isFunction(this.props.onStepRemoved)) {
      this.props.onStepRemoved(item, index);
    }
  }

  handleOnSubmit() {
    if (isFunction(this.props.onSubmit)) {
      this.props.onSubmit();
    }
  }

  handleOnCancel() {
    if (isFunction(this.props.onCancel)) {
      this.props.onCancel();
    }
  }

  handleStepMoved(from, to) {
    if (isFunction(this.props.onStepMoved)) {
      this.props.onStepMoved(from, to);
    }
  }

  renderItem(item, index, dragDetails) {
    let dragStyle = '';
    if (dragDetails.isDraggedOver) {
      dragStyle = dragDetails.direction === 'UP' ? 'dragOverHigh' : 'dragOverLow'
    }
    let draggingStyle = '';
    if (dragDetails.isDragged) {
      draggingStyle = 'dragging';
    }
    return (
      <div key={`step_${index}`} className={`stepDetail ${dragStyle} ${draggingStyle}`}>
        <div className='actions'>
          <button className='action fa fa-bars'/>
        </div>
        <div className='stepDescription'>
          {item}
        </div>
        <button className='delete fa fa-trash'
                onClick={this.handleStepRemoved.bind(this, item, index)}/>
      </div>
    )
  }

  render() {
    let {steps} = this.props;

    let blockScrollStyle = undefined;
    if (isDefined(this.state.dragIndex)) {
      blockScrollStyle = {
        overflow: 'hidden'
      }
    }

    return (
      <div className='bubbleContainer' style={blockScrollStyle} ref={element => this.bubbleContainer = element}>
        <Bubble direction='right'>
          <span>Miam-miam... I can already taste it chef. Now tell me, what do we do with the <strong><a
            onClick={this.handleOnCancel.bind(this)}>ingredients</a></strong>?</span>
        </Bubble>
        <DraggableList className='notepad preparation_notepad'
                       items={steps}
                       itemRenderer={this.renderItem.bind(this)}
                       onItemMoved={this.handleStepMoved.bind(this)}
        />
        <Bubble className='stepBubble' direction='left'>
          <NewStep onSubmit={this.handleStepAdded.bind(this)}/>
          {steps.length === 0 ? null :
            <span>Easy huh? <a onClick={this.handleOnSubmit.bind(this)}>That's it!</a></span>
          }
        </Bubble>
      </div>
    )
  }
}