import logo from './logo.svg';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import RecipeCategory from './Components/RecipeCategory';
import RecipeDetails from './Components/RecipeDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path='/' component={RecipeCategory} />
        <Route exact path='/recipeData' component={RecipeDetails} />
      </div>
    </Router>
  );
}

export default App;
