import './App.css';
import AddNewRecipe from "./Components/AddNewRecipe";
import ViewRecipe from "./Components/ViewRecipe";
import ViewAllRecipes from "./Components/ViewAllRecipes";
import { useState } from "react";
import Landing from "./Components/Landing";
import { ViewContext } from "./Contexts/ViewContext";

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
      {view === "Recipe Detail" && ( <ViewRecipe id ={id} /> ) }
      {view === "View All" && ( <ViewAllRecipes onClick = {changeView} /> ) }
      <ViewContext.Provider value={{view, setView}}>
        {view === "Landing" && (<Landing />)}
      </ViewContext.Provider>
    </div>
  );
}

export default App;
