import UserModel from '../models/userModel.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

const getUser = async (req, res) => {
  const user = await UserModel.find();
  res.status(200).json(user);
};

const login = async (req, res) => {
  
  try {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email}).select('+password');

    if (!user) {
      return res.status(401).json({message: 'Invalid email or password'});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({message: 'Invalid email or password'});
    }

    const token = jwt.sign({
      userId: user._id, 
      email: user.email,
      name: user.name,
      role: user.role
    }, process.env.JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

    res.status(200).json({message: 'Login successful', token});
    
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    // Validate required fields
    if (!email || !name || !password) {
      return res.status(400).json({message: "All fields are required"});
    }
    /* TODO: handle db ijection with mongoose sanitize and zod*/

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(409).json({message: "Email already registered"});
      return;
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      email: email.toLowerCase(), // Store email in lowercase
      name,
      password: hashedPassword,
      role: 'user' // Default role
    });

    await newUser.save();

    const token = jwt.sign({
      userId: newUser._id, 
      email: newUser.email,
      name: newUser.name,
      role: newUser.role
    }, process.env.JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

    res.status(201).json({
      message: "User registered successfully",
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: "Internal server error"});
  }
};

const authControllers = { getUser, login, register };
export default authControllers;