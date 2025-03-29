import React, { useState } from "react";
import styles from "./auth.module.css";
import InputControl from "../InputControl/InputControl";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, updateUserDb } from "../../../firebase";

function Auth({ signup }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleLogin = () => {
    if (!values.email || !values.password) {
      setErrorMsg("All fields are required!");
      return;
    }

    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(() => {
        setSubmitButtonDisabled(false);
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  const handleSignup = async () => {
    if (!values.name || !values.email || !values.password) {
      setErrorMsg("All fields are required!");
      return;
    }

    setSubmitButtonDisabled(true);
    setErrorMsg("");

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const userId = res.user.uid;

      await updateUserDb(
        {
          name: values.name,
          email: values.email,
          profileImage: "/defaultAvatar.jpg",
        },
        userId
      );
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setSubmitButtonDisabled(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (signup) {
      handleSignup();
    } else {
      handleLogin();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>
          <Link className={styles.smallLink} to={"/"}>
            {"< Back to home"}
          </Link>
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.heading}>{signup ? "SignUp" : "Login"}</p>
        {signup && (
          <InputControl
            label={"Name"}
            placeholder={"Enter your name"}
            name="name"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        )}
        <InputControl
          label={"Email"}
          placeholder={"Enter your email"}
          name="email"
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        />
        <InputControl
          label={"Password"}
          placeholder={"Enter password"}
          name="password"
          isPassword
          value={values.password}
          onChange={(e) => setValues({ ...values, password: e.target.value })}
        />
        <p className={styles.error}>{errorMsg}</p>
        <button className={styles.submit} disabled={submitButtonDisabled}>
          {signup ? "SignUp" : "Login"}
        </button>
        {signup ? (
          <>
            <span>Already have an account? </span>
            <Link
              className={styles.link}
              style={{ color: "rgb(14, 63, 212)" }}
              to="/login"
            >
              Login here
            </Link>
          </>
        ) : (
          <>
            <span>Don't have an account? </span>
            <Link
              className={styles.link}
              style={{ color: "rgb(14, 63, 212)" }}
              to="/signup"
            >
              Sign Up
            </Link>
          </>
        )}
      </form>
    </div>
  );
}

export default Auth;
