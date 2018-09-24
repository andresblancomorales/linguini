import {shallow, mount} from 'enzyme';
import React from 'react';
import PreparationManagement from '../../../../src/components/linguini/recipes/preparationManagement';

describe('<PreparationManagement/>', () => {

  it('should match the snapshot', done => {
    let wrapper = shallow(<PreparationManagement steps={[]}/>);

    expect(wrapper).to.matchSnapshot();
    done();
  });

  it('should match the snapshot when it has ingredients', done => {
    let wrapper = shallow(<PreparationManagement steps={['Mix all the ingredients']}/>);

    expect(wrapper).to.matchSnapshot();
    done();
  });

  it('should notify that a step was added', done => {
    let onStepAdded = sinon.spy();
    let wrapper = shallow(<PreparationManagement steps={['Mix all the ingredients']}
                                                 onStepAdded={onStepAdded}/>);

    wrapper.find('NewStep').simulate('submit', {step: 'Put on the oven for 30 minutes'});

    expect(onStepAdded.calledWith({step: 'Put on the oven for 30 minutes'})).to.be.true;
    done();
  });

  it('should notify that a step was removed', done => {
    let onStepRemoved = sinon.spy();
    let wrapper = mount(<PreparationManagement steps={['Mix all the ingredients']}
                                               onStepRemoved={onStepRemoved}/>);

    wrapper.findWhere(component => component.key() === 'step_0').find('button').at(1).simulate('click');

    expect(onStepRemoved.calledWith('Mix all the ingredients', 0)).to.be.true;
    done();
  });

  it('should notify that a step was moved', done => {
    let onStepMoved = sinon.spy();
    let wrapper = mount(<PreparationManagement steps={['Mix all the ingredients', 'Cook them all together']}
                                               onStepMoved={onStepMoved}/>);

    wrapper.find('DraggableList').prop('onItemMoved')(0, 1);

    expect(onStepMoved.calledWith(0, 1)).to.be.true;
    done();
  });
});