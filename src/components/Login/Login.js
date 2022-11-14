import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import app from "../../firebase/firebase.init";
import Facebook from "../Facebook/Facebook";
import Github from "../Github/Github";
import Google from "../Google/Google";

const auth = getAuth(app);

const Login = () => {
  const [passError, setPassError] = useState("");
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState({});

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    setSuccess(false);
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    /* const upperCase = /(?=(?:.*[A-Z].*){2})/;
    const specialChar = /(?=.*[!#$%&?@"])/;

    if (!upperCase.test(password)) {
      setPassError("please Provide at least 2 Upercase charecter");
      return;
    }
    if (password.length < 6) {
      setPassError("please passWord should be atleast 6 charecter");
      return;
    }
    if (!specialChar.test(password)) {
      setPassError("please provide atleast 1 special charecter");
      return;
    } */

    setPassError("");
    signInWithEmailAndPassword(auth, email, password).then((result) => {
      const user = result.user;
      console.log(user);
      setUser(user);
    });
  };
  return (
    <div>
      <Form
        onSubmit={handleSubmitLogin}
        className="w-50 mx-auto border p-5 rounded my-4 shadow"
      >
        <h2 className="text-danger">Please Login !!!</h2>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="danger" className="mb-3" type="submit">
          Login
        </Button>
        <div className="d-flex gap-2">
          <Google></Google>
          <Github></Github>
          <Facebook></Facebook>
        </div>
        <p>
          New in App? Please
          <Link className="text-danger" to={"/register"}>
            Register
          </Link>
          .
        </p>
      </Form>
    </div>
  );
};

export default Login;
