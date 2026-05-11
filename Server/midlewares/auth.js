import express from "express";
import jwt from "jsonwebtoken";
import login from "../model/login.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = await login.findById(decoded.id);
    next();
  } catch (error) {
    res.status(500).json({ message: "Unauthorized", error });
  }
};
