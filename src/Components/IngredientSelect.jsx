import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import AutoComplete from "@material-ui/lab/Autocomplete";

const IngredientSelect = (props) => {
  const [ingredients, setIngredients] = useState([]);
  const [chosen, setChosen] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/ingredients")
      .then((res) => res.json())
      .then((res) => setIngredients(res));
  }, [ingredients]);

  const handleChange = (event) => {
    setChosen(event.target.value);
  }

  return (
    <div style={{ width: 200 }}>
      <AutoComplete
      id="ingredients"
      options = {ingredients}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => <TextField {...params} label="Ingredients" varient="outlined" />}
      onChange = {handleChange}
      />
    </div>
  );
};

export default IngredientSelect;
