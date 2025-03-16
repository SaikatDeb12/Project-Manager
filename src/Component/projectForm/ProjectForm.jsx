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
              <img src="" alt="thumbnail" />
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
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectForm;
