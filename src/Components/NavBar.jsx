import "./NavBar.scss";
import Button from "@material-ui/core/Button";

const NavBar = (props) => {
  return (
    <div className = "navbar">
      <Button className = "nav-item" onClick = {props.addRecipe}>Add Recipe</Button>
      <Button className = "nav-item" onClick = {props.viewRecipes}>View Recipes</Button>
      <Button className = "nav-item" onClick = {props.ingredients}>Ingredients</Button>
      <Button className = "nav-item" onClick = {props.calendar}>Calendar</Button>
    </div>
  )
}

export default NavBar;