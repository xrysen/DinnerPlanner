import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./Calendar.scss";
import { useState, useEffect } from "react";

const Calendar = () => {
  const [dinners, setDinners] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/recipes")
    .then((res) => res.json())
    .then((res) => {
      setRecipes(res)
      setLoaded(true);
    });
  }, []);

  const generateRecipes = () => {
    setDinners([]);
    let arr = [];
    let recipeToUse = 0;
    for (let i = 0; i < recipes.length; i++) {
      recipeToUse = Math.floor(Math.random() * recipes.length) + 1;
      arr.push(recipeToUse);
      if (recipes[recipeToUse - 1].has_leftovers) {
        arr.push(recipeToUse);
      }
    }
    console.log(recipes);
    console.log(arr);
    setDinners(arr);
  }

  return (
    <div className = "calendar-container">

    <TableContainer component = {Paper}>
      <TableHead>
        <TableRow>
          <TableCell>Sunday</TableCell>
          <TableCell>Monday</TableCell>
          <TableCell>Tuesday</TableCell>
          <TableCell>Wednesday</TableCell>
          <TableCell>Thursday</TableCell>
          <TableCell>Friday</TableCell>
          <TableCell>Saturday</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          {dinners.length ? dinners.map((item) => {
           return <TableCell>{recipes[item - 1].name}</TableCell>
          }) : ""}
          {/* <TableCell>Burritos</TableCell>
          <TableCell>Burritos</TableCell>
          <TableCell>Pizza</TableCell>
          <TableCell>Pizza</TableCell>
          <TableCell>Pizza</TableCell>
          <TableCell>Pizza</TableCell>
          <TableCell>Pizza</TableCell> */}
          
        </TableRow>
      </TableBody>
    </TableContainer>

    <button className = "pink-button" onClick = {()=> generateRecipes()}>Generate</button>
    </div>
  )

}

export default Calendar;