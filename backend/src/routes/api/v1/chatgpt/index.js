import { Router } from "express";
import { getChatGPTResponse } from "./handlers.js";
const router = Router();
router.post("/", getChatGPTResponse);

export default router;
