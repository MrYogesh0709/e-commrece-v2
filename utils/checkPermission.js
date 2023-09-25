import { UnauthorizedError } from "../errors/customError.js";

const checkPermissions = (requestUser, resourceUserId) => {
  // console.log(requestUser.id);
  // console.log(resourceUserId.toString());
  if (requestUser.role === "admin") return;
  if (requestUser.id === resourceUserId.toString()) return;
  throw new UnauthorizedError("Not authorized to access this route");
};
export default checkPermissions;
