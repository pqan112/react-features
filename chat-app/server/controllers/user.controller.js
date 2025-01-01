import userModel from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  const jwtKey = process.env.JWT_SECRET_KEY;
  return jwt.sign({ _id }, jwtKey, { expiresIn: "3d" });
};

const userController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      let user = await userModel.findOne({ email });
      if (user)
        return res
          .status(400)
          .json("User with the given email already existed");

      if (!name || !email || !password)
        return res.status(400).json("All fields are required");

      if (!validator.isEmail(email))
        return res.status(400).json("Email must be a valid email...");

      if (!validator.isStrongPassword(password))
        return res.status(400).json("Password must be a strong password");

      const newUser = new userModel({ name, email, password });
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(newUser.password, salt);
      const savedUser = await newUser.save();
      const token = createToken(savedUser._id);

      res.status(200).json({ _id: savedUser._id, name, email, token });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      let user = await userModel.findOne({ email });
      if (!user) return res.status(400).json("Invalid email or password");
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword)
        return res.status(400).json("Invalid email or password");

      const token = createToken(user._id);
      res.status(200).json({ _id: user._id, name: user.name, email, token });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getUserById: async (req, res) => {
    const userId = req.params.userId;
    try {
      const user = await userModel.findById(userId);
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const user = await userModel.find();
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
};

export default userController;
