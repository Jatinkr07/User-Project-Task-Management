import User from "../models/User.js";

export const getUserDetails = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUserDetails = async (req, res, next) => {
  try {
    const { name, country } = req.body;
    const updates = {};

    if (name) updates.name = name;
    if (country) updates.country = country;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
