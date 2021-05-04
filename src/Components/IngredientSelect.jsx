import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { useState, useEffect } from "react";

const IngredientSelect = (props) => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/ingredients")
      .then((res) => res.json())
      .then((res) => setIngredients(res));
  }, [ingredients]);

  return (
    <div>
      <InputLabel id={props.label}>{props.label}</InputLabel>
      <Select labelId={props.label}>
        <MenuItem>""</MenuItem>
        {ingredients.map((item)=> {
          return (
            <MenuItem key = {item.id} value={item.name}>{item.name}</MenuItem>
          )
        })}
      </Select>
    </div>
  );
};

export default IngredientSelect;
