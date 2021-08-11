import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './Navigationitems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    let wrapper = shallow(<NavigationItems />);
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('Display two Navigation Items if user is unauthenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    it('Display Three Navigation Items if user is authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    it('Display Logout Button if user is authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link="/logout">LOGOUT</NavigationItem>)).toEqual(true);
    });
})