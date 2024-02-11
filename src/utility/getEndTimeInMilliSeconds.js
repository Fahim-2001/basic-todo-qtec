export const getEndTimeInMilliSeconds = (endTime) => {
    const timeParts = endTime.split(":");
    const dateObj = new Date();
    dateObj.setHours(parseInt(timeParts[0], 10));
    dateObj.setMinutes(parseInt(timeParts[1], 10));
    const timeInMilliseconds = dateObj.getTime();
    return timeInMilliseconds;
  };