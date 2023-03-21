import "./Button.scss";
import PropTypes from 'prop-types';
import classnames from "classnames";
import { AppConstants } from "../../constants/App.constants";

const { ATTRIBUTES } = AppConstants.COMMONS.BUTTON;

function Button({ value, onClick, size }) {
  const buttonClassNames = classnames(
    'btn',
    { 'small': size === ATTRIBUTES.SMALL },
    { 'medium': size === ATTRIBUTES.MEDIUM },
    { 'large': size === ATTRIBUTES.LARGE },
    {'btn-value-small' : size === ATTRIBUTES.SMALL}
  );
  
  return (
    <button className={buttonClassNames} onClick={onClick}>
      <p className="btn-value">{value}</p>
    </button>
  );
}

Button.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button;
