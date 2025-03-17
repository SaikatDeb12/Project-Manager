import React, { useState } from "react";
import Modal from "../Modal/Modal";
import styles from "./projectForm.module.css";
import InputControl from "../InputControl/InputControl";
import { RxCross2 } from "react-icons/rx";

const ProjectForm = ({ setShowModal }) => {
  const [values, setValues] = useState({
    thumbnail: "/sampleProject.jpg",
    title: "",
    overview: "",
    github: "",
    link: "",
    points: ["this", "is", "sample", "project", "another", "something"],
  });

  const handleDescription = (index, value) => {
    const temp = [...values.points];
    temp[index] = value;
    setValues((prevVal) => ({ ...prevVal, points: temp }));
  };

  const handleAddPoints = () => {
    const temp = ["", ...values.points];
    setValues((prevVal) => ({ ...prevVal, points: temp }));
  };

  const handlePointsDelete = (index) => {
    const temp = [...values.points];
    temp.splice(index, 1);
    setValues((prevVal) => ({ ...prevVal, points: temp }));
  };

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
              isPassword={false}
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
              isPassword={false}
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
              isPassword={false}
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
              isPassword={false}
              onChange={(event) =>
                setValues((prevVal) => ({
                  ...prevVal,
                  overview: event.target.value,
                }))
              }
            />
            <div className={styles.descContainer}>
              <div className={styles.top}>
                <p className={styles.title}>Project Description</p>
                <p className={styles.link} onClick={() => handleAddPoints()}>
                  +Add points
                </p>
              </div>
              <div className={styles.descInput}>
                {values.points.map((item, index) => (
                  <div className={styles.description}>
                    <InputControl
                      value={item}
                      isPassword={false}
                      onChange={(event) =>
                        handleDescription(index, event.target.value)
                      }
                    />
                    <div className={styles.delete}>
                      {index > 1 && (
                        <RxCross2 onClick={() => handlePointsDelete(index)} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
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
