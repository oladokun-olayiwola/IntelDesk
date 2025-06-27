import { Router } from "express";
import { getAllUsers } from "../controllers/User";

const router = Router()

router.get("/", getAllUsers)

export default router
