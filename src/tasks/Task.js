import React, {
  View,
  Text,
  PropTypes,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import * as taskActions from '../redux/tasks/actions';
import Checkbox from '../components/checkbox';

const propTypes = {
  task: PropTypes.object.isRequired,
  updateTask: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    flexDirection: 'row',
  },
  checkbox: {
    marginRight: 10,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#bbbbbb',
    marginLeft: 15,
    marginRight: 15,
  },
});

function Task({ task, updateTask }) {
  const onPress = () => updateTask({ ...task, completed: !task.completed });

  return (
    <View>
      <TouchableHighlight onPress={onPress}>
        <View style={styles.row}>
          <Checkbox style={styles.checkbox} checked={!!task.completed} />
          <Text>{task.title}</Text>
        </View>
      </TouchableHighlight>
      <View style={styles.separator} />
    </View>
  );
}

Task.propTypes = propTypes;

export default connect(() => ({}), taskActions)(Task);

