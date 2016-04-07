import React, {
  View,
  TextInput,
  StyleSheet,
  PropTypes,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: '#F6F6F6',
  },
  newTask: {
    backgroundColor: '#FFFFFF',
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 10,
    borderRadius: 5,
    fontSize: 20,
  },
  disabled: {
    backgroundColor: '#AAAAAA',
  },
});

const propTypes = {
  text: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired,
  onTextChange: PropTypes.func.isRequired,
  onAddTask: PropTypes.func.isRequired,
};

function AddTask({ text, enabled, onTextChange, onAddTask }) {
  return (
    <View style={styles.container}>
      <TextInput
        editable={enabled}
        style={[styles.newTask, !enabled && styles.disabled]}
        placeholder="Add Task"
        onChangeText={ onTextChange }
        onSubmitEditing={ onAddTask }
        value={ text }
      />
    </View>
  );
}

AddTask.propTypes = propTypes;

export default AddTask;
