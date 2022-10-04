import { Button } from "@material-ui/core";
import styled from "styled-components";
import chatImg from "../../assets/chat.png";
import { auth, googleAuthProvider } from "../../firebase-config";
import { setUsers } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";

function Login() {
  const dispatch = useDispatch();

  const signIn = () => {
   
    auth
      .signInWithPopup(googleAuthProvider)
      .catch((err) => toast.error("login failed", err));
  };
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        dispatch(setUsers(user));
      } else {
        toast.error("No User Found!!");
      }
    });
  }, [dispatch]);
  return (
    <Container>
      <title>Login</title>

      <LoginContainer>
        <Logo src={chatImg} />
        <Button
          variant="contained"
          style={{
            background: "#56C0FB",
            color: "#0c0b0b",
            textShadow: "2px 2px 9px rgba(4,4,4,0.56)",
          }}
          onClick={signIn}
        >
          Sign in with google
        </Button>
      </LoginContainer>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px;
  align-items: center;
  background-color: white;
  border-radius: 20px;
  box-shadow: -30px 42px 29px -19px rgba(31, 31, 31, 1);
  -webkit-box-shadow: -30px 42px 29px -19px rgba(31, 31, 31, 1);
  -moz-box-shadow: -30px 42px 29px -19px rgba(31, 31, 31, 1);
`;

const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;
`;
