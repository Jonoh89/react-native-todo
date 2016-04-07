import React, { Text } from 'react-native';
import { shallow } from 'enzyme';
import Task from '../../src/tasks/Task';
import { expect } from 'chai';

describe('<Task />', () => {
  it('should render the task', () => {
    const wrapper = shallow(<Task task="Task 1" />);
    expect(wrapper.length).to.equal(1);
    expect(wrapper.contains(<Text>Task 1</Text>)).to.equal(true);
  });
});
