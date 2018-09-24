import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TouchDraggable from "./touchDraggable";
import {isDefined, isFunction} from "../../utils/utilities";

export default class DraggableList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dragIndex: undefined,
      dragOver: undefined,
    };

    this.itemControls = {};
  }

  onItemDragged(index) {
    this.setState({
      ...this.state,
      dragIndex: index
    });
  }

  onItemDragOver(index, event) {
    event.preventDefault();
    if (this.state.dragOver !== index) {
      this.setState({
        ...this.state,
        dragOver: index
      })
    }
  }

  onItemDrop(index) {
    if (isFunction(this.props.onItemMoved) && this.state.dragIndex !== index) {
      this.props.onItemMoved(this.state.dragIndex, index);
    }
  }

  onItemDragLeave() {
    this.setState({
      ...this.state,
      dragOver: undefined,
    });
  }

  onItemDragEnd() {
    this.setState({
      ...this.state,
      dragOver: undefined,
      dragIndex: undefined
    });
  }

  onTouchStart(index) {
    this.setState({
      ...this.state,
      dragIndex: index
    });
  }

  onTouchMove(index, ev) {
    let draggedControl = ReactDOM
      .findDOMNode(this.itemControls[index])
      .getBoundingClientRect();

    let hoveredControl = Object.keys(this.itemControls).find(controlIndex => {
      if (controlIndex == index) {
        return false;
      }

      let control = this.itemControls[controlIndex];
      let referencePosition = ReactDOM
        .findDOMNode(control)
        .getBoundingClientRect();

      if (ev.verticalDirection === 'DOWN') {
        return (draggedControl.x >= referencePosition.left && draggedControl.x <= referencePosition.right) && (draggedControl.y >= referencePosition.top && draggedControl.y <= referencePosition.bottom);
      } else {
        return (draggedControl.x >= referencePosition.left && draggedControl.x <= referencePosition.right) && (draggedControl.bottom >= referencePosition.top && draggedControl.bottom <= referencePosition.bottom);
      }
    });

    let updatedDragOver = isDefined(hoveredControl) ? Number(hoveredControl) : undefined;
    if (this.state.dragOver !== updatedDragOver) {
      this.setState({
        ...this.state,
        dragOver: updatedDragOver
      });
    }
  }

  onTouchCancel() {
    this.setState({
      ...this.state,
      dragIndex: undefined,
      dragOver: undefined
    });
  }

  onTouchEnd() {
    if (isDefined(this.state.dragOver) && isFunction(this.props.onItemMoved) && this.state.dragIndex !== this.state.dragOver) {
      this.props.onItemMoved(this.state.dragIndex, this.state.dragOver);
    }

    this.setState({
      ...this.state,
      dragIndex: undefined,
      dragOver: undefined
    });
  }

  renderItems() {
    if (!Array.isArray(this.props.items)) {
      return null;
    }

    this.itemControls = {};

    let itemComponents = [];

    for (let i = 0; i < this.props.items.length; i++) {
      let renderParam = {
        direction: undefined,
        isDraggedOver: false,
        isDragged: false
      };
      if (isDefined(this.state.dragIndex) && this.state.dragOver === i) {
        renderParam.direction = this.state.dragIndex >= i ? 'UP' : 'DOWN';
        renderParam.isDraggedOver = true;
      }
      if (this.state.dragIndex === i) {
        renderParam.isDragged = true;
      }

      let component = (
        <TouchDraggable key={`item_${i}`}
                        ref={control => {
                          if (control !== null) this.itemControls[i] = control;
                        }}
                        onTouchStart={this.onTouchStart.bind(this, i)}
                        onTouchMove={this.onTouchMove.bind(this, i)}
                        onTouchEnd={this.onTouchEnd.bind(this, i)}
                        onTouchCancel={this.onTouchCancel.bind(this, i)}>
          <div draggable={true}
               onDragStart={this.onItemDragged.bind(this, i)}
               onDragOver={this.onItemDragOver.bind(this, i)}
               onDrop={this.onItemDrop.bind(this, i)}
               onDragEnd={this.onItemDragEnd.bind(this, i)}
               onDragLeave={this.onItemDragLeave.bind(this, i)}>
            {
              !isFunction(this.props.itemRenderer) ? null :
                this.props.itemRenderer(this.props.items[i], i, renderParam)
            }
          </div>
        </TouchDraggable>
      );

      itemComponents.push(component);

      this.itemControls[i] = component;
    }

    return itemComponents;
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.renderItems()}
      </div>
    )
  }
}


