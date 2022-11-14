import { FacebookAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import React from "react";
import { useState } from "react";
import app from "../../firebase/firebase.init";

const auth = getAuth(app);

const Facebook = () => {
  const [user, setUser] = useState({});

  const handleFacebookLogin = () => {
    const facebookProvider = new FacebookAuthProvider();
    signInWithPopup(auth, facebookProvider)
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
      <button className="btn btn-outline-primary" onClick={handleFacebookLogin}>
        Facebook
      </button>
    </div>
  );
};

export default Facebook;
