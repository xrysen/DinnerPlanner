import "./ViewRecipes.scss";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import ViewRecipe from "./ViewRecipe";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Modal from "@material-ui/core/Modal";
import DeleteRecipePrompt from "./DeleteRecipePrompt";

const ViewRecipes = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [currRec, setCurrRec] = useState(0);
  const [userId, setUserId] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState({});
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`http://localhost:8080/recipes/users/${userId}`)
        .then((res) => res.json())
        .then((res) => {
          setRecipes(res);
        });
    }
  }, [isAuthenticated, userId]);

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`http://localhost:8080/users?email=${user.email}&name=${user.name}`)
        .then((res) => res.json())
        .then((res) => {
          if (res[0].id) {
            setUserId(res[0].id);
          } else {
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
            });
          }
        });
    }
  }, [isAuthenticated]);

  const handleClick = (index) => {
    setCurrRec(index);
  };

  const handleDeletePrompt = (id, name) => {
    setSelectedRecipe(name);
    setModalOpen(true);
  }

  return (
    <div>
      <Box>
      <Modal open={modalOpen} className="modal">
        
        <DeleteRecipePrompt close = {()=> setModalOpen(false)} recipeName = {selectedRecipe}  />
      </Modal>
        {isAuthenticated ? (
          <Container>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <h3>Recipes</h3>
                {recipes
                  ? recipes.map((item) => {
                      return (
                        <div key={item.id}>
                          {/* <EditIcon className = "icon-edit" /> */}
                          <DeleteForeverIcon className = "icon-delete" onClick={()=> handleDeletePrompt(item.id, item.name)} />
                          <Button onClick={() => handleClick(item.id)}>
                            {item.name}
                          </Button>
                        </div>
                      );
                    })
                  : ""}
                <AddIcon className = "icon-add" />
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
