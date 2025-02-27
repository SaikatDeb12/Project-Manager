import { Link } from "react-router-dom";
import InputControl from "../InputControl/InputControl";
import styles from "./auth.module.css";
import { useForm } from "react-hook-form";

const Auth = ({ signup }) => {
  const { register, handleSubmit } = useForm();

  const mySubmit = (event) => {
    console.log(event);
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(mySubmit)}>
        <p className={styles.heading}>{signup ? "SignUp" : "Login"}</p>
        {signup && (
          <InputControl
            label={"Name: "}
            placeholder={"Enter your name"}
            {...register("name")}
          />
        )}
        <InputControl
          label={"Email: "}
          placeholder={"Enter your email"}
          {...register("email")}
        />
        <InputControl
          label={"Password: "}
          isPassword={true}
          placeholder={"Enter the password"}
          {...register("password")}
        />
        <input type="submit" className={styles.submit} />
        {signup ? (
          <>
            <span>Already have a account? </span>
            <Link
              className={styles.link}
              style={{ color: "rgb(14, 212, 182)" }}
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
              style={{ color: "rgb(14, 212, 182)" }}
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
