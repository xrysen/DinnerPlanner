import "./ViewRecipe.css";
import { useEffect, useState } from "react";

const ViewRecipe = (props) => {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/recipes/${props.id}`).then((res) =>
      res.json().then((result) => {
        setData(result);
        setIsLoaded(true);
      })
    );
  }, [props.id, data]);

  if (isLoaded) {
    return (
      <div className="recipe-container">
        <h1>{data[0].name}</h1>
        <h3 style={{textAlign: "left"}}>Ingredients</h3>
        <div className="ingredients" id="ingredients">
          <ul>

            {data.map((item) => {
              return (
                <li key={item.ingredient_id}>
                  {item.ingredient}
                  - {item.measurement}
                </li>
              );
            })}
            
          </ul>
        </div>
        <div className="directions">
          <h3>Directions:</h3>
          <ul></ul>
        </div>
      </div>
    );
  }

  return ( <h1>Loading</h1>);
};

export default ViewRecipe;
