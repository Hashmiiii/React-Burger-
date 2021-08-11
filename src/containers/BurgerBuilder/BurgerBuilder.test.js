import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitBurgerBuilder={()=>{}} setRedirectUrl={(param) => {}}/>);
    });

    it('Build Controls Should Render on passing ingredients', () => {
        wrapper.setProps({ingredients: {salad: 1}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
});