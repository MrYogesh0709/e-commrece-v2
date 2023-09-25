import { UnauthenticatedError } from "../errors/customError.js";

const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      throw new UnauthenticatedError("Unauthorized to access this route");
    }
    next();
  };
};

export default verifyRoles;
