import express from "express";
import {getUsers, getUser} from "../controllers/users";
const router = express.Router();

router.post("/users", getUsers);
router.post("/user/:id", getUser);

export default router;