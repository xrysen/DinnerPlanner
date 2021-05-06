import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import "./AddNewRecipe.css";
import { useState } from "react";
import IngredientSelect from "./IngredientSelect";

const AddNewRecipe = (props) => {
  const [recipeName, setRecipeName] = useState("");
  const [directions, setDirections] = useState("");
  const [ingredients, setIngredients] = useState([{}]);

  const handleIngredient = (e, value) => {
    
    if (value) {
      setIngredients([...ingredients, { id: value.id, name: value.name }]);
    }
  };

  const [numIngredients, setNumIngredients] = useState([
    <IngredientSelect key={0} onChange={handleIngredient} />,
  ]);

  const increaseIngredientCount = () => {
    setNumIngredients([
      ...numIngredients,
      <IngredientSelect key={numIngredients.length} onChange={handleIngredient} />,
    ]);
  };

  const decreaseIngredientCount = () => {
    let arr = [...numIngredients];
    arr.pop();
    if (arr.length === 0) {
      arr = [<IngredientSelect key={0} />];
    }
    setNumIngredients(arr);
  };

  const handleRecipeName = (event) => {
    setRecipeName(event.target.value);
  };

  const handleDirections = (event) => {
    setDirections(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(recipeName);
    console.log(directions);
    console.log(ingredients);
  };

  return (
    <div>
      <h1>Add New Recipe</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          label="Recipe Name"
          onChange={handleRecipeName}
        />
        <div className="ingredient-list">
          {numIngredients.map((item) => {
            return item;
          })}
        </div>
        <Icon onClick={() => increaseIngredientCount()}>add_circle</Icon>
        <TextareaAutosize
          onChange={handleDirections}
          style={{ width: "400px", marginTop: "30px" }}
          rowsMin={20}
          placeholder="Recipe Directions"
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddNewRecipe;
