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
import ChangeRecipe from "./ChangeRecipe";
import { ENDPOINT } from "../globals/constants";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";

const Calendar = () => {
  const [dinners, setDinners] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [checked, setChecked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userId, setUserId] = useState(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`${ENDPOINT}/recipes/users/${userId}`)
        .then((res) => res.json())
        .then((res) => {
          setRecipes(res);
          setLoaded(true);
        });
    }
  }, [isAuthenticated, userId]);

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`${ENDPOINT}/users?email=${user.email}&name=${user.name}`)
        .then((res) => res.json())
        .then((res) => {
          setUserId(res[0].id);
        });
    }
  }, [isAuthenticated]);

  const handleCheck = (e) => {
    setChecked(e.target.checked);
  };

  const generateRecipes = () => {
    setDinners([]);
    let arr = [];
    let recipeToUse = 0;
    while (arr.length < 7) {
      recipeToUse = Math.floor(Math.random() * recipes.length) + 1;
      if (recipes.length < 7) {
        arr.push(recipeToUse);
        if (
          recipes[recipeToUse - 1].has_leftovers &&
          checked &&
          arr.length <= 5
        ) {
          arr.push(recipeToUse);
        }
        // If num recipes can fill a whole week, no doubles to be used
      } else if (arr.indexOf(recipeToUse) === -1 && recipes.length >= 7) {
        arr.push(recipeToUse);
        // Unless Use Leftovers is checked
        if (
          recipes[recipeToUse - 1].has_leftovers &&
          checked &&
          arr.length <= 5
        ) {
          arr.push(recipeToUse);
        }
      }
    }
    setDinners(arr);
  };

  const calendarEdit = (index) => {
    setModalOpen(true);
    setIndex(index);
  }

  const saveEdit = (index, value) => {
    let arr = [...dinners];
    arr[index] = value;
    setDinners(arr);
    console.log(dinners);
    setModalOpen(false);
  }

  if (!loaded || isLoading) {
    <Container stlye = {{ textAlign: "center" }}>
      <CircularProgress />
    </Container>
  }

  return (
    <div className="calendar-container">
      <Modal open={modalOpen} className="modal">
        <ChangeRecipe index = {index} close = {()=> setModalOpen(false)} userId={userId} save = {saveEdit} />
      </Modal>
      {recipes.length > 0 && loaded ? (
        <>
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
                  ? dinners.map((item, i) => {
                      return (
                        <TableCell>
                          <Link
                            className="recipe-link"
                            onClick={() => calendarEdit(i)}
                          >
                            {recipes[item - 1].name}
                          </Link>
                        </TableCell>
                      );
                    })
                  : ""}
              </TableRow>
            </TableBody>
          </TableContainer>
          <div style={{ marginTop: "20px" }}>
            Use Leftovers? <Switch checked={checked} onChange={handleCheck} />
          </div>
          <button className="pink-button" onClick={() => generateRecipes()}>
            Generate
          </button>
        </>
      ) : (
        <h1>You must have at least one recipe associated with your account</h1>
      )}
    </div>
  );
};

export default Calendar;
