import jwt from "jsonwebtoken";

const ensureAuthenticated = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token is required" });
  }
  try {
    const token = auth.split(" ")[1]; // Extract token from 'Bearer <token>'
    const decoded = jwt.verify(token, "thekhan");
    req.user = decoded; // Set user in request
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token wrong or expired" });
  }
};

export default ensureAuthenticated;
