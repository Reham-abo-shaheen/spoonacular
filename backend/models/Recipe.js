import mongoose from 'mongoose';

const IngredientSchema = new mongoose.Schema({
    id: Number,
    name: String,
    image: String,
    amount: Number,
    unit: String,
}, { _id: false });
const extendedIngredientsSchema = new mongoose.Schema({
    image: String,
    name: String,
    measures: {
        metric: {
            amount: Number,
            unitShort: String,
        }

    }
}, { _id: false })

const StepsSchema = new mongoose.Schema(
    {
        number: Number,
        step: String,
    }, { _id: false }
)
const InstructionsSchema = new mongoose.Schema({
    name: String,
    steps: [StepsSchema],
}, { _id: false })
const RecipeSchema = new mongoose.Schema({
    spoonacularId: { type: Number, required: true, unique: true, index: true },
    title: { type: String, index: true },
    image: String,
    analyzedInstructions: [InstructionsSchema],
    extendedIngredients: [extendedIngredientsSchema],
    dishTypes: [String],
    cuisines: [String],
    diets: [String],
    readyInMinutes: Number,
    servings: Number,

    ingredients: [IngredientSchema],
    instructions: String,

    lastSyncedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Recipe', RecipeSchema);