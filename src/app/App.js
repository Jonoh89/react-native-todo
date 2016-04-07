import React, {
  StyleSheet,
  View,
  NetInfo,
} from 'react-native';
import TasksPage from '../tasks/Page';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { setIsConnected } from '../redux/netInfo/actions';

const dispatchConnected = isConnected => store.dispatch(setIsConnected(isConnected));
NetInfo.isConnected.fetch().then(isConnected => {
  dispatchConnected(isConnected);
  NetInfo.isConnected.addEventListener('change', dispatchConnected);
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

export default function App() {
  return (
    <Provider store={store} >
      <View style={styles.container}>
        <TasksPage />
      </View>
    </Provider>
  );
}
