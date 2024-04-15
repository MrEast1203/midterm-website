import { Router } from "express";
import { createOneCard, getAllCards, deleteOneCards } from "./handlers.js";

const router = Router();
router.post(`/`, createOneCard);
router.get(`/`, getAllCards);
router.post(`/deleteOne`, deleteOneCards);

export default router;
