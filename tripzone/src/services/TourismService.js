import axios from "axios";
import { AppConstants } from "../constants/App.constants";


const { CITY_API, CITY_INFO_API, TOURIST_SPOTS_API} = AppConstants.COMMONS.API;

// Funtion used to Fetch City data from CityAPI

const getCities = async () => {
  const cityData = await axios.get(`${CITY_API}`);
  return cityData.data;
};

// Funtion used to Fetch Tourist spot data based on destination from TouristSpotAPI

const getTouristSpots = async (destinationCode) => {

  const touristSpotsData = await axios.get(`${TOURIST_SPOTS_API}/${destinationCode}`);
     return touristSpotsData.data;
  };

// Funtion used to Fetch City data based on destination 

const getCityInformation = async (destination) => {
  const cityInfoData = await axios.get(`${CITY_INFO_API}/${destination}`);
    return [cityInfoData.data];
  };

export {getCities, getCityInformation, getTouristSpots};
