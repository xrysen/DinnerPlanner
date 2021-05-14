import "./ViewRecipe.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useEffect, useState } from "react";

const ViewRecipe = (props) => {
  const [data, setData] = useState([]);
  const [directions, setDirections] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [recipeLoaded, setRecipeLoaded] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/recipes/${props.id}`).then((res) =>
      res.json().then((result) => {
        setData(result);
        setRecipeLoaded(true);
      })
    );
    fetch(`http://localhost:8080/directions/${props.id}`).then((res) => {
      res.json().then((result) => {
        setDirections(result);
        setTimeout(() => {
          setIsLoaded(true);
        }, 500);
      });
    });
  }, [props.id, data]);

  if (isLoaded && recipeLoaded && data.length > 0) {
    return (
      <div>
        <h1>{data[0].name}</h1>
        <h3 style={{ width: "30%" }}>Ingredients</h3>
        <div className="recipe-container">
          <div className="ingredients" id="ingredients">
            {data.map((item) => {
              return (
                <span>
                  <strong>{item.measurement}</strong> - {item.ingredient}
                </span>
              );
            })}
          </div>
          <div className="directions">
            <h3>Directions:</h3>
            <ol>
              {directions.map((item) => {
                return <li key={item.directions}>{item.directions}</li>;
              })}
            </ol>
          </div>
        </div>
      </div>
    );
  } else if (isLoaded && recipeLoaded && data.length === 0) {
    return <h1>Recipe Not Found :(</h1>;
  }

  return (
    <div className="recipe-container">
      {props.id ? <CircularProgress /> : <h1>Please choose a recipe!</h1>}
    </div>
  );
};

export default ViewRecipe;
