import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import IngredientSelect from "./IngredientSelect";

const NewIngredient = () => {
  const [numIngredients, setNumIngredients] = useState(5);

  const setIngredient = () => {
    for (let i = 1; i <= numIngredients; i++) {
      return (
        <IngredientSelect />
      )
    }
  }

  const allIngredients = setIngredient();

  return (
    <div>
      <h1>Add New Recipe</h1>
      <form>
        <TextField id = "standard-basic" label = "Recipe Name" />
        {allIngredients}
      </form>
    </div>
  )
}

export default NewIngredient;