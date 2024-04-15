import { Router } from "express";
import {
  getAllUsers,
  getOneUser,
  createOneUser,
  addImage,
} from "./handlers.js";

const router = Router();
// router.get(`/`, getAllUsers);
router.post(`/`, createOneUser);
router.post(`/login`, getOneUser);
router.post(`/add_image`, addImage);
export default router;
