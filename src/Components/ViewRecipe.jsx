import "./ViewRecipe.css";
import { useEffect, useState } from "react";

const ViewRecipe = (props) => {
  const [data, setData] = useState([]);
  const [directions, setDirections] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/recipes/${props.id}`).then((res) =>
      res.json().then((result) => {
        setData(result);
      })
    );
    fetch(`http://localhost:8080/directions/${props.id}`).then((res) => {
      res.json().then((result) => {
        setDirections(result);
        setIsLoaded(true);
      });
    });
  }, [props.id, data]);

  if (isLoaded) {
    return (
      <div className="recipe-container">
        <h1>{data[0].name}</h1>
        <h3 style={{ textAlign: "left" }}>Ingredients</h3>
        <div className="ingredients" id="ingredients">
          {data.map((item) => {
            return (
              <span>
                {item.measurement} - {item.ingredient}
              </span>
            );
          })}
        </div>
        <div className="directions">
          <h3>Directions:</h3>
          <ol>
            {directions.map((item) => {
              return (
                <li key = {item.directions}>{item.directions}</li>
              )
            })}
          </ol>
        </div>
      </div>
    );
  }

  return <h1>Loading</h1>;
};

export default ViewRecipe;
