import { Link } from "react-router-dom";
import InputControl from "../InputControl/InputControl";
import styles from "./auth.module.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const Auth = ({ signup }) => {
  const schema = z.object({
    name: z.string().min(1, { message: "required" }),
    email: z.string().email({ message: "invalid email" }),
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
    if (signup) handleSignup(data);
    else handleLogin();
  };

  const handleSignup = async (data) => {
    submitButtonDisabled(true);
    const res = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    console.log(res);
    submitButtonDisabled(false);
  };

  const handleLogin = () => {};

  const [submitButton, submitButtonDisabled] = useState(false);

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
