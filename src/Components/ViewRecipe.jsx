import "./ViewRecipe.css";
import { useEffect, useState } from "react";

const ViewRecipe = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/recipes/${props.id}`).then((res) =>
      res.json().then((result) => setData(result))
    );
  }, [props.id, data]);

  return (
    <div className="recipe-container">
      <h1>{props.name}</h1>
      <div className="ingredients">
        <ul>
          {data.map((item) => {
            return (
              <li>{item.measurement} {item.ingredient}</li>
            )
          })}
        </ul>
      </div>
      <div className="directions">
        <ul>
          {data[0].directions}
        </ul>
      </div>
    </div>
  );
};

export default ViewRecipe;
