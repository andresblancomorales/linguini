import {shallow} from 'enzyme';
import React from 'react';
import DraggableList from '../../../src/components/misc/draggableList';
import ReactDOM from "react-dom";

describe('<DraggableList/>', () => {

  it('should match the snapshot', done => {
    let items = [{name: 'Item 1'}, {name: 'Item 2'}];
    let itemRenderer = (item) => {
      return (<div>{item.name}</div>)
    };

    const wrapper = shallow(<DraggableList items={items} itemRenderer={itemRenderer}/>);

    expect(wrapper).to.matchSnapshot();

    done();
  });

  it('should set the index of the dragged item', done => {
    let items = [{name: 'Item 1'}, {name: 'Item 2'}];
    let itemRenderer = (item) => {
      return (<div>{item.name}</div>)
    };

    const wrapper = shallow(<DraggableList items={items}
                                           itemRenderer={itemRenderer}/>);

    let firstItem = wrapper.findWhere(control => control.key() === 'item_0').childAt(0);

    firstItem.simulate('dragStart');

    expect(wrapper.state()).to.deep.equal({dragIndex: 0, dragOver: undefined});
    done();
  });

  it('should call the itemRenderer with the correct params', done => {
    let items = [{name: 'Item 1'}];
    let itemRenderer = sinon.spy();

    const wrapper = shallow(<DraggableList items={items}
                                           itemRenderer={itemRenderer}/>);

    expect(itemRenderer.calledWith({name: 'Item 1'}, 0, {
      direction: undefined,
      isDraggedOver: false,
      isDragged: false
    })).to.be.true;
    done();
  });

  it('should set the index of the touched item', done => {
    let items = [{name: 'Item 1'}, {name: 'Item 2'}];
    let itemRenderer = (item) => {
      return (<div>{item.name}</div>)
    };

    const wrapper = shallow(<DraggableList items={items}
                                           itemRenderer={itemRenderer}/>);

    let firstItem = wrapper.findWhere(control => control.key() === 'item_0');

    firstItem.simulate('touchStart');

    expect(wrapper.state()).to.deep.equal({dragIndex: 0, dragOver: undefined});
    done();
  });

  it('should set the index of the dragged over item', done => {
    let items = [{name: 'Item 1'}, {name: 'Item 2'}];
    let itemRenderer = (item) => {
      return (<div>{item.name}</div>)
    };

    const wrapper = shallow(<DraggableList items={items}
                                           itemRenderer={itemRenderer}/>);

    wrapper.setState({dragIndex: 0, dragOver: undefined});

    let firstItem = wrapper.findWhere(control => control.key() === 'item_1').childAt(0);

    firstItem.simulate('dragOver', {
      preventDefault: () => {
      }
    });

    expect(wrapper.state()).to.deep.equal({dragIndex: 0, dragOver: 1});
    done();
  });

  it('should set call the onItemMoved when an item is dropped', done => {
    let items = [{name: 'Item 1'}, {name: 'Item 2'}];
    let itemRenderer = (item) => {
      return (<div>{item.name}</div>)
    };

    let onItemMoved = sinon.spy();

    const wrapper = shallow(<DraggableList items={items}
                                           itemRenderer={itemRenderer}
                                           onItemMoved={onItemMoved}/>);

    wrapper.setState({dragIndex: 0, dragOver: undefined});

    let firstItem = wrapper.findWhere(control => control.key() === 'item_1').childAt(0);

    firstItem.simulate('drop');

    expect(onItemMoved.calledWith(0, 1)).to.be.true;
    done();
  });

  it('should clear the state when dragging is finished', done => {
    let items = [{name: 'Item 1'}, {name: 'Item 2'}];
    let itemRenderer = (item) => {
      return (<div>{item.name}</div>)
    };

    const wrapper = shallow(<DraggableList items={items}
                                           itemRenderer={itemRenderer}/>);

    wrapper.setState({dragIndex: 0, dragOver: 1});

    let firstItem = wrapper.findWhere(control => control.key() === 'item_0').childAt(0);

    firstItem.simulate('dragEnd');

    expect(wrapper.state()).to.deep.equal({dragIndex: undefined, dragOver: undefined});
    done();
  });

  it('should the dragged over index when drag leaves', done => {
    let items = [{name: 'Item 1'}, {name: 'Item 2'}];
    let itemRenderer = (item) => {
      return (<div>{item.name}</div>)
    };

    let onItemMoved = sinon.spy();

    const wrapper = shallow(<DraggableList items={items}
                                           itemRenderer={itemRenderer}
                                           onItemMoved={onItemMoved}/>);

    wrapper.setState({dragIndex: 0, dragOver: 1});

    let firstItem = wrapper.findWhere(control => control.key() === 'item_1').childAt(0);

    firstItem.simulate('dragLeave');

    expect(wrapper.state()).to.deep.equal({dragIndex: 0, dragOver: undefined});
    done();
  });

  it('should set the hovered item when touch moves over', done => {
    sinon.stub(ReactDOM, 'findDOMNode')
      .returns({
        getBoundingClientRect: () => {
          return {x: 0, y: 0, bottom: 10, right: 10, top: 0, left: 0}
        }
      });

    let items = [{name: 'Item 1'}, {name: 'Item 2'}];
    let itemRenderer = (item) => {
      return (<div>{item.name}</div>)
    };

    const wrapper = shallow(<DraggableList items={items}
                                           itemRenderer={itemRenderer}/>);

    wrapper.setState({dragIndex: 0, dragOver: undefined});

    let firstItem = wrapper.findWhere(control => control.key() === 'item_0');

    firstItem.simulate('touchMove', {verticalDirection: 'DOWN'});

    expect(wrapper.state()).to.deep.equal({dragIndex: 0, dragOver: 1});

    ReactDOM.findDOMNode.restore();
    done();
  });

  it('should call onItemMoved when touch ends', done => {

    let items = [{name: 'Item 1'}, {name: 'Item 2'}];
    let itemRenderer = (item) => {
      return (<div>{item.name}</div>)
    };

    let onItemMoved = sinon.spy();

    const wrapper = shallow(<DraggableList items={items}
                                           itemRenderer={itemRenderer}
                                           onItemMoved={onItemMoved}/>);

    wrapper.setState({dragIndex: 0, dragOver: 1});

    let firstItem = wrapper.findWhere(control => control.key() === 'item_0');

    firstItem.simulate('touchEnd');

    expect(onItemMoved.calledWith(0, 1)).to.be.true;
    expect(wrapper.state()).to.deep.equal({dragIndex: undefined, dragOver: undefined});
    done();
  });

  it('should set clear the state when touch cancels', done => {
    let items = [{name: 'Item 1'}, {name: 'Item 2'}];
    let itemRenderer = (item) => {
      return (<div>{item.name}</div>)
    };

    const wrapper = shallow(<DraggableList items={items}
                                           itemRenderer={itemRenderer}/>);

    wrapper.setState({dragIndex: 0, dragOver: 1});

    let firstItem = wrapper.findWhere(control => control.key() === 'item_0');

    firstItem.simulate('touchCancel');

    expect(wrapper.state()).to.deep.equal({dragIndex: undefined, dragOver: undefined});
    done();
  });
});
