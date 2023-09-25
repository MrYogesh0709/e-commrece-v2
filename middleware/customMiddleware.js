import passport from "passport";

export function isAuth(req, res, next) {
  // return passport.authenticate("jwt");
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (error || !user) {
      // Handle the authentication error
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Authentication successful
    req.user = user;
    next();
  })(req, res, next);
}

export function sanitizeUser(user) {
  return { id: user.id, role: user.role };
}

export const corsMiddleware = (req, res, next) => {
  res.header("Access-Control-Allow-Origin");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
};

export const cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

export const jwtOptions = {
  //  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Authorization Bearer token
  jwtFromRequest: cookieExtractor, //For cookies
  secretOrKey: process.env.JWT_SECRET_KEY,
};
