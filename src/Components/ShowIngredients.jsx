import { useEffect, useState } from "react";
import { ENDPOINT } from "../globals/constants";

const ShowIngredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [loaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch(`${ENDPOINT}/ingredients/`)
      .then((res) => res.json())
      .then((result) => {
        setIngredients(result);
        setIsLoaded(true);
      });
  }, []);

  if (!loaded) {
    return (<h1>Loading</h1>);
  }

  return (
    <div>
      <h2>Spices</h2>
      <ul>
      {ingredients.map((item) => {
        return ( item.type_id === 1 ? <li key={item.id}>{item.name}</li> : "")
      })}

      </ul>
      <h2>Dairy</h2>
      <ul>
        {ingredients.map((item) => {
          return (item.type_id === 2 ? <li key={item.id}>{item.name}</li> : "")
        })}
      </ul>
      <h2>Vegetables</h2>
      <ul>
        {ingredients.map((item) => {
          return (item.type_id === 3 ? <li key={item.id}>{item.name}</li> : "")
        })}
      </ul>
      <h2>Meat</h2>
      <ul>
        {ingredients.map((item) => {
          return (item.type_id === 4 ? <li key={item.id}>{item.name}</li> : "")
        })}
      </ul>
      <h2>Grains</h2>
      <ul>
        {ingredients.map((item) => {
          return (item.type_id === 5 ? <li key={item.id}>{item.name}</li> : "")
        })}
      </ul>
      <h2>Fruit</h2>
      <ul>
        {ingredients.map((item) => {
          return (item.type_id === 6 ? <li key={item.id}>{item.name}</li> : "")
        })}
      </ul>
      <h2>Liquids</h2>
      <ul>
        {ingredients.map((item) => {
          return (item.type_id === 7 ? <li key={item.id}>{item.name}</li> : "")
        })}
      </ul>
    </div>
  )

};

export default ShowIngredients;
