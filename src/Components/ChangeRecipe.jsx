import { Button, Paper, TextField } from "@material-ui/core";
import AutoComplete from "@material-ui/lab/Autocomplete";
import { useState, useEffect } from "react";

const ChangeRecipe = (props) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/recipes/users/${props.userId}`)
      .then((res) => res.json())
      .then((res) => setRecipes(res));
  }, []);

  return (
    <Paper className="modal-content">
      <h3>Change Recipe</h3>
      <AutoComplete
        key={props.index}
        style={{ width: "200px", marginTop: "10px" }}
        options={recipes}
        getOptionLabel={(option) => option.name}
        getOptionSelected={(option, value) => option.name === value.name}
        renderInput={(params) => (
          <TextField {...params} label="Recipes" variant="outlined" />
        )}
        id="recipe"
      />
      <Button onClick={props.close}>Cancel</Button>
      <Button>Save</Button>
    </Paper>
  );
};

export default ChangeRecipe;
