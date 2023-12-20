import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from '../errors/CustomError.js'
import { verifyJWT } from "../utils/tokenUtil.js";

export const authenticateUser = (req, res, next) => {
  // console.log(req.cookies);

  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError('Authentication failed');

  try {
    const { userId, role } = verifyJWT(token);
    // console.log(user);
    const testUser = userId === '6583332fac4c3abde9252a1b'
    req.user = { userId, role, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication failed');
  };
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    // console.log(roles);
    if(!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Unauthorized to access this route')
    }
    next();
  }
};

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError('Demo User. Read Only')
  }
  next();
}
