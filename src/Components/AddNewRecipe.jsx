import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import "./AddNewRecipe.scss";
import { useState, useEffect } from "react";
import AutoComplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import AddNewIngredient from "./AddNewIngredient";
import Modal from "@material-ui/core/Modal";
import Switch from "@material-ui/core/Switch";
import { useAuth0 } from "@auth0/auth0-react";

const AddNewRecipe = (props) => {
  const { user, isAuthenticated } = useAuth0();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [checked, setChecked] = useState(false);
  const [recipeName, setRecipeName] = useState("");
  const [directions, setDirections] = useState([]);
  const [existingIng, setExistingIng] = useState([]);
  const [ingredients, setIngredients] = useState([
    {
      ingredient: "",
      measurement: "",
    },
  ]);
  const [fullRecipe, setFullRecipe] = useState(true);
  const [numIngredients, setNumIngredients] = useState(0);
  const [numDirections, setNumDirections] = useState(0);
  const items = [];
  const directionText = [];

  useEffect(() => {
    fetch("http://localhost:8080/ingredients")
      .then((res) => res.json())
      .then((res) => setExistingIng(res));
  }, [existingIng]);

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`http://localhost:8080/users?email=${user.email}`)
      .then((res) => res.json())
      .then((res) => setUserId(Number(res[0].id)))
    }
  })

  const handleIngredient = (index, event, value) => {
    let arr = [...ingredients];
    if (value) {
      arr[index].ingredient = value.id;
      setIngredients(arr);
    }
  };

  const handleCheck = (e) => {
    setChecked(e.target.checked);
  };

  const handleModal = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const handleMeasurement = (index, event) => {
    let arr = [...ingredients];
    if (event) {
      arr[index].measurement = event.target.value;
      setIngredients(arr);
    }
  };

  const handleDirection = (index, event) => {
    let arr = [...directions];
    if (event) {
      arr[index] = event.target.value;
      setDirections(arr);
    }
  };

  for (let i = 0; i <= numDirections; i++) {
    directionText.push(
      <TextField
        style={{ marginTop: "20px" }}
        id="standard-basic"
        label="Direction"
        variant="outlined"
        fullWidth
        onChange={(event) => handleDirection(i, event)}
      />
    );
  }

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
              onMouseDown={() => handleModal()}
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

  const increaseDirectionCount = () => {
    setNumDirections(numDirections + 1);
    let arr = [...directions];
    arr.push("");
    setDirections(arr);
  };

  const decreaseDirectionCount = () => {
    let arr = [...directions];
    arr.pop();
    setDirections(arr);
    setNumDirections(numDirections - 1);
  };

  const increaseIngredientCount = () => {
    setNumIngredients(numIngredients + 1);
    let arr = [...ingredients];
    arr.push({ ingredient: "", measurement: "" });
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

  const handleSubmit = (event) => {
    let obj = {
      name: recipeName,
      userId: userId,
      directions: directions,
      ingredients: ingredients,
      leftovers: checked,
    };
    
    if(!submitted) {

      fetch(`http://localhost:8080/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(obj),
        mode: "cors",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success", data);
          setDirections([]);
        })
        .then(() => setSubmitted(true))
        .catch((error) => console.log(error));
    }
  };

  const handleFullRecipe = (event) => {
    setFullRecipe(event.target.checked);
  }

  return (
    <div className="new-recipe.container">
      {!isAuthenticated ? 
        <h1>You must be logged in to view this page</h1>
        :
      <>
      <h1>Add New Recipe or Meal</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          label="Recipe Name"
          onChange={handleRecipeName}
          variant="outlined"
          required
          style={{ marginTop: "20px" }}
          />
        Add whole recipe? <Switch checked = {fullRecipe} onChange={handleFullRecipe} />
        {fullRecipe && (
          <>
          <div className="ingredient-list">{items}</div>
          <div className="icons">
          <Icon className="icon" onClick={() => increaseIngredientCount()}>
            add_circle
          </Icon>
          <Icon className="icon" onClick={() => decreaseIngredientCount()}>
            remove
          </Icon>
        </div>
        {directionText}
        <div className="icons">
          <Icon className="icon" onClick={() => increaseDirectionCount()}>
            add_circle
          </Icon>
          <Icon className="icon" onClick={() => decreaseDirectionCount()}>
            remove
          </Icon>
        </div>
        Has Leftovers? <Switch checked={checked} onChange={handleCheck} />
        </>
        )}
        <input style={{ marginTop: "20px" }} type="submit" value="Submit" />
        </form>
        <Modal open={open} className="modal">
        <AddNewIngredient close={handleModal} />
      </Modal>
     </> }
    </div>
    );
};

export default AddNewRecipe;
