
import PropTypes from 'prop-types';

const SpinnerLoader = ({ size = 48, color = 'text-blue-600' }) => {
  const spinnerSize = {
    width: `${size}px`,
    height: `${size}px`,
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border-4 border-t-transparent ${color}`}
        style={spinnerSize}
      ></div>
    </div>
  );
};

SpinnerLoader.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

export default SpinnerLoader;
