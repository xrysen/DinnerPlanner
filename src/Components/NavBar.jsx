import "./NavBar.css";
import Button from "@material-ui/core/Button";

const NavBar = (props) => {
  return (
    <div className = "navbar">
      <Button className = "nav-item" onClick = {props.recipe}>Recipes</Button>
      <Button className = "nav-item" onClick = {props.ingredients}>Ingredients</Button>
      <Button className = "nav-item" onClick = {props.calendar}>Calendar</Button>
    </div>
  )
}

export default NavBar;