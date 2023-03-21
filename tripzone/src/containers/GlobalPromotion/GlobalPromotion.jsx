import "./GlobalPromotion.scss";
import { useState, useEffect } from "react";
import { AppConstants } from "../../constants/App.constants";
import {getTouristSpots,} from "../../services/TourismService";
import CityCard from "../../components/Card/CityCard/CityCard";
const { HEADINGS } = AppConstants.COMMONS;

function GlobalPromotion() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  // FUNCTION USED TO FETCH ALL THE TOURIST SPOTS
  
  useEffect(() => {
    async function fetchTouristSpots() {
      try {
        const data = await getTouristSpots("ALL");
        setData(data);
      } catch (e) {
        setError(e);
        console.log(error);
      }
    }
    fetchTouristSpots();
  }, [error]);

  return (
    <div className="light-blue-container global-promotion-container">
      <h3>{HEADINGS.GLOBAL_PROMOTION}</h3>
      <div className="global-promotion-card-container">
        {data &&
          data.map((city) => (
            <CityCard
              key={city.place}
              src={city.image}
              heading={city.place}
              subHeading={city.city}
            />
          ))}
      </div>
    </div>
  );
}

export default GlobalPromotion;
