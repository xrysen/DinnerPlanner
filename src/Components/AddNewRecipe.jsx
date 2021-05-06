import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import "./AddNewRecipe.css";
import { useState, useEffect } from "react";
import AutoComplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";

const AddNewRecipe = (props) => {
  const [recipeName, setRecipeName] = useState("");
  const [directions, setDirections] = useState("");
  const [existingIng, setExistingIng] = useState([]);
  const [ingredients, setIngredients] = useState([{
    ingredient: "",
    measurement: ""
  }]);
  const [numIngredients, setNumIngredients] = useState(0);
  const items = [];

  useEffect(() => {
    fetch("http://localhost:8080/ingredients")
      .then((res) => res.json())
      .then((res) => setExistingIng(res));
  }, [existingIng]);

  const handleIngredient = (index, event, value) => {
    let arr = [...ingredients];
    if (value) {
      arr[index].ingredient = value.id;
      setIngredients(arr);
    }
  };

  const handleMeasurement = (index, event) => {
    let arr = [...ingredients];
    if (event) {
      arr[index].measurement = event.target.value;
      setIngredients(arr);
    }
  };

  for (let i = 0; i <= numIngredients; i++) {
    items.push(
      <div className="ingredient">
        <AutoComplete
          key={i}
          style={{ width: "200px", marginTop: "10px" }}
          id="ingredient"
          options={existingIng}
          getOptionLabel={(option) => option.name}
          getOptionSelected={(option, value) => option.name === value.name}
          renderInput={(params) => (
            <TextField {...params} label="Ingredient" variant="outlined" />
          )}
          onChange={(event, value) => handleIngredient(i, event, value)}
          noOptionsText={
            <Button
              variant="outlined"
              color="primary"
              onMouseDown={() => console.log("Add new")}
            >
              Add New Ingredient
            </Button>
          }
        />
        <TextField
          style={{ width: "100px", marginTop: "10px" }}
          placeholder="1 tsp"
          variant="outlined"
          onChange={(event) => handleMeasurement(i, event)}
          required
        />
      </div>
    );
  }

  const increaseIngredientCount = () => {
    setNumIngredients(numIngredients + 1);
    let arr = [...ingredients];
    arr.push({ ingredient: "", measurement: ""});
    setIngredients(arr);
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
    let obj = {
      name: recipeName,
      directions: directions,
      ingredients: ingredients
    }
    event.preventDefault();
    fetch("http://localhost:8080/recipes", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(obj),
      mode: 'cors'
    })
    .then(response => response.json())
    .then(data => { console.log("Success", data)})
    .catch((error) => console.log(error));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Add New Recipe</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          label="Recipe Name"
          onChange={handleRecipeName}
          variant="outlined"
          required
        />
        <div className="ingredient-list">{items}</div>
        <div className="icons">
          <Icon className="icon" onClick={() => increaseIngredientCount()}>
            add_circle
          </Icon>
          <Icon className="icon" onClick={() => decreaseIngredientCount()}>
            remove
          </Icon>
        </div>
        <TextareaAutosize
          onChange={handleDirections}
          style={{ width: "400px", marginTop: "30px" }}
          rowsMin={20}
          placeholder="Recipe Directions"
        />
        <input style={{marginTop: "20px"}} type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddNewRecipe;
