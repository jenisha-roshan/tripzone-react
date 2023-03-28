// Function used to get the current time in a specific timezone and format it as a string
 
export const getTimeInTimezone = (timezone) => {
    const timeOptions = {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
    };
 
    return new Date().toLocaleString("en-US", timeOptions);
  };