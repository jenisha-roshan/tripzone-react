import React from 'react';
import "./FlightCard.scss";
import Button from '../../Button/Button';
import airIndia from "../../../assets/air-india.png"

const FlightCard = (props) => {
  console.log("CONTAINER - FLIGHT CARD");

  const handleBookClick = () => {
    props.onBookClick();
  };

  return (
    <div className="flight-card">
      <div className="image-container">
        <img className='flight-card-img' src={airIndia} alt="Air India Logo" />
      </div>
      <div className="flight-text-container">
        <p className='flight-header-text'>{props.title}</p>
        <p className='flight-place-text'>{props.source} - {props.destination}</p>
        <p className='flight-price-text'>$ {props.price}</p>
      </div>
      <div className="button-container">
        <Button size="small" value={props.buttonText} onClick={handleBookClick}></Button>
      </div>
    </div>
  );
}

export default FlightCard;
