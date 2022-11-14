import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import app from "../../firebase/firebase.init";
import Google from "../Google/Google";
import Github from "../Github/Github";
import Facebook from "../Facebook/Facebook";

const auth = getAuth(app);

const Register = () => {
  const [passError, setPassError] = useState("");
  const [success, setSuccess] = useState(false);

  const handlerSubmit = (event) => {
    event.preventDefault();
    setSuccess(false);
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;
    console.log(email, password, name);

    const upperCase = /(?=(?:.*[A-Z].*){2})/;
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
    }
    setPassError("");
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSuccess(true);
        form.reset();
        varifyAccount();
        updateUserProfile(name);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setPassError(errorMessage);
        console.log(error);
      });
  };

  const varifyAccount = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      alert("A mail has sent to your email box. Please varify your account");
    });
  };

  const updateUserProfile = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name,
    });
  };
  return (
    <div>
      <Form
        onSubmit={handlerSubmit}
        className="w-50 mx-auto border p-5 rounded my-4 shadow"
      >
        <h2 className="text-primary">Please Register !!!</h2>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter Your Name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <p className="text-danger">{passError}</p>
        {success && (
          <p className="text-success">SuccessFully Account created</p>
        )}

        <Button variant="primary" type="submit" className="mb-3">
          Register
        </Button>
        <div className="d-flex gap-2">
          <Google></Google>
          <Github></Github>
          <Facebook></Facebook>
        </div>
        <p>
          Alredy have an Account? Please <Link to={"/login"}>Login</Link>.
        </p>
      </Form>
    </div>
  );
};

export default Register;
