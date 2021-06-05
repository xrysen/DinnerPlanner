import Button from "@material-ui/core/Button";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button onClick = {()=> loginWithRedirect()}>
      Login
    </Button>
  )
}

export default LoginButton;