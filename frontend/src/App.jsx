import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Home from './pages/Home'
import Footer from './components/Footer'
import RecipeDetails from './pages/RecipeDetails'
import RandomRecipe from './pages/RandomRecipe';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/random' element={<RandomRecipe />} />
          <Route path='/recipe/:id' element={<RecipeDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </>
  )
}

export default App
