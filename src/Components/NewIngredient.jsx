import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import IngredientSelect from "./IngredientSelect";
import Icon from "@material-ui/core/Icon";
import "./NewIngredient.css";

const NewIngredient = () => {
  const [ingredients, setIngredients] = useState([<IngredientSelect key = {0} />]);

  const increaseIngredient = () => {
    setIngredients([
      ...ingredients,
      <IngredientSelect key={ingredients.length}/>
    ])
  }

  const decreaseIngredient = () => {
    let arr = [...ingredients];
    arr.pop();
    if (arr.length === 0) {
      arr = [<IngredientSelect key = {0} />]
    }
    setIngredients(arr);
  }

  return (
    <div>
      <h1>Add New Recipe</h1>
      <form>
        <TextField id = "standard-basic" label = "Recipe Name" />
        {ingredients.map((item) => {
          return item
        })}
        <Icon className="add-button" onClick={()=> increaseIngredient()}>add_circle</Icon>
        <Icon className="add-button" onClick={()=> decreaseIngredient()}>remove</Icon>
      </form>
    </div>
  )
}

export default NewIngredient;