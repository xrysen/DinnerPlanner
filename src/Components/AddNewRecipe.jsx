import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import "./AddNewRecipe.css";
import { useState, useEffect } from "react";
import AutoComplete from "@material-ui/lab/Autocomplete";

const AddNewRecipe = (props) => {
  const [recipeName, setRecipeName] = useState("");
  const [directions, setDirections] = useState("");
  const [existingIng, setExistingIng] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [numIngredients, setNumIngredients] = useState(0);
  const items = [];

  useEffect(() => {
    fetch("http://localhost:8080/ingredients")
    .then((res) => res.json())
    .then((res) => setExistingIng(res));
  }, [existingIng]);

  const handleIngredient = (index, event, value) => {
    let arr = [...ingredients];
    arr[index] = value.name;
    setIngredients(arr);
  }

  for (let i = 0; i <= numIngredients; i++) {
    items.push(
      <AutoComplete key = {i} 
      id = "ingredient"
      options = {existingIng}
      getOptionLabel={(option) => option.name}
      getOptionSelected={(option, value) => option.name === value.name}
      renderInput={(params) => <TextField {...params} label = "Ingredient" variant="outlined" />}
      onChange = {(event, value) => handleIngredient(i, event, value)}
      />
    )
  }

  const increaseIngredientCount = () => {
    setNumIngredients(numIngredients + 1);
  };

  const decreaseIngredientCount = () => {
    let arr = [...ingredients];
    arr.pop();
    setIngredients(arr);
    setNumIngredients(numIngredients - 1);
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
          {items}
        </div>
        <Icon onClick={() => increaseIngredientCount()}>add_circle</Icon>
        <Icon onClick={() => decreaseIngredientCount()}>-</Icon>
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
