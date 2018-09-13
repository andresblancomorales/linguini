import {shallow} from 'enzyme';
import React from 'react';
import Spinner from "../../../../src/components/linguini/layout/spinner";

describe('<Spinner />', () => {
  it('should match the snapshot when loading', done => {
    const wrapper = shallow(<Spinner isLoading={true}/>);

    expect(wrapper).to.matchSnapshot();

    done();
  });

  it('should match the snapshot when not loading', done => {
    const wrapper = shallow(<Spinner isLoading={false}/>);

    expect(wrapper).to.matchSnapshot();

    done();
  });
});