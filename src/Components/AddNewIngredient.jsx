import { useEffect, useState } from 'react';

const AddNewIngredient = () => {
  const [options, setOptions] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    fetch('http://localhost:8080/food_types')
    .then((res) => res.json())
    .then((result) => setOptions(result));
  }, [])

  const handleInput = (event) => {
    setName(event.target.value);
  }

  const handleChange = (event) => {
    setCategory(event.target.value);
  }

  const handleSubmit = (e) => {
    const obj = {
      name: name,
      category: category
    }

    e.preventDefault();

    fetch("http://localhost:8080/ingredients", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(obj),
      mode: 'cors'
    })
    .then(response => response.json())
    .then(data => { console.log('Success', data)})
    .catch((error) => console.log(error));
  }

  return (
    <form onSubmit = {handleSubmit}>
      <input type="text" onChange={(event)=> handleInput(event)} placeholder="Ingredient name" />
      <select onChange={(event)=> handleChange(event)}>
        <option defaultValue disabled hidden>Select Category</option>
        {options.map((item) => {
          return (<option key = {item.id} value = {item.id}>{item.name}</option>)
        })}
      </select>
      <input type = "submit" />
    </form>
  )
}

export default AddNewIngredient;