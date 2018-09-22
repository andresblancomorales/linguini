import React, {Component} from 'react';
import {isFunction} from "../../utils/utilities";

const UPDATE_GAUGE = 5;

export default class TouchDraggable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isTouching: false,
      initialX: undefined,
      initialY: undefined,
      positionX: undefined,
      positionY: undefined
    };
  }

  onTouchStart(ev) {
    if (ev.touches.length === 1) {
      this.setState({
        ...this.state,
        isTouching: true,
        initialX: ev.touches[0].clientX,
        initialY: ev.touches[0].clientY,
        positionX: 0,
        positionY: 0,
      });

      if (isFunction(this.props.onTouchStart)) {
        this.props.onTouchStart();
      }
    }
  }

  onTouchMove(ev) {
    if (ev.touches.length === 1) {
      let position = {
        positionX: ev.touches[0].clientX - this.state.initialX,
        positionY: ev.touches[0].clientY - this.state.initialY,
      };

      if (Math.abs(this.state.positionY - position.positionY) >= UPDATE_GAUGE) {

        let eventData = {
          verticalDirection: this.state.positionY > position.positionY ? 'DOWN' : 'UP',
          horizontalDirection: this.state.positionX > position.positionX ? 'LEFT' : 'RIGHT'
        };

        this.setState({
          ...this.state,
          positionX: 0,
          positionY: position.positionY,
        });

        if (isFunction(this.props.onTouchMove)) {
          this.props.onTouchMove(eventData);
        }
      }
    }
  }

  onTouchCancel() {
    this.setState({
      ...this.state,
      isTouching: false,
      initialX: undefined,
      initialY: undefined,
      positionX: undefined,
      positionY: undefined
    });

    if (isFunction(this.props.onTouchCancel)) {
      this.props.onTouchCancel();
    }
  }

  onTouchEnd() {
    if (isFunction(this.props.onTouchEnd)) {
      this.props.onTouchEnd({
        positionX: this.state.positionX,
        positionY: this.state.positionY
      })
    }

    this.setState({
      ...this.state,
      isTouching: false,
      initialX: undefined,
      initialY: undefined,
      positionX: undefined,
      positionY: undefined
    });
  }


  render() {
    let touchDragStyle = undefined;

    if (this.state.isTouching) {
      touchDragStyle = {
        transform: `translate(${this.state.positionX}px,${this.state.positionY}px)`,
        opacity: 0.5,
        zIndex: 9999
      }
    }
    return (
      <div className={this.props.className}
           style={touchDragStyle}
           onTouchEnd={this.onTouchEnd.bind(this)}
           onTouchCancel={this.onTouchCancel.bind(this)}
           onTouchStart={this.onTouchStart.bind(this)}
           onTouchMove={this.onTouchMove.bind(this)}>
        {this.props.children}
      </div>
    )
  }
}