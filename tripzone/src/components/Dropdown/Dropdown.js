import PropTypes from "prop-types";
function Dropdown({ id, name, onChange, className, value, data }) {
  return (
    <select id={id} name={name} className={className} onChange={onChange}>
      <option value={value}>
        Choose
      </option>
      {data?.map((city) => (
        <option key={city.code} value={city.code}>
          {city.name}
        </option>
      ))}
    </select>
  );
}

Dropdown.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  className: PropTypes.string.isRequired,
  data: PropTypes.array,
};

export default Dropdown;
