import "./Search.scss";
import { useRef } from "react";
import { AppConstants } from "../../constants/App.constants";
import { useState, useEffect } from "react";
import { getCityInformation } from "../../services/TourismService";
import { getTouristSpots } from "../../services/TourismService";
import { useContext } from "react";
import { DestinationContext } from "../../screens/HomePage/HomePage";
import CityPromotionCard from "../../components/Card/CityPromotionCard/CityPromotionCard";

const { SEARCH } = AppConstants.COMMONS;

function Search() {
  const [destinationCode, setDestinationCode] = useState("");
  const { destination } = useContext(DestinationContext);
  const [currentDestination, setCurrentDestination] = useState(destination);

  // const [destination, setDestination] = useState("");
  const [spotData, setSpotData] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentCity, setCurrentCity] = useState("");
  const [previousDestination, setPreviousDestination] = useState("");
  const [shouldSearchAgain, setShouldSearchAgain] = useState(false);
  const [showPreviousButton, setShowPreviousButton] = useState(false);

  // selectedCityRef - Object that is a reference that persists between renders
  const selectedCityRef = useRef();

  // Function to handle search
  const handleSearch = async () => {
    setError(null);
    setIsSubmitted(true);

    try {
      const data = await getCityInformation(destinationCode);
      const spotData = await getTouristSpots(destinationCode);
      setData(data);
      setSpotData(spotData);
      setPreviousDestination(selectedCityRef.current); // set the previous destination to the current destination
      setCurrentCity(destinationCode);
      setShouldSearchAgain(false);
      setShowPreviousButton(false);
      setDestinationCode(""); // set input box value to default
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDestinationSearch = async () => {
    setError(null);
    setIsSubmitted(true);

    try {
      const data = await getCityInformation(destination);
      const spotData = await getTouristSpots(destination);
      setData(data);
      setSpotData(spotData);
      setDestinationCode(""); // set input box value to default
      setShouldSearchAgain(false);
      setShowPreviousButton(false);
    } catch (error) {
      setError(error.message);
    }
  };

  // Function to call handleSearch when ENTER is pressed
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };

  // Function used to store the latest value of currentCity in the selectedCityRef
  useEffect(() => {
    selectedCityRef.current = currentCity;
    setShowPreviousButton(true);
  }, [currentCity]);

  // Function used to call handleSearch when previous-btn is clicked
  useEffect(() => {
    if (shouldSearchAgain) {
      handleSearch();
    }
  }, [shouldSearchAgain]);

  // Function called when Previous-Btn is clicked
  const handlePreviousClick = () => {
    if (destinationCode !== previousDestination) {
      setShouldSearchAgain(true);
      setDestinationCode(previousDestination);
      setShowPreviousButton(false);
    }
  };

  useEffect(() => {
    if (destination !== currentDestination) {
      setCurrentDestination(destination);
      handleDestinationSearch();
    }
  }, [destination,currentDestination]);
  
  return (
    <>
      <div className="light-blue-container">
        <h3 className="search-header">{SEARCH.SEARCH_HEADER}</h3>
        <div className="search-text-section">
          <p className="search-sub-text">{SEARCH.PARA_ONE}</p>
          <p className="search-sub-text">{SEARCH.PARA_TWO}</p>
        </div>
        <input
          className="search-field"
          type="text"
          value={destinationCode}
          onChange={(event) => setDestinationCode(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder= {SEARCH.SEARCH_PLACEHOLDER}
        />
      </div>
      {error ||
      (isSubmitted &&
        destinationCode !== "" &&
        destination !== "" &&
        spotData.length === 0) ? (
        <div className="city-promotion-container">
          <h3>{SEARCH.CITY_NOT_FOUND}</h3>
        </div>
      ) : (
        data &&
        spotData &&
        data.map((city) => (
          <CityPromotionCard
            key = {city}
            city={city}
            spotData={spotData}
            previousDestination={previousDestination}
            handlePreviousClick={handlePreviousClick}
            showPreviousButton = {showPreviousButton}
          />
        ))
      )}
    </>
  );
}

export default Search;