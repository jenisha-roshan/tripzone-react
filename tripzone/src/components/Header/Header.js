import "./Header.scss";
import { useState, useEffect } from "react";
import HeaderLink from "../HeaderLink/HeaderLink";
import { formatTime } from "../.././utils/formatTime";
import { getTimeInTimezone } from "../../utils/getTimeInTimezone";
import { getMinutesAndSeconds } from "../../utils/getMinutesAndSeconds";
import { getCurrentDateEST } from "../../utils/getCurrentDateEST";

function Header() {
  const [sessionTime, setSessionTime] = useState(0);
  const [loggedInTime, setLoggedInTime] = useState(null);
  const [user,setUser] = useState(null);

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

  const currentTimeIST = getTimeInTimezone("Asia/Kolkata");
  const currentTimeEST = getTimeInTimezone("America/New_York");

  const { minutes, seconds } = getMinutesAndSeconds(sessionTime);

  return (
    <header className="site-header">
      <div className="header-wrapper">
        <div className="header-logo">TRIPZONE</div>
      </div>
      <nav>
        <ul>
          <HeaderLink
            text="SESSION TIME"
            time={`${formatTime(minutes)}:${formatTime(seconds)}`}
          />
          <HeaderLink
            text={`${getCurrentDateEST} - EST`}
            time={currentTimeEST}
          />
          <HeaderLink
            text={`${getCurrentDateEST} - IST`}
            time={currentTimeIST}
          />
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
