import axios from 'axios';
import Recipe from '../models/Recipe.js';
import { spoonSearch, spoonGetRecipe, spoonRandom } from '../services/spoonacular.js';

function mapInfoToRecipeDoc(info) {
    return {
        spoonacularId: info.id,
        title: info.title,
        image: info.image,
        summary: info.summary,
        sourceUrl: info.sourceUrl,
        cuisines: info.cuisines || [],
        diets: info.diets || [],
        readyInMinutes: info.readyInMinutes,
        servings: info.servings,
        ingredients: (info.extendedIngredients || []).map(ing => ({
            id: ing.id,
            image: ing.image,
            name: ing.name,
            amount: ing.amount,
            unit: ing.unit
        })),
        instructions: info.instructions || "",
        lastSyncedAt: new Date()
    };
}

export const search = async (req, res) => {
    try {
        const { query, cuisine, diet, maxReadyTime, number = 10, offset = 0 } = req.query;

        const data = await spoonSearch({ query, cuisine, diet, maxReadyTime, number, offset });
        const results = data.results || [];
        const bulk = results.map(r => ({
            updateOne: {
                filter: { spoonacularId: r.id },
                update: {
                    $set: {
                        spoonacularId: r.id,
                        title: r.title,
                        image: r.image
                    },
                    $setOnInsert: { lastSyncedAt: new Date() }
                },
                upsert: true
            }
        }));
        if (bulk.length) await Recipe.bulkWrite(bulk, { ordered: false });

        res.json({ results, totalResults: data.totalResults || results.length });
    } catch (error) {
        console.error("searchRecipes error:", error.message);
        res.status(500).json({ message: "Failed to search recipes" });
    }
}

export const getRecipeById = async (req, res) => {
    try {
        const { id } = req.params; // spoonacular id
        let recipe = await Recipe.findOne({ spoonacularId: Number(id) });

        const isStale = recipe && recipe.lastSyncedAt && (Date.now() - recipe.lastSyncedAt.getTime() > 1000 * 60 * 60 * 24 * 7); // 7 days

        if (!recipe || isStale || !recipe.instructions) {
            const info = await spoonGetRecipe(id);
            const doc = mapInfoToRecipeDoc(info);
            recipe = await Recipe.findOneAndUpdate(
                { spoonacularId: doc.spoonacularId },
                { $set: doc },
                { new: true, upsert: true }
            );
        }

        res.json(recipe);
    } catch (err) {
        console.error("getRecipeById error:", err.message);
        res.status(500).json({ message: "Failed to get recipe" });
    }
}


export async function getRandomRecipe(req, res) {
    try {
        const { recipes } = await spoonRandom(1);
        const info = recipes && recipes[0];
        if (!info) return res.status(404).json({ message: "No recipe found" });

        const doc = mapInfoToRecipeDoc(info);
        const saved = await Recipe.findOneAndUpdate(
            { spoonacularId: doc.spoonacularId },
            { $set: doc },
            { new: true, upsert: true }
        );

        res.json(saved);
    } catch (err) {
        console.error("getRandomRecipe error:", err.message);
        res.status(500).json({ message: "Failed to get random recipe" });
    }
}