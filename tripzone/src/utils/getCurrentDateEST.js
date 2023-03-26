export const getCurrentDateEST = new Date().toLocaleDateString("en-US", {
    timeZone: "Asia/Kolkata",
    year: "2-digit",
    month: "short",
    day: "numeric",
  });
  