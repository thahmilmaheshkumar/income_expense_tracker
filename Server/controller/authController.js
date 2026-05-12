import express from "express";
import login from "../model/login.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import tracker from "../model/tracker.js";

export const Login = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ message: "Please enter all the fields" });
    }

    const result = await login.findOne({ $or: [{ name }, { email: name }] });

    if (!result) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, result.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign({ id: result._id }, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });

    res.cookie("token", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.log(error);
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please enter all the fields" });
    }

    const result = await login.findOne({ name });

    if (result) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new login({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const getAll = async (req, res) => {
  try {
    const trackers = await tracker.find({ user_id: req.user._id });

    const income = trackers.filter((tracker) => tracker.role === "income");
    const expense = trackers.filter((tracker) => tracker.role === "expense");
    res.status(200).json({ income, expense });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
