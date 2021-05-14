import "./Landing.css";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import ViewRecipe from "./ViewRecipe";
import NavBar from "./NavBar";

const Landing = () => {
  const [catLoaded, setCatloaded] = useState(false);
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [currCat, setCurrCat] = useState(1);
  const [currRec, setCurrRec] = useState("");

  useEffect(() => {

    fetch(`http://localhost:8080/recipes`)
      .then((res) => res.json())
      .then((res) => {
        setRecipes(res);
      });
  }, []);

  const handleCategory = (index) => {
    setCurrCat(index);
  };

  const handleClick = (index) => {
    setCurrRec(index);
  }

  return (
    <div className="landing-container">
      <Box className="hero-banner">
        <Paper>
          <h1 style={{ padding: "30px" }}>Dinner Planner</h1>
        </Paper>
        <NavBar />
      </Box>
      <Box>
        <Container>
          <Grid container spacing={2}>
            
            <Grid item md={6}>
              <h3>Recipes</h3>
              {recipes
                ? recipes.map((item) => {
                  return (
                    <div>
                        <Button onClick={()=> handleClick(item.id)}>{item.name}</Button>
                      </div>
                    );
                  })
                  : ""}
                <Button>Add New Recipe</Button>  
            </Grid>
            <Grid item md={6}>
              <ViewRecipe id = {currRec}/>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Landing;
