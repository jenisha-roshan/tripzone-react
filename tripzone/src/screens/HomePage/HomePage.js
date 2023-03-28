import React from "react";
import Header from "../../components/Header/Header";
import "./HomePage.scss";
import { useState } from "react";
import Search from "../../containers/Search/Search";
import GlobalPromotion from "../../containers/GlobalPromotion/GlobalPromotion";
import FlightSearch from "../../containers/FlightSearch/FlightSearch";

export const DestinationContext = React.createContext();

function HomePage() {
  const [destination, setDestination] = useState("");
  const handleDestinationChange = (value) => {
    setDestination(value);
  };
  return (
    <>
        <Header />
        <DestinationContext.Provider value={{ destination, setDestination }}>
          <div className="homepage-container">
            <div className="left-container">
              <div className="left-content">
                <Search
                  destination={destination}
                  onDestinationChange={handleDestinationChange}
                />
                <GlobalPromotion />
              </div>
            </div>
            <div className="right-container">
              <div className="right-content">
                <FlightSearch/>
              </div>
            </div>
          </div>
        </DestinationContext.Provider>
    </>
  );
}

export default HomePage;
