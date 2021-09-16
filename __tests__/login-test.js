import React from 'react';
import { shallow } from 'enzyme';

import Login, { styles } from '../app/views/login';

describe('Rendering', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Login />);
  });
  it('Testing TextInput', () => {
    expect(wrapper.find('TextInput')).toHaveLength(2);
  });
  it('Testing TouchableOpacity', () => {
    expect(wrapper.find('TouchableOpacity')).toHaveLength(1);
  });
  it('Label Text', () => {
    expect(wrapper.find('Text').contains('Email')).toBe(true);
    expect(wrapper.find('Text').contains('Password')).toBe(true);
  })
  it('Style', () => {
    expect(wrapper.find('View').prop('style')).toEqual(styles.container);
  })
  it('Type Style', () => {})
});

describe('Interaction', () => {

});