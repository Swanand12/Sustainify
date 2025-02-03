import JWT from "jsonwebtoken";
import authModel from "../models/authModel.js";

export const requireSignIn = async (req, res, next) => {
  let token;

  if (req.headers.authorization) {
    try {
      token = req.headers.authorization;

      const decode = JWT.verify(token, process.env.JWT_SECRET_KEY);

      req.user = await authModel.findById({ _id: decode._id });

      next();
    } catch (error) {
      res.status(401).send({
        success: false,
        message: "Unauthorized Access",
        error,
      });
    }
  }
};
