import express from "express";
import tracker from "../model/tracker.js";

export const addTracker = async (req, res) => {
  try {
    console.log(req.body);
    const { amount, category, role } = req.body;
    if (!amount || !category) {
      return res.status(400).json({ message: "Please enter all the fields" });
    }

    const newTracker = new tracker({
      user_id: req.user._id,
      name: category,
      amount: amount,
      category: category,
      role: role,
    });
    await newTracker.save();
    res.status(201).json({ message: "Tracker added successfully", newTracker });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
