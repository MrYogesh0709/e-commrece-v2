export const origin =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.REACT_APP_API_ORIGIN;
