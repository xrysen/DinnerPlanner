import './App.css';
import AddNewRecipe from "./Components/AddNewRecipe";
import ViewRecipe from "./Components/ViewRecipe";

function App() {
  return (
    <div className="App">
      {/* <AddNewRecipe />   */}
      <ViewRecipe id ="1" />
    </div>
  );
}

export default App;
