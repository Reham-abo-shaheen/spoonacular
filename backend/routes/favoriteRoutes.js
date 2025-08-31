import express from "express";
import { addFavorite, getFavorites, removeFavorite } from "../controllers/favoriteController.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.get("/", auth, getFavorites);
router.post("/newFavorite", auth, addFavorite);
router.delete("/:id", auth, removeFavorite);

export default router;