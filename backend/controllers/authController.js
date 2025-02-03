import authModel from "../models/authModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const userRegisterController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.status(400).send({ message: "Name is required" });
    }
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is required" });
    }

    const existingUser = await authModel.findOne({ email });

    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User already registered",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await authModel.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(200).send({
      success: true,
      message: "Succesfully registered",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while registering user",
      error,
    });
  }
};

export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res
        .status(400)
        .send({ success: false, message: "Email is required" });
    }
    if (!password) {
      return res
        .status(400)
        .send({ success: false, message: "Password is required" });
    }

    const user = await authModel.findOne({ email });

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Email is not registered",
      });
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while Signing In",
      error,
    });
  }
};
