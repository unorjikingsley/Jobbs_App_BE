import { UnauthenticatedError } from "../errors/CustomError.js";
import { verifyJWT } from "../utils/tokenUtil.js";

export const authenticateUser = async (req, res, next) => {
  // console.log(req.cookies);

  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError('Authentication failed');

  try {
    const { userId, role } = verifyJWT(token);
    // console.log(user);
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication failed');
  }
  // next();
}
