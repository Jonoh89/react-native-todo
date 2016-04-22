import React, {
  View,
  Text,
  PropTypes,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import * as taskActions from '../redux/tasks/actions';
import Checkbox from '../components/Checkbox';
import Separator from '../components/Separator';

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
});

function Task({ task, updateTask }) {
  const onPress = () => updateTask({ ...task, completed: !task.completed });

  return (
    <View>
      <TouchableHighlight onPress={onPress}>
        <View style={styles.row}>
          <View style={styles.checkbox}>
            <Checkbox checked={!!task.completed} />
          </View>
          <Text>{task.title}</Text>
        </View>
      </TouchableHighlight>
      <Separator />
    </View>
  );
}

Task.propTypes = propTypes;

export default connect(() => ({}), taskActions)(Task);

