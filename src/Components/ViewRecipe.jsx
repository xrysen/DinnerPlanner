import "./ViewRecipe.scss";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useEffect, useState } from "react";
import { ENDPOINT } from "../globals/constants";

const ViewRecipe = (props) => {
  const [data, setData] = useState([]);
  const [directions, setDirections] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [recipeLoaded, setRecipeLoaded] = useState(false);

  useEffect(() => {
    fetch(`${ENDPOINT}/recipes/${props.id}`, {method: "GET"}).then((res) =>
      res.json().then((result) => {
        setData(result);
        setRecipeLoaded(true);
      })
    );
    if (props.id) {

      fetch(`${ENDPOINT}/directions/`, {method: "GET"}).then((res) => {
        res.json().then((result) => {
          setDirections(result);
          setTimeout(() => {
            setIsLoaded(true);
          }, 500);
        });
      });
    }
  }, []);

  if (isLoaded && recipeLoaded && data.length > 0) {
    return (
      <div>
        <h1>{data[0].name}</h1>
        <h3 style={{ width: "30%" }}>Ingredients</h3>
        <div className="recipe-container">
          <div className="ingredients" id="ingredients">
            {data.map((item) => {
              return (
                <span key = {item.ingredient}>
                  <strong>{item.measurement}</strong> - {item.ingredient}
                </span>
              );
            })}
          </div>
          <div className="directions">
            <h3>Directions:</h3>
            <ol>
              {directions.map((item) => {
                return (item.recipe_id === props.id ? <li key={item.directions}>{item.directions}</li> : ""
              )})}
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
