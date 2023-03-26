import React, { useState, useEffect } from "react";
import FlightService from "../../services/FlightService";
import "./FlightSearch.scss";
import Button from "../../components/Button/Button";
import { getCities } from "../../services/TourismService";
import logo from "../../assets/logo.png";
import Dropdown from "../../components/Dropdown/Dropdown";
import FlightCard from "../../components/Card/FlightCard/FlightCard";
import BookCard from "../../components/Card/BookNowCard/BookCard";
import { DestinationContext } from "../../screens/HomePage/HomePage";
import { AppConstants } from "../../constants/App.constants";
import { useContext } from "react";

const FlightSearch = () => {
  const { setDestination } = useContext(DestinationContext);
  const [sourceCode, setSourceCode] = useState("");
  const [destinationCode, setDestinationCode] = useState("");
  const [flightData, setFlightData] = useState([]);
  const [showBookCard, setShowBookCard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { FLIGHT_SEARCH } = AppConstants.COMMONS;

  // Function used to handle when a city is Searched

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const data = await FlightService(sourceCode, destinationCode);
      setFlightData(data);
      setIsSubmitted(true);
      setShowBookCard(false);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  // Used to fetch cities data

  useEffect(() => {
    async function fetchCities() {
      try {
        const data = await getCities();
        setCities(data);
        setIsLoading(false);
      } catch (e) {
        setError(e);
      }
    }
    fetchCities();
  }, []);

  const handleDestinationChange = (e) => {
    setDestinationCode(e.target.value);
    setDestination(e.target.value);
  };
  return (
    <div>
      <div className="form-container">
        {/* FLIGHT SEARCH CONTAINER STARTS  */}

        <form className="flight-form" onSubmit={handleSearch}>
          <h3 className="flight-form-header">{FLIGHT_SEARCH.FORM_HEADER}</h3>

          <p className="label">{FLIGHT_SEARCH.SOURCE}</p>
          <Dropdown
            id="sourceCode"
            name="sourceCode"
            value={sourceCode}
            onChange={(event) => setSourceCode(event.target.value)}
            className="form-input"
            data={cities}
            required
          ></Dropdown>
          <br />
          <p className="label">{FLIGHT_SEARCH.DESTINATION}</p>
          <Dropdown
            id="destinationCode"
            name="destinationCode"
            value={destinationCode}
            onChange={handleDestinationChange}
            className="form-input"
            data={cities}
            required
          ></Dropdown>
          <br />
          <Button
            size="large"
            type="submit"
            value={isLoading ? "Searching..." : "SEARCH"}
          ></Button>
        </form>
        {/* FLIGHT SEARCH CONTAINER ENDS  */}

        {/* AVAILABLE FLIGHT CONTAINER STARTS  */}

        {error && <div>Error: {error}</div>}
        {isSubmitted && flightData.length > 0 ? (
          <div className="available-flights-container">
            <h3 className="available-flights-header">
              {FLIGHT_SEARCH.AVAILABLE_FLIGHTS_HEADER}
            </h3>
            <div>
              {flightData.map((flight) => (
                <FlightCard
                  key={flight.flightNumber}
                  image={logo}
                  title={flight.flightName}
                  source={flight.src}
                  destination={flight.dest}
                  price={flight.price}
                  buttonText="BOOK"
                  onBookClick={() => {
                    setSelectedFlight(flight);
                    setShowBookCard(true);
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          isSubmitted && (
            <div className="available-flights-container">
              <h3 className="available-flights-header margin-10">
                {FLIGHT_SEARCH.NO_FLIGHTS_MSG}
              </h3>
            </div>
          )
        )}
        {/* AVAILABLE FLIGHT CONTAINER STARTS  */}

        {/* BOOK_NOW CONTAINER ENDS  */}

        {flightData.length > 0 && showBookCard && (
          <BookCard
            key={flightData.sourceCode}
            ticketAmt={`$ ${selectedFlight.price}`}
          />
        )}

        {/* BOOK_NOW CONTAINER ENDS  */}
      </div>
    </div>
  );
};

export default FlightSearch;
