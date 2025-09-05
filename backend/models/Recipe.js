import mongoose from 'mongoose';

const IngredientSchema = new mongoose.Schema({
    id: Number,
    name: String,
    image: String,
    amount: Number,
    unit: String,
}, { _id: false });

const RecipeSchema = new mongoose.Schema({
    spoonacularId: { type: Number, required: true, unique: true, index: true },
    title: { type: String, index: true },
    image: String,
    summary: String,
    sourceUrl: String,

    cuisines: [String],
    diets: [String],
    readyInMinutes: Number,
    servings: Number,

    ingredients: [IngredientSchema],
    instructions: String,

    lastSyncedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Recipe', RecipeSchema);