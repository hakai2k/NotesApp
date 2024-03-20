import express from "express";
import * as UserController from "../controllers/UserController";

const UserRouter = express.Router();

UserRouter.get("/", UserController.getAuthenticatedUser);
UserRouter.post("/signup", UserController.signUp);
UserRouter.post("/login", UserController.login);
UserRouter.post("/logout", UserController.logout);

export default UserRouter;
