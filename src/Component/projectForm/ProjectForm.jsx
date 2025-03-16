import React from "react";
import Modal from "../Modal/Modal";
import styles from "./projectForm.module.css";
import InputControl from "../InputControl/InputControl";
const ProjectForm = ({ setShowModal }) => {
  return (
    <div>
      <Modal onClose={() => setShowModal(false)}>
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.image}>
              <img src="/sampleProject.jpg" alt="thumbnail" />
              <p>
                <span>40%</span>Uploaded
              </p>
            </div>
            <InputControl label={"GitHub"} />
            <InputControl label={"Deployed Link"} />
          </div>
          <div className={styles.right}>
            <InputControl label={"Project Title"} />
            <InputControl label={"Project Overview"} />
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
