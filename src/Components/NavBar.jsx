import "./NavBar.scss";
import Button from "@material-ui/core/Button";
import { useAuth0 } from "@auth0/auth0-react";

const NavBar = (props) => {
  const { user, isAuthenticated, logout, loginWithPopup} = useAuth0();

  return (
    <div className = "navbar">
      <Button className = "nav-item" onClick = {props.addRecipe}>Add Recipe</Button>
      <Button className = "nav-item" onClick = {props.viewRecipes}>View Recipes</Button>
      <Button className = "nav-item" onClick = {props.ingredients}>Ingredients</Button>
      <Button className = "nav-item" onClick = {props.calendar}>Calendar</Button>
      {isAuthenticated ? <Button className = "nav-item" onClick = {()=> logout()}>Logout</Button> : <Button className = "nav-item" onClick={()=> loginWithPopup()}>Login</Button>}
    </div>
  )
}

export default NavBar;