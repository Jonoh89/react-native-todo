import React, { Text, TouchableHighlight } from 'react-native';
import { shallow } from 'enzyme';
import wrappedTask from '../../../src/tasks/Task';
import Checkbox from '../../../src/components/Checkbox';
import Separator from '../../../src/components/Separator';
import { expect } from 'chai';
import sinon from 'sinon';

const Task = wrappedTask.WrappedComponent;

describe('<Task />', () => {
  it('should render the task title', () => {
    const task = { title: 'Task 1', completed: false };

    const wrapper = shallow(<Task task={task} updateTask={() => {}} />);
    expect(wrapper.contains(<Text>Task 1</Text>)).to.equal(true);
  });

  it('should mark the checked checked if the task is completed', () => {
    const task = { title: 'Task 1', completed: true };

    const wrapper = shallow(<Task task={task} updateTask={() => {}} />);
    expect(wrapper.find(Checkbox).first().props().checked).to.equal(true);
  });

  it('should not mark the checkbok checked if the task is not completed', () => {
    const task = { title: 'Task 1', completed: false };

    const wrapper = shallow(<Task task={task} updateTask={() => {}} />);
    expect(wrapper.find(Checkbox).first().props().checked).to.equal(false);
  });

  it('should attach updateTask to the Touchable Highlight', () => {
    const updataTaskSpy = sinon.spy();
    const task = { title: 'Task 1', completed: false };

    const wrapper = shallow(<Task task={task} updateTask={updataTaskSpy} />);
    wrapper.find(TouchableHighlight).simulate('press');
    expect(updataTaskSpy.calledOnce).to.equal(true);
  });

  it('should call updateTask with the task with the completed attribute toggled', () => {
    const updataTaskSpy = sinon.spy();
    const task = { title: 'Task 1', completed: false };

    const wrapper = shallow(<Task task={task} updateTask={updataTaskSpy} />);
    wrapper.find(TouchableHighlight).simulate('press');
    expect(updataTaskSpy.calledWith({
      title: 'Task 1',
      completed: true,
    })).to.equal(true);
  });

  it('should have a separator', () => {
    const task = { title: 'Task 1', completed: false };

    const wrapper = shallow(<Task task={task} updateTask={() => {}} />);
    expect(wrapper.contains(<Separator />)).to.equal(true);
  });
});
