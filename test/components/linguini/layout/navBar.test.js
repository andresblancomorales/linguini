import {shallow} from 'enzyme';
import React from 'react';
import * as _ from '../../../../src/utils/utilities';

describe('<NavBar />', () => {
  let NavBar;

  before(done => {
    sinon.stub(_, 'getLinguiniInstanceProvider')
      .withArgs()
      .returns({
        bearerTokenProvider: {
          getToken: () => {
            return Promise.resolve('70k3n')
          }
        }
      });
    NavBar = require('../../../../src/components/linguini/layout/navBar').NavBar;

    done();
  });

  after(() => {
    _.getLinguiniInstanceProvider.restore();
  });

  it('should match the snapshot with session details', done => {
    let menuItems = [
      {name: 'nav_test', href: '#/test', description: 'A Nav Link'},
      {name: 'nav_home', href: '#/', description: 'Home'}
    ];
    const wrapper = shallow(<NavBar menuItems={menuItems}
                                    location={{pathname: '/test'}}
                                    session={{firstName: 'Andres', lastName: 'Blanco'}}
                                    actions={{
                                      logout: () => {
                                      }
                                    }}/>);

    expect(wrapper).to.matchSnapshot();

    done();
  });

  it('should match the snapshot', done => {
    let menuItems = [
      {name: 'nav_test', href: '#/test', description: 'A Nav Link'},
      {name: 'nav_home', href: '#/', description: 'Home'}
    ];
    const wrapper = shallow(<NavBar menuItems={menuItems}
                                    location={{pathname: '/test'}}
                                    actions={{
                                      logout: () => {
                                      }
                                    }}/>);

    expect(wrapper).to.matchSnapshot();

    done();
  });

  it('should create the nav links and show the username', done => {
    let menuItems = [
      {name: 'nav_test', href: '#/test', description: 'A Nav Link'},
      {name: 'nav_home', href: '#/', description: 'Home'}
    ];
    const wrapper = shallow(<NavBar menuItems={menuItems}
                                    location={{pathname: '/test'}}
                                    session={{firstName: 'Andres', lastName: 'Blanco'}}
                                    actions={{
                                      logout: () => {
                                      }
                                    }}/>);

    let selectedLink = wrapper.find('a.selected');
    let selectedLinkProps = selectedLink.props();
    expect(selectedLinkProps.href).to.equal('#/test');
    expect(selectedLink.text()).to.equal('A Nav Link');

    let notSelectedLink = wrapper.find('a:not(.selected)');
    let notSelectedLinkProps = notSelectedLink.props();
    expect(notSelectedLinkProps.href).to.equal('#/');
    expect(notSelectedLink.text()).to.equal('Home');

    let username = wrapper.find('label.user').text();
    expect(username).to.equal('Andres Blanco');

    done();
  });

  it('should log the user out', done => {
    let logoutAssertion = (token) => {
      expect(token).to.equal('70k3n');
      done();
    };
    const wrapper = shallow(<NavBar menuItems={[]}
                                    location={{pathname: '/test'}}
                                    session={{firstName: 'Andres', lastName: 'Blanco'}}
                                    actions={{
                                      logout: logoutAssertion
                                    }}/>);

    wrapper.find('button').simulate('click');
  })

});