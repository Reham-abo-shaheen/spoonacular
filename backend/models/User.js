import mongoose from "mongoose";

const favoritesSchema = new mongoose.Schema({
    id: { type: Number, required: true },     // ID من Spoonacular
    title: String,
    image: String,
}, { _id: false });

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favorites: [favoritesSchema]
}, { timestamps: true });

const User = mongoose.model("User", userSchema)

export default User;