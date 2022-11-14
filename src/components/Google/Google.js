import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import app from "../../firebase/firebase.init";

const auth = getAuth(app);

const Google = () => {
  const handleGoogleSignIn = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  return (
    <div>
      <button className="btn btn-outline-success" onClick={handleGoogleSignIn}>
        Google
      </button>
    </div>
  );
};

export default Google;
