import React, { View, StyleSheet } from 'react-native';
import Separator from '../../../src/components/Separator';
import { shallow } from 'enzyme';
import { expect } from 'chai';

describe('<Separator />', () => {
  it('should allow overriding of styles', () => {
    const newStyles = StyleSheet.create({
      backgroundColor: 'white',
    });

    const wrapper = shallow(<Separator />);
    expect(wrapper.find(View).first().props().style.backgroundColor).to.equal('#bbbbbb');
    wrapper.setProps({ style: newStyles });
    expect(wrapper.find(View).first().props().style.backgroundColor).to.equal('white');
  });
});
