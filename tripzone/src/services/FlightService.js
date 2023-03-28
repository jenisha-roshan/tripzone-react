import axios from "axios";
import { AppConstants } from "../constants/App.constants";

const {FLIGHT_API} = AppConstants.COMMONS.API;

// Funtion used to Fetch data based on source and destination from FlightService API

const FlightService = async (sourceCode, destinationCode) => {
  const flightData = await axios.get(FLIGHT_API, {
    params: {
      src: sourceCode,
      dest : destinationCode
    },
  });
  return flightData.data;
};

export default FlightService;

