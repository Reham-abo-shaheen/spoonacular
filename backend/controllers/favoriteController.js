import User from '../models/User.js';

export const getFavorites = async (req, res) => {
    const user = await User.findById(req.userId).lean();
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user.favorites || []);
};

export const addFavorite = async (req, res) => {
    const { id, title, image } = req.body;

    if (!id) return res.status(400).json({ msg: "Recipe ID is required" });

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const favorite = user.favorites.find(f => f.id === Number(id));

    if (favorite) return res.status(400).json({ msg: "Recipe already in favorites" });

    user.favorites.push({ id: Number(id), title, image });

    await user.save();
    res.status(201).json({ msg: "Recipe added to favorites" });

}

export const removeFavorite = async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.favorites = user.favorites.filter(f => f.id !== Number(id));
    await user.save();

    res.json({ msg: "Removed from favorites" });
};