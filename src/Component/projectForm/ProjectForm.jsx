import React, { useState } from "react";
import Modal from "../Modal/Modal";
import styles from "./projectForm.module.css";
import InputControl from "../InputControl/InputControl";
const ProjectForm = ({ setShowModal }) => {
  const [values, setValues] = useState({
    thumbnail: "/sampleProject.jpg",
    title: "",
    overview: "",
    github: "",
    link: "",
    points: [],
  });
  return (
    <div>
      <Modal onClose={() => setShowModal(false)}>
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.image}>
              <img src={values.thumbnail} alt="thumbnail" />
              <p>
                <span>40%</span>Uploaded
              </p>
            </div>
            <InputControl
              label={"GitHub"}
              value={values.github}
              onChange={(event) =>
                setValues((prevVal) => ({
                  ...prevVal,
                  github: event.target.value,
                }))
              }
            />
            <InputControl
              label={"Deployed Link"}
              value={values.link}
              onChange={(event) =>
                setValues((prevVal) => ({
                  ...prevVal,
                  link: event.target.value,
                }))
              }
            />
          </div>
          <div className={styles.right}>
            <InputControl
              label={"Project Title"}
              value={values.title}
              onChange={(event) =>
                setValues((prevVal) => ({
                  ...prevVal,
                  title: event.target.value,
                }))
              }
            />
            <InputControl
              label={"Project Overview"}
              value={values.overview}
              onChange={(event) =>
                setValues((prevVal) => ({
                  ...prevVal,
                  overview: event.target.value,
                }))
              }
            />
            <div className={styles.description}>
              <div className={styles.top}>
                <p className={styles.title}>Project Description</p>
                <p className={styles.link}>+Add points</p>
              </div>
              <InputControl />
              <InputControl />
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <p className={styles.cancel} onClick={() => setShowModal(false)}>
            Cancel
          </p>
          <button className={styles.submit}>Submit</button>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectForm;
