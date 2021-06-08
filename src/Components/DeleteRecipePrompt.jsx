import { Paper, Button } from "@material-ui/core"

const DeleteRecipePrompt = (props) => {
  return (
    <Paper className = "modal-content">
      <p>Are you sure you want to delete {props.recipeName}?</p>
      <Button onClick = {props.close}>Cancel</Button>
      <Button>Delete</Button>
    </Paper>
  )
}

export default DeleteRecipePrompt;