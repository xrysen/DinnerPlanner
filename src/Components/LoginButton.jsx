import Button from "@material-ui/core/Button";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithPopup } = useAuth0();

  return (
    <Button onClick = {()=> loginWithPopup()}>
      Login
    </Button>
  )
}

export default LoginButton;