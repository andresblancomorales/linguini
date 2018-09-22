import {shallow} from 'enzyme';
import React from 'react';
import TouchDraggable from '../../../src/components/misc/touchDraggable';

describe('<TouchDraggable/>', () => {

  it('should match the snapshot', done => {
    const wrapper = shallow(<TouchDraggable/>);

    expect(wrapper).to.matchSnapshot();

    done();
  });

  it('should handle a touch start', done => {
    let onTouchStart = sinon.spy();
    const wrapper = shallow(<TouchDraggable onTouchStart={onTouchStart}/>);

    wrapper.find('div').simulate('touchStart', {
      touches: [{clientX: 1, clientY: 1}]
    });

    expect(wrapper.state()).to.deep.equal({
      isTouching: true,
      initialX: 1,
      initialY: 1,
      positionX: 0,
      positionY: 0
    });

    expect(onTouchStart.called).to.be.true;
    done();
  });

  it('should ignore a touch start if multitouch', done => {
    let onTouchStart = sinon.spy();
    const wrapper = shallow(<TouchDraggable onTouchStart={onTouchStart}/>);

    wrapper.find('div').simulate('touchStart', {
      touches: [{clientX: 1, clientY: 1}, {clientX: 2, clientY: 2}]
    });

    expect(wrapper.state()).to.deep.equal({
      isTouching: false,
      initialX: undefined,
      initialY: undefined,
      positionX: undefined,
      positionY: undefined
    });

    expect(onTouchStart.called).to.be.false;
    done();
  });

  it('should handle a touch move', done => {
    let onTouchMove = sinon.spy();
    const wrapper = shallow(<TouchDraggable onTouchMove={onTouchMove}/>);

    wrapper.setState({
      isTouching: true,
      initialX: 1,
      initialY: 1,
      positionX: 0,
      positionY: 0
    });

    wrapper.find('div').simulate('touchMove', {
      touches: [{clientX: 10, clientY: 10}]
    });

    expect(wrapper.state()).to.deep.equal({
      isTouching: true,
      initialX: 1,
      initialY: 1,
      positionX: 0,
      positionY: 9
    });

    expect(onTouchMove.calledWith({verticalDirection: 'UP', horizontalDirection: 'RIGHT'})).to.be.true;
    done();
  });

  it('should not handle a touch move if the movement is less than the expected gauge', done => {
    let onTouchMove = sinon.spy();
    const wrapper = shallow(<TouchDraggable onTouchMove={onTouchMove}/>);

    wrapper.setState({
      isTouching: true,
      initialX: 1,
      initialY: 1,
      positionX: 0,
      positionY: 0
    });

    wrapper.find('div').simulate('touchMove', {
      touches: [{clientX: 2, clientY: 2}]
    });

    expect(wrapper.state()).to.deep.equal({
      isTouching: true,
      initialX: 1,
      initialY: 1,
      positionX: 0,
      positionY: 0
    });

    expect(onTouchMove.called).to.be.false;
    done();
  });

  it('should not handle a touch move if multitouch', done => {
    let onTouchMove = sinon.spy();
    const wrapper = shallow(<TouchDraggable onTouchMove={onTouchMove}/>);

    wrapper.setState({
      isTouching: true,
      initialX: 1,
      initialY: 1,
      positionX: 0,
      positionY: 0
    });

    wrapper.find('div').simulate('touchMove', {
      touches: [{clientX: 20, clientY: 20}, {clientX: 30, clientY: 30}]
    });

    expect(wrapper.state()).to.deep.equal({
      isTouching: true,
      initialX: 1,
      initialY: 1,
      positionX: 0,
      positionY: 0
    });

    expect(onTouchMove.called).to.be.false;
    done();
  });

  it('should handle touch cancel', done => {
    let onTouchCancel = sinon.spy();
    const wrapper = shallow(<TouchDraggable onTouchCancel={onTouchCancel}/>);

    wrapper.setState({
      isTouching: true,
      initialX: 1,
      initialY: 1,
      positionX: 0,
      positionY: 0
    });

    wrapper.find('div').simulate('touchCancel');

    expect(wrapper.state()).to.deep.equal({
      isTouching: false,
      initialX: undefined,
      initialY: undefined,
      positionX: undefined,
      positionY: undefined
    });

    expect(onTouchCancel.called).to.be.true;
    done();
  });

  it('should handle touch end', done => {
    let onTouchEnd = sinon.spy();
    const wrapper = shallow(<TouchDraggable onTouchEnd={onTouchEnd}/>);

    wrapper.setState({
      isTouching: true,
      initialX: 1,
      initialY: 1,
      positionX: 100,
      positionY: 100
    });

    wrapper.find('div').simulate('touchEnd');

    expect(wrapper.state()).to.deep.equal({
      isTouching: false,
      initialX: undefined,
      initialY: undefined,
      positionX: undefined,
      positionY: undefined
    });

    expect(onTouchEnd.calledWith({positionX: 100, positionY: 100})).to.be.true;
    done();
  });

});