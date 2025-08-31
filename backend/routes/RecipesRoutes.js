import express from "express";
import { getRandomRecipe, getRecipeById, search } from "../controllers/RecipesController.js";
const router = express.Router();

router.get('/random', getRandomRecipe);
router.get("/search", search)
router.get('/:id', getRecipeById)

export default router;