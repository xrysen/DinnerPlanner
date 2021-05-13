import "./Landing.css";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";

const Landing = () => {
  const [catLoaded, setCatloaded] = useState(false);
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [currCat, setCurrCat] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:8080/categories`)
      .then((res) => res.json())
      .then((res) => {
        setCategories(res);
        setCatloaded(true);
      });

    fetch(`http://localhost:8080/categories/${currCat}`)
      .then((res) => res.json())
      .then((res) => {
        setRecipes(res);
      });
  }, [currCat]);

  const handleCategory = (index) => {
    setCurrCat(index);
  };

  return (
    <div className="landing-container">
      <Box className="hero-banner">
        <Paper>
          <h1 style={{ padding: "30px" }}>Meal Planner</h1>
        </Paper>
      </Box>
      <Box>
        <Container>
          <Grid container spacing={3}>
            <Grid item md={2}>
              <h3>Recipes</h3>
              {catLoaded
                ? categories.map((item) => {
                    return (
                      <div className="menu-button">
                        <Button
                          onClick={() => handleCategory(item.id)}
                          variant="outlined"
                          color="primary"
                        >
                          {item.name}
                        </Button>
                      </div>
                    );
                  })
                : ""}
            </Grid>
            <Grid item md={5}>
              {recipes
                ? recipes.map((item) => {
                    return <Button>{item.name}</Button>;
                  })
                : ""}
            </Grid>
            <Grid item md={5} style={{ backgroundColor: "green" }}>
              <h2>Testing 3</h2>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Landing;
