export const fmtDate = (d) => {
    try {
      return new Date(d).toLocaleString();
    } catch {
      return d || "";
    }
  };
  export const categoryStyles = {
  Important: " text-green-700  ",
  Promotions: " text-blue-700  ",
  Social: " text-indigo-700  ",
  Marketing: " text-yellow-700  ",
  Spam: " text-red-700  ",
  General: " text-gray-700  ",
};
