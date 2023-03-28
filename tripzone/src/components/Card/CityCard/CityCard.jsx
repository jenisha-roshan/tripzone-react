import "./CityCard.scss";
import PropTypes from "prop-types";

function CityCard({ src, heading, subHeading }) {
  console.log("CONTAINER - CITY CARD");
  return (
    <div className="city-card-container">
      <img
        src={require(`../../../assets/images/${src}`)}
        className="city-card-img"
        alt="city-img"
      />
      <h2 className="city-card-heading">{heading}</h2>
      <h3 className="city-card-subheading">{subHeading}</h3>
    </div>
  );
}

CityCard.propTypes = {
  src: PropTypes.string,
  heading: PropTypes.string,
  subHeading: PropTypes.string,
};

export default CityCard;
