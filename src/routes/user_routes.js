import express from "express";
import { users_view } from "../constrollers/user_controller.js";
import { session_validation } from "../validators/session_validation.js";

const user_router = express.Router();

user_router.get("/", session_validation, users_view);

user_router.get("/:id", (req, res, next) => {
    const {params} = req;
    console.log(params);
    res.send("Ver un usuario");
});

export default user_router;