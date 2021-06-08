import { Paper, Button } from "@material-ui/core";

const DeleteRecipePrompt = (props) => {

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/recipes/${props.recipe.id}`, {
      method: "DELETE",
    }).then(()=> props.close());
  };

  return (
    <Paper className="modal-content">
      <p>Are you sure you want to delete {props.recipe.name}?</p>
      <Button onClick={props.close}>Cancel</Button>
      <Button onClick={()=> handleDelete()}>Delete</Button>
    </Paper>
  );
};

export default DeleteRecipePrompt;
