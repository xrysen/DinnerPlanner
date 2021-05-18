import "./ViewRecipes.scss";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import ViewRecipe from "./ViewRecipe";

const ViewRecipes = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [currRec, setCurrRec] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:8080/recipes`, { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        setRecipes(res);
      });
  }, []);

  const handleClick = (index) => {
    setCurrRec(index);
  };

  return (
    <div>
      <Box>
        <Container>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <h3>Recipes</h3>
              {recipes
                ? recipes.map((item) => {
                    return (
                      <div>
                        <Button onClick={() => handleClick(item.id)}>
                          {item.name}
                        </Button>
                      </div>
                    );
                  })
                : ""}
              <Button onClick = {props.addNew}>Add New Recipe</Button>
            </Grid>
            <Grid item md={6}>
              <ViewRecipe id={currRec} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default ViewRecipes;
