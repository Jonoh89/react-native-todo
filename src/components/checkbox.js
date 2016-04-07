import React, {
  View,
  PropTypes,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const defaultProps = {
  icon: 'check',
  size: 30,
  color: 'green',
};

const propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  style: PropTypes.number,
};

function ItemCheckbox({ style, color, size, checked }) {
  return (
    <View style={style}>
      <Icon.Button
        name={checked ? 'check-circle' : 'circle-o'}
        size={size}
        color={color}
        backgroundColor="transparent"
      />
    </View>
  );
}

ItemCheckbox.defaultProps = defaultProps;
ItemCheckbox.propTypes = propTypes;

module.exports = ItemCheckbox;
