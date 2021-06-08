import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import "./Calendar.scss";
import { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";
import Modal from "@material-ui/core/Modal";
import { useAuth0 } from "@auth0/auth0-react";

const Calendar = () => {
  const [dinners, setDinners] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated } = useAuth0();
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`http://localhost:8080/recipes/users/${userId}`)
      .then((res) => res.json())
      .then((res) => {
        setRecipes(res);
        setLoaded(true);
      })
    }
  }, [isAuthenticated, userId])

  useEffect(()=> {
    if (isAuthenticated) {
      fetch(`http://localhost:8080/users?email=${user.email}&name=${user.name}`)
      .then((res) => res.json())
      .then((res) => {
        setUserId(res[0].id);
      })
    }
  }, [isAuthenticated])

  const handleCheck = (e) => {
    setChecked(e.target.checked);
  };

  const generateRecipes = () => {
    setDinners([]);
    let arr = [];
    let recipeToUse = 0;
    while (arr.length < 7) {
      recipeToUse = Math.floor(Math.random() * recipes.length) + 1;
      if (arr.indexOf(recipeToUse) === -1) {
        arr.push(recipeToUse);
        if (
          recipes[recipeToUse - 1].has_leftovers &&
          checked &&
          arr.length < 5
        ) {
          arr.push(recipeToUse);
        }
      }
    }
    setDinners(arr);
  };

  return (
    <div className="calendar-container">
      <TableContainer component={Paper}>
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
            {dinners.length
              ? dinners.map((item) => {
                  return (
                    <TableCell>
                      <Link className="recipe-link">
                        {recipes[item - 1].name}
                      </Link>
                    </TableCell>
                  );
                })
              : ""}
          </TableRow>
        </TableBody>
      </TableContainer>
      <div style={{ marginTop: "20px"}}>Use Leftovers? <Switch checked={checked} onChange={handleCheck} /></div>
      <button className="pink-button" onClick={() => generateRecipes()}>
        Generate
      </button>

    </div>
  );
};

export default Calendar;
