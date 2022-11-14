import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { useState } from "react";
import app from "../../firebase/firebase.init";

const auth = getAuth(app);

const Github = () => {
  const [user, setUser] = useState({});

  const githubProvider = new GithubAuthProvider();
  const handleGithubLogin = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div>
      <button className="btn btn-outline-dark" onClick={handleGithubLogin}>
        GitHub
      </button>
    </div>
  );
};

export default Github;
