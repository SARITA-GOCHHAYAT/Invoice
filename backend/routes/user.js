

import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/', async (req, res) => {
  const { username, email, password } = req.body;
  const existingUserByEmail = await User.findOne({ email });
  const existingUserByUsername = await User.findOne({ username });

  if (existingUserByEmail) {
    return res.json({ status: false, message: "Email is already registered" });
  }

  if (existingUserByUsername) {
    return res.json({ status: false, message: "Username is already taken" });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });

  await newUser.save();
  return res.json({ status: true, message: "Registration successful" });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ status: false, message: "User is not registered" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({ status: false, message: "Password is incorrect" });
  }

  const token = jwt.sign({ username: user.username }, process.env.KEY, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true, maxAge: 360000 });
  return res.json({ status: true, message: "Login successful" });
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ status: true, message: "Logout successful" });
});

export { router as UserRouter };
