import express from "express";
import * as UserController from "../controllers/UserController";

const UserRouter = express.Router();

UserRouter.get("/", UserController.getAuthenticatedUser);
UserRouter.post("/signup", UserController.signup);
UserRouter.post("/login", UserController.login);

export default UserRouter;
