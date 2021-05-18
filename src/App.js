import "./App.scss";
import AddNewRecipe from "./Components/AddNewRecipe";
import { useState } from "react";
import ViewRecipes from "./Components/ViewRecipes";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import NavBar from "./Components/NavBar";
import Calendar from "./Components/Calendar";

function App() {
  const [view, setView] = useState("View Recipes");
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
          <NavBar addRecipe = {()=> changeView("Add Recipe")} viewRecipes = {()=> changeView("View Recipes")} calendar = {()=> changeView("Calendar")} />
        </Box>
        {view === "View Recipes" && (<ViewRecipes addNew = {()=> changeView("Add Recipe")}   />)}
        {view === "Add Recipe" && (<AddNewRecipe back = {()=> changeView("View Recipes")} />)}
        {view === "Calendar" && (<Calendar />)}
      </div>
    </div>
  );
}

export default App;
