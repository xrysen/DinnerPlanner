import { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import "./AddNewIngredient.css";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

const AddNewIngredient = (props) => {
  const [options, setOptions] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/food_types")
      .then((res) => res.json())
      .then((result) => setOptions(result));
  }, []);

  const handleInput = (event) => {
    setName(event.target.value);
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = (e) => {
    const obj = {
      name: name,
      category: category,
    };

    e.preventDefault();

    fetch("http://localhost:8080/ingredients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(obj),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success", data);
      })
      .catch((error) => console.log(error));
    props.close();
  };

  return (
    <Paper className="modal-content">
      <h1>Add New Ingredient</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          label="Ingredient Name"
          onChange={(event) => handleInput(event)}
          variant="outlined"
          required
        />
        <InputLabel style = {{marginTop: "20px"}} id = "category-label">Select Category</InputLabel>
        <Select
          labelId = "category-label"
          value={category}
          onChange={(event) => handleChange(event)}
          style={{ width: "200px" }}
          variant="outlined"
        >
          {options.map((item) => {
            return (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
        <br />
        <input type="submit" />
        <button className = "pink-button" onClick={props.close}>Close</button>
      </form>
    </Paper>
  );
};

export default AddNewIngredient;
