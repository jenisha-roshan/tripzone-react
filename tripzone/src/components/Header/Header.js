import "./Header.scss";
import { useState, useEffect } from "react";

function Header() {
  const [sessionTime, setSessionTime] = useState(0);
  const [loggedInTime, setLoggedInTime] = useState(null);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoggedInTime(new Date());
    }
  }, []);

  // Function used to set an interval to increment the sessionTime state variable by one every second and updates the currentTime state variable with the current date and time.

  useEffect(() => {
    if (loggedInTime) {
      const intervalId = setInterval(() => {
        setSessionTime((prevTime) => prevTime + 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [loggedInTime]);

  // Function used to return an object with the number of minutes and seconds based on seconds provided

  const getMinutesAndSeconds = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return { minutes, seconds };
  };

  // Function used to return formatted string

  const formatTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  // Function used to get the current time in a specific timezone and format it as a string

  const getTimeInTimezone = (timezone) => {
    const timeOptions = {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
    };

    return new Date().toLocaleString("en-US", timeOptions);
  };

  // Get the current time in IST and EST

  const currentTimeIST = getTimeInTimezone("Asia/Kolkata");
  const currentTimeEST = getTimeInTimezone("America/New_York");

  // Format the date in the desired format

  const currentDateEST = new Date().toLocaleDateString("en-US", {
    timeZone: "Asia/Kolkata",
    year: "2-digit",
    month: "short",
    day: "numeric",
  });
  const { minutes, seconds } = getMinutesAndSeconds(sessionTime);

  return (
    <header className="site-header">
      <div className="header-wrapper">
        <div className="header-logo">TRIPZONE</div>
      </div>
      <nav>
        <ul>
          <li className="header-link">
            <p className="header-small-text">SESSION TIME</p>
            <p className="header-time-text">
              {formatTime(minutes)}:{formatTime(seconds)}
            </p>
          </li>
          <li className="header-link">
            <p className="header-small-text">{currentDateEST} - EST</p>
            <p className="header-time-text">{currentTimeEST}</p>
          </li>
          <li className="header-link">
            <p className="header-small-text">{currentDateEST} - IST</p>
            <p className="header-time-text">{currentTimeIST}</p>
          </li>
        </ul>
      </nav>
      {user && (
        <div>
          <p className="user-name">Hi, {user.name}</p>
        </div>
      )}
    </header>
  );
}

export default Header;
