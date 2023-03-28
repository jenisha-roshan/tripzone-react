// Function used to return an object with the number of minutes and seconds based on seconds provided

export const getMinutesAndSeconds = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return { minutes, seconds };
  };
 
 
 