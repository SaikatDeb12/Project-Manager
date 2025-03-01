import { Link, useNavigate } from "react-router-dom";
import InputControl from "../InputControl/InputControl";
import styles from "./auth.module.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth, updateUserDb } from "../../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";

const Auth = ({ signup }) => {
  const [submitButton, submitButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const schema = z.object({
    name: z.string().optional(),
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(4, { message: "Password must be atleast 4 characters" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const mySubmit = (data) => {
    console.log("state of signup: ", signup);
    if (signup) handleSignup(data);
    else handleLogin(data);
  };

  const handleSignup = async (data) => {
    submitButtonDisabled(true);
    const res = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    console.log("Data: ", res);

    const userId = res.user.uid;
    await updateUserDb(
      {
        name: data.name,
        email: res.user.email,
      },
      userId
    );
    submitButtonDisabled(false);
    navigate("/login");
  };

  const handleLogin = async (data) => {
    submitButtonDisabled(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      console.log("signing In");
      submitButtonDisabled(false);
      navigate("/");
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(mySubmit)}>
        <p className={styles.heading}>{signup ? "SignUp" : "Login"}</p>
        {signup && (
          <InputControl
            label={"Name: "}
            placeholder={"Enter your name"}
            register={register}
            name="name"
            errors={errors.name}
          />
        )}
        <InputControl
          label={"Email: "}
          placeholder={"Enter your email"}
          register={register}
          name="email"
          errors={errors.email}
        />
        <InputControl
          label={"Password: "}
          isPassword={true}
          placeholder={"Enter the password"}
          register={register}
          name="password"
          errors={errors.password}
        />
        <input
          type="submit"
          className={styles.submit}
          disabled={submitButton}
        />
        {signup ? (
          <>
            <span>Already have a account? </span>
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
            <span>Don't have a account? </span>
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
