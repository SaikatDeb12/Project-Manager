import { Link } from "react-router-dom";
import InputControl from "../InputControl/InputControl";
import styles from "./auth.module.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Auth = ({ signup }) => {
  const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  });
  const {
    register,
    handleSubmit,
    formState: errors,
  } = useForm({ resolver: zodResolver(schema) });

  const mySubmit = (data) => {
    console.log(data);
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
        <input type="submit" className={styles.submit} />
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
