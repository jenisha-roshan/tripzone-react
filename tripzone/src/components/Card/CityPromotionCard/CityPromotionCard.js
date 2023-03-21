import "./CityPromotionCard.scss";
import Button from "../../Button/Button";
import CityCard from "../CityCard/CityCard";
import { useState } from "react";


function CityPromotionCard({city,spotData,previousDestination,handlePreviousClick}) {
  const [showPreviousButton, setShowPreviousButton] = useState(true);
  const handlePreviousButtonClick = () => {
    setShowPreviousButton(false);
    handlePreviousClick();
  };
  return (
    <div className="city-promotion-container">
    {" "}
    <div className="promotion-card-header">
      <h3>Travelling to {city.cityName.toUpperCase()} ? Know more about it</h3>
      {(showPreviousButton && previousDestination) && (
        <Button
          size="small"
          value="PREVIOUS"
          onClick={handlePreviousButtonClick}
          ></Button>
      )}
    </div>
    <p className="weather-text">{city.weather}</p>
    <p className="description-text">{city.description}</p>
    
    {spotData &&
      [spotData].map((spot) => (
        <div className="global-promotion-card-container">
          <CityCard
            key={spot.place}
            src={spot.image}
            heading={spot.place}
            subHeading={spot.city}
          />
        </div>
      ))}
  </div>
  );
}

export default CityPromotionCard;
