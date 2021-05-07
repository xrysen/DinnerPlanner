import './App.css';
import AddNewRecipe from "./Components/AddNewRecipe";
import ViewRecipe from "./Components/ViewRecipe";
import ViewAllRecipes from "./Components/ViewAllRecipes";
import { useState } from "react";

function App() {
  const [view, setView] = useState("View All");
  const [id, setId] = useState(0);
  
  const changeView = (view, id) => {
    setView(view);
    setId(id);
  }

  return (
    <div className="App">
      {/* <AddNewRecipe />   */}
      {view === "Recipe Detail" && ( <ViewRecipe id ={id} back = {() => setView("View All", 0)} /> ) }
      {view === "View All" && ( <ViewAllRecipes onClick = {changeView} /> ) }
    </div>
  );
}

export default App;
