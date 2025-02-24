import styles from "./home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <p className={styles.heading}></p>
          <p className={styles.desc}>Lorem ipsum dolor sit amet consectetur.</p>
          <button>Get started</button>
        </div>
        <div className={styles.right}></div>
      </div>
    </div>
  );
};

export default Home;
