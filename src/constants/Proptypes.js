import PropTypes from 'prop-types';

const PredefinedPropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.shape({ render: PropTypes.func.isRequired }),
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.object,
    PropTypes.func,
    PropTypes.string
  ]),
  location: PropTypes.shape({
    key: PropTypes.string,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired,
    state: PropTypes.object
  })
};

export default PredefinedPropTypes;
