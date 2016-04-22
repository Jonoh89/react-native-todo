import React, {
  PropTypes,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const defaultProps = {
  size: 30,
  color: 'green',
};

const propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  checked: PropTypes.bool.isRequired,
};

function ItemCheckbox({ color, size, checked }) {
  return (
    <Icon.Button
      name={checked ? 'check-circle' : 'circle-o'}
      size={size}
      color={color}
      backgroundColor="transparent"
    />
  );
}

ItemCheckbox.defaultProps = defaultProps;
ItemCheckbox.propTypes = propTypes;

module.exports = ItemCheckbox;
