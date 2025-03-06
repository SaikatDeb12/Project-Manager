import { Link, useNavigate } from "react-router-dom";
import InputControl from "../InputControl/InputControl";
import styles from "./auth.module.css";
import { auth, updateUserDb } from "../../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";

const Auth = ({ signup }) => {
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (signup && !formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear the error for this field when typing
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitButtonDisabled(true);
    try {
      if (signup) {
        await handleSignup();
      } else {
        await handleLogin();
      }
    } catch (err) {
      console.error("Error: ", err);
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: err.message || "An error occurred",
      }));
    } finally {
      setSubmitButtonDisabled(false);
    }
  };

  const handleSignup = async () => {
    const res = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    console.log("Data: ", res);

    const userId = res.user.uid;
    await updateUserDb(
      {
        name: formData.name,
        email: res.user.email,
      },
      userId
    );
    navigate("/login");
  };

  const handleLogin = async () => {
    await signInWithEmailAndPassword(auth, formData.email, formData.password);
    console.log("signing in");
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.heading}>{signup ? "SignUp" : "Login"}</p>
        {signup && (
          <InputControl
            label={"Name: "}
            placeholder={"Enter your name"}
            name="name" // Add name attribute
            value={formData.name}
            onChange={handleInputChange}
            errors={errors.name} // Pass the error string directly
          />
        )}
        <InputControl
          label={"Email: "}
          placeholder={"Enter your email"}
          name="email" // Add name attribute
          value={formData.email}
          onChange={handleInputChange}
          errors={errors.email} // Pass the error string directly
        />
        <InputControl
          label={"Password: "}
          isPassword={true}
          placeholder={"Enter the password"}
          name="password" // Add name attribute
          value={formData.password}
          onChange={handleInputChange}
          errors={errors.password} // Pass the error string directly
        />
        {errors.general && (
          <p style={{ color: "red", marginTop: "10px" }}>{errors.general}</p>
        )}
        <input
          type="submit"
          className={styles.submit}
          disabled={submitButtonDisabled}
          value={signup ? "Sign Up" : "Login"}
        />
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
};

export default Auth;
