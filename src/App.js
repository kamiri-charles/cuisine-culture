import React from 'react'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RedirectToHome from './assets/scripts/redirect_to_home'
import Home from './components/Home'
import Recipe from './components/Recipe'
import SignUp from './components/Signup'
import SignIn from './components/Signin'
import FirstPage from './components/NewRecipe/FirstPage'
import SecondPage from './components/NewRecipe/SecondPage'
import ThirdPage from './components/NewRecipe/ThirdPage'
import Preview from './components/NewRecipe/Preview'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={ <RedirectToHome />} />
          <Route exact path='/sign-up' element={ <SignUp />} />
          <Route exact path='/sign-in' element={ <SignIn />} />
          <Route exact path='/recipes' element={ <Home />} />
          <Route exact path='/recipes/:recipe_owner/:recipe_title/' element={ <Recipe /> } />
          <Route exact path='/recipes/new' element={<FirstPage />} />
          <Route exact path='/recipes/new/1' element={<FirstPage />} />
          <Route exact path='/recipes/new/2' element={<SecondPage />} />
          <Route exact path='/recipes/new/3' element={<ThirdPage />} />
          <Route exact path='/recipes/new/preview' element={<Preview />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;