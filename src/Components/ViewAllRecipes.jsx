import { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";
import "./ViewAllRecipes.css";

const ViewAllRecipes = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/recipes")
      .then((res) => res.json())
      .then((result) => {
        setRecipes(result);
        setIsLoaded(true);
      });
  });

  if (isLoaded) { }

  return (
    <div className="recipe-container">
      <h1>Pick Recipe</h1>
      <div className = "recipe-list">
        {recipes.map((item) => {
          return (
            <Link
              key={item.id}
              component="button"
              onClick={() => props.onClick("Recipe Detail", item.id)}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ViewAllRecipes;
