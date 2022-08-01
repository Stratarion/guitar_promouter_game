import express from "express";
const router = express.Router();

import { signin, signup, googlesignin } from "../controllers/user.controller.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/googlesignin", googlesignin);

export default router;