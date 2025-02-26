import InputControl from "../InputControl/InputControl";
import styles from "./auth.module.css";

const Auth = ({ signup }) => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <p className={styles.heading}>{signup ? "signUp" : "login"}</p>
        <InputControl label={"Name: "} />
        <InputControl label={"Password: "} isPassword={true} />
      </form>
    </div>
  );
};

export default Auth;
