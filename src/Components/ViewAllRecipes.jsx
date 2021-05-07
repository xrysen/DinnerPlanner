import { useState, useEffect } from "react";

const ViewAllRecipes = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    fetch("http://localhost:8080/recipes")
    .then(res => res.json())
    .then(result => {
      setRecipes(result);
      setIsLoaded(true);
    })
  })

  return (
    <div className="recipe-container">
      <h1>Pick Recipe</h1>
      <ul>
      {recipes.map((item) => {
        return (
          <li onClick = {() => props.onClick("Recipe Detail", item.id)} style = {{ listStyle: "none" }} key = {item.id}>{item.name}</li>
        )
      })}
      </ul>
    </div>
  );
};

export default ViewAllRecipes;
