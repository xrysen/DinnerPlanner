import './App.css';
import AddNewRecipe from "./Components/AddNewRecipe";
import ViewRecipe from "./Components/ViewRecipe";
import ViewAllRecipes from "./Components/ViewAllRecipes";
import { useState } from "react";
import Landing from "./Components/Landing";

function App() {
  const [view, setView] = useState("Landing");
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
      {view === "Landing" && (<Landing />)}
    </div>
  );
}

export default App;
