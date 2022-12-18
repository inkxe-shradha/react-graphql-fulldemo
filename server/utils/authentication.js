import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

const throwAuthenticationError = () => {
  throw new GraphQLError("You are not authorized to access this endpoint.", {
    extensions: "BAD_REQUEST",
  });
};

const authorized = (req, isCheck = false) => {
  const authHeader = req.headers.authorization || "";
  //   Don't have the Authorization header
  if (!authHeader) {
    req.isAuth = false;
    return isCheck ? req : throwAuthenticationError();
  }

  // Validate authorization token
  const token = authHeader.replace("Bearer ", "");
  if (!token) {
    req.isAuth = false;
    return isCheck ? req : throwAuthenticationError();
  }

  //   Decode authorization header
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!decodedToken) {
      req.isAuth = false;
      return isCheck ? req : throwAuthenticationError();
    }
    req.isAuth = true;
    req.id = decodedToken.id;
    req.email = decodedToken.email;
    req.token = token;
  } catch (error) {
    return isCheck ? req : throwAuthenticationError();
  }

  return req;
};

export default authorized;
