import { RequestHandler } from "express";
import UserModel from "../models/UserModel";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  const authenticatedUserID = req.session.userId;
  try {
    if (!authenticatedUserID) {
      throw createHttpError(401, "User not authenticated");
    }
    const user = await UserModel.findById(authenticatedUserID)
      .select("+email")
      .exec();
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

interface SignUpBody {
  username?: string;
  email?: string;
  password?: string;
}

export const signup: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const passwordRaw = req.body.password;
  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, "Parameters missing");
    }
    const existing = await UserModel.findOne({
      username: username,
    }).exec();
    if (existing) {
      throw createHttpError(
        409,
        "Username already taken. Please choose a different one or login instead."
      );
    }
    const existingEmail = await UserModel.findOne({
      email: email,
    }).exec();
    if (existingEmail) {
      throw createHttpError(
        409,
        "A user with this email already exists. Please login instead."
      );
    }
    const passwordHashed = await bcrypt.hash(passwordRaw, 10);
    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: passwordHashed,
    });

    req.session.userId = newUser._id;

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

interface LoginBody {
  username?: string;
  password?: string;
}

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    if (!password || !username) {
      throw createHttpError(400, "username or password missing");
    }
    const user = await UserModel.findOne({
      username: username,
    })
      .select("+password +email")
      .exec();
    if (!user) {
      throw createHttpError(401, "Invalid credentials");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw createHttpError(401, "Invalid credentials");
    }
    req.session.userId = user._id;
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
