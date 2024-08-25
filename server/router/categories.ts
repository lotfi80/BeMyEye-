import express from "express";
import { Category } from "../models/Categories";

const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Category.find();
  return res.send(categories);
});

export default router;
