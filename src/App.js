import "./App.css";
import AddNewRecipe from "./Components/AddNewRecipe";
import { useState } from "react";
import ViewRecipes from "./Components/ViewRecipes";
import { ViewContext } from "./Contexts/ViewContext";
import ShowIngredients from "./Components/ShowIngredients";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import NavBar from "./Components/NavBar";

function App() {
  const [view, setView] = useState("Landing");
  const [id, setId] = useState(0);

  const changeView = (view, id) => {
    setView(view);
    setId(id);
  };

  return (
    <div className="App">
      <div className="landing-container">
        <Box className="hero-banner">
          <Paper>
            <h1 style={{ padding: "30px" }}>Dinner Planner</h1>
          </Paper>
          <NavBar />
        </Box>
        {view === "Landing" && (<ViewRecipes />)};
      </div>
    </div>
  );
}

export default App;
