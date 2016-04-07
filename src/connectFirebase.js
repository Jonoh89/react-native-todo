import React, { PropTypes, Component } from 'react-native';

const ensureArray = item => [].concat(item);
const optionsToPayload = ({ path, key, params }) => ({ path, key, params });
const optionsToPayloadString = options => JSON.stringify(optionsToPayload(options));

export default function queryFirebase(Wrapped, mapPropsToOptions) {
  class FirebaseQuery extends Component {

    static contextTypes = {
      store: PropTypes.object,
    };

    componentDidMount() {
      this.on();
    }

    componentDidUpdate(prevProps) {
      const prevOptions = optionsToPayloadString(mapPropsToOptions(prevProps));
      const options = optionsToPayloadString(mapPropsToOptions(this.props));
      // Detect only options change is must to avoid loops.
      if (prevOptions === options) return;
      this.off(prevProps);
      this.on();
    }

    componentWillUnmount() {
      this.off(this.props);
    }

    createArgs(eventTypes = {}) {
      return Object.keys(eventTypes)
        .map(eventType => [
          eventType,
          ...ensureArray(eventTypes[eventType])
            .map(fn => (...args) => fn.apply(this, [...args, this.props])),
        ]);
    }

    dispatch(props, callback) {
      const options = mapPropsToOptions(props);
      if (!options.path) return;
      this.context.store.dispatch(({ firebase }) => {
        const ref = firebase.child(options.path);
        const type = callback(ref, options);
        const payload = optionsToPayload(options);
        return { type, payload };
      });
    }

    on() {
      this.dispatch(this.props, (ref, { on, once, params = [] }) => {
        params.forEach(([method, ...args]) => {
          ref = ref[method](...args); // eslint-disable-line no-param-reassign
        });
        this.onArgs = this.createArgs(on);
        this.onArgs.forEach(arg => ref.on(...arg));
        this.onceArgs = this.createArgs(once);
        this.onceArgs.forEach(arg => ref.once(...arg));
        return 'REDUX_FIREBASE_ON_QUERY';
      });
    }

    off(props) {
      this.dispatch(props, ref => {
        this.onArgs.forEach(arg => ref.off(...arg));
        this.onceArgs.forEach(arg => ref.off(...arg));
        return 'REDUX_FIREBASE_OFF_QUERY';
      });
    }

    render() {
      return <Wrapped {...this.props} { ...this.state } />;
    }

  }

  return FirebaseQuery;
}
