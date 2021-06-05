import "./ViewRecipes.scss";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import ViewRecipe from "./ViewRecipe";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";

const ViewRecipes = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [currRec, setCurrRec] = useState(0);
  const [userId, setUserId] = useState(0);
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    fetch(`http://localhost:8080/recipes`, { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        setRecipes(res);
      });
  }, []);

  const getUserId = () => {
    fetch(`http://localhost:8080/users?email=${user.email}&name=${user.name}`)
      .then((res) => res.json())
      .then((res) => {
        if (res[0].length) {
          setUserId(res[0].id);
        } else {
          return false;
        }
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (!getUserId()) {
        let obj = {
          email: user.email,
          name: user.name,
        };

        fetch(`http://localhost:8080/users`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(obj),
          mode: "cors",
        }).then(() => getUserId());
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (index) => {
    setCurrRec(index);
  };

  return (
    <div>
      <Box>
        {isAuthenticated ? (
          <Container>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <h3>Recipes</h3>
                {recipes
                  ? recipes.map((item) => {
                      return (
                        <div key={item.id}>
                          <Button onClick={() => handleClick(item.id)}>
                            {item.name}
                          </Button>
                        </div>
                      );
                    })
                  : ""}
                <Button onClick={props.addNew}>Add New Recipe</Button>
              </Grid>
              <Grid item md={6}>
                <ViewRecipe id={currRec} />
              </Grid>
            </Grid>
          </Container>
        ) : (
          <Container style={{ textAlign: "center" }}>
            <Grid>Please Login</Grid>
            <Grid>
              <LoginButton />
            </Grid>
          </Container>
        )}
      </Box>
    </div>
  );
};

export default ViewRecipes;
