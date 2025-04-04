import styles from "./home.module.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Home = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (isAuthenticated) navigate("/account");
    else navigate("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <p className={styles.heading}>Project Fair</p>
          <p className={styles.desc}>
            One stop destination for all software development projects
          </p>
          <button onClick={handleNavigate}>
            {isAuthenticated ? "Manage Your Projects" : "Get Started"}
            <FaArrowRightLong className={styles.icon} />
          </button>
        </div>
        <div className={styles.right}>
          <img src="/designer.svg" alt="Project" />
        </div>
      </div>
    </div>
  );
};

export default Home;
