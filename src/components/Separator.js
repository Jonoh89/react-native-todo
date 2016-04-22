import React, { View, StyleSheet, PropTypes } from 'react-native';

const styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#bbbbbb',
    marginLeft: 15,
    marginRight: 15,
  },
});

const propTypes = {
  style: PropTypes.object,
};

const Separator = ({ style }) => {
  const separatorStyle = style ? { ...styles.separator, ...style } : styles.separator;
  return <View style={separatorStyle} />;
};

Separator.propTypes = propTypes;

export default Separator;
