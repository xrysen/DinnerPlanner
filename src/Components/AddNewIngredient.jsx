import { useEffect, useState } from 'react';

const AddNewIngredient = () => {
  const [options, setOptions] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    fetch('http://localhost:8080/food_types')
    .then((res) => res.json())
    .then((result) => setOptions(result));
  })

  return (
    <form>
      <input type="text" placeholder="Ingredient name" />
      <select>
        <option selected disabled hidden>Select Category</option>
        {options.map((item) => {
          return (<option value = {item.id}>{item.name}</option>)
        })}
      </select>
      <input type = "submit" />
    </form>
  )
}

export default AddNewIngredient;