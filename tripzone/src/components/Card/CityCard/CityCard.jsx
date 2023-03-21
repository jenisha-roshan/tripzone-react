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
      <p className="city-card-heading">{heading}</p>
      <p className="city-card-subheading">{subHeading}</p>
    </div>
  );
}

CityCard.propTypes = {
  src: PropTypes.string,
  heading: PropTypes.string,
  subHeading: PropTypes.string,
};

export default CityCard;
