import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/UserRoutes.js'
import favoriteRoutes from './routes/favoriteRoutes.js'
import RecipesRoutes from './routes/RecipesRoutes.js'
const app = express()
const port = 3000

dotenv.config()

// middleware
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))


// routes
app.use('/api/users', userRoutes)
app.use('/api/favorites', favoriteRoutes);
app.use('/api/recipes', RecipesRoutes)
// connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error(err));

// start the server
app.listen(port, () => {
    console.log(`My first server is running on port ${port}`)
})