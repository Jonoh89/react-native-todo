import React, {
  Component,
  View,
  ListView,
  PropTypes,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import connectFirebase from '../connectFirebase';
import * as taskActions from '../redux/tasks/actions';
import AddTask from './AddTask';
import Tasks from './Tasks';

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});

class TasksPage extends Component {

  static propTypes = {
    tasks: PropTypes.array.isRequired,
    isConnected: PropTypes.bool.isRequired,
    addTask: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const dataStore = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.onNewTaskTextChange = this.onNewTaskTextChange.bind(this);
    this.onAddNewTask = this.onAddNewTask.bind(this);
    this.state = {
      dataStore,
      newTaskText: '',
    };
  }

  componentWillReceiveProps(props) {
    const { tasks } = props;
    this.setState({
      dataStore: this.state.dataStore.cloneWithRows(tasks),
    });
  }

  onNewTaskTextChange(text) {
    this.setState({ newTaskText: text });
  }

  onAddNewTask() {
    const { addTask } = this.props;
    const { newTaskText } = this.state;
    addTask(newTaskText);
    this.setState({ newTaskText: '' });
  }

  render() {
    const { isConnected } = this.props;
    const { newTaskText, dataStore } = this.state;

    return (
      <View style={styles.view}>
        <AddTask
          text={newTaskText}
          enabled={isConnected}
          onTextChange={this.onNewTaskTextChange}
          onAddTask={this.onAddNewTask}
        />
        <Tasks tasks={dataStore} />
      </View>
    );
  }

}

TasksPage = connectFirebase(TasksPage, props => ({
  path: 'tasks',
  on: {
    value: snapshot => {
      const values = snapshot.val();
      if (values) {
        const tasks = Object.keys(values)
          .map(key => ({ id: key, ...values[key] }));
        props.updateAllTasks(tasks);
      }
    },
  },
}));

export default connect(state => ({
  tasks: state.tasks.list,
  isConnected: state.netInfo.isConnected,
}), taskActions)(TasksPage);
