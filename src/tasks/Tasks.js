import React, {
  ListView,
  PropTypes,
  StyleSheet,
} from 'react-native';
import Task from './Task';

const propTypes = {
  tasks: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flex: 1,
  },
});

const renderRow = rowData => <Task task={rowData} />;

function Tasks({ tasks }) {
  return (
    <ListView
      styles={styles.list}
      dataSource={tasks}
      renderRow={renderRow}
    />
  );
}

Tasks.propTypes = propTypes;

export default Tasks;
