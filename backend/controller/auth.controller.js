import bcrypt from "bcryptjs";
import validator from "validator";
import User from "../models/userModel.js";
import genToken from "../configs/token.js";

export const signUp = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;
    email = email.toLowerCase(); // ✅ normalize email

    let existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    let user = await User.create({ name, email, password: hashPassword, role });

    let token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,     // ✅ false for localhost
      sameSite: "lax",   // ✅ works across localhost:5173 → localhost:8000
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ message: "User created", user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase(); // ✅ normalize email

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    let token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,     // ✅ false for localhost
      sameSite: "lax",   // ✅ avoids cookie being blocked
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "User logged in successfully", user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Logout failed" });
  }
};
