import './App.css';
import AddNewRecipe from "./Components/AddNewRecipe";
import ViewRecipe from "./Components/ViewRecipe";

function App() {
  return (
    <div className="App">
      {/* <AddNewRecipe />   */}
      <ViewRecipe name = "Quinoa Fried Rice with Sticky Spiced Chicken" id ="1" />
    </div>
  );
}

export default App;
