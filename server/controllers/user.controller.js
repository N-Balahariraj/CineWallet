const userModal = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.Register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await userModal.findOne({ email });
    if (user) {
      console.log("Email already exist");
      res.status(409).send({ message: "The specified mail already exist" });
      return;
    }
    const newUser = new userModal({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
    });
    const NewUser = await newUser.save();
    res.status(201).send({ message: "User registred successfully" });
  } catch (e) {
    console.log("err : ", e);
    res.status(500).send({ message: "Server error", err: e });
  }
};

exports.Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModal.findOne({ email });
    if (!user) {
      console.log("The user does not exist : ", user);
      res
        .status(404)
        .send({ message: "The specified user does not exist", result: user });
      return;
    }
    const isValidPass = bcrypt.compareSync(password, user.password);
    if (!isValidPass) {
      console.log("The password is incorrect");
      res.status(401).send({ message: "Invalid password credentials" });
      return;
    }
    const accessToken = jwt.sign(
      {
        id: user._id,
        name: user.name,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      {
        id: user._id,
        name: user.name,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "24h" }
    );
    res.cookie("ACCESS_TOKEN", accessToken, {
      secure: true,
      sameSite: "Lax",
    });
    res.cookie("REFRESH_TOKEN", refreshToken, {
      secure: true,
      sameSite: "Lax",
    });
    res.status(200).send({ message: "Login Successfull" });
  } catch (e) {
    console.log("err : ", e);
    res.status(500).send({ message: "Server Error" });
  }
};

exports.AccessRefresh = async (req, res) => {
  const freshToken = jwt.sign(
    {
      id: req.user._id,
      name: req.user.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
  res.cookie("ACCESS_TOKEN", freshToken, {
    secure: true,
    sameSite: "lax",
  });
  res.status(200).send({ message: "Refreshed access token" });
};
