import React, { useRef, useState } from "react";
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
    points: ["first", "second"],
  });

  const handleDescription = (index, value) => {
    const temp = [...values.points];
    temp[index] = value;
    setValues((prevVal) => ({ ...prevVal, points: temp }));
  };

  const handleAddPoints = () => {
    const temp = ["", ...values.points];
    console.log("value of points array: ", temp);
    setValues((prevVal) => ({ ...prevVal, points: temp }));
  };

  const handlePointsDelete = (index) => {
    const temp = [...values.points];
    temp.splice(index, 1);
    setValues((prevVal) => ({ ...prevVal, points: temp }));
  };

  const fileRef = useRef();

  const handleFileUpload = (event) => {
    console.log(event.target.files[0]);
  };

  return (
    <div>
      <Modal onClose={() => setShowModal(false)}>
        <div className={styles.container}>
          <input
            type="file"
            ref={fileRef}
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
          <div className={styles.left}>
            <div className={styles.image}>
              <img
                src={values.thumbnail}
                alt="thumbnail"
                onClick={() => fileRef.current.click()}
              />
              <p>
                <span>40%</span>Uploaded
              </p>
            </div>
            <InputControl
              label={"GitHub"}
              placeholder={"Project repository link"}
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
              placeholder={"Project deployed link"}
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
              placeholder={"Enter project title"}
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
              placeholder={"Project's breif overview"}
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
                  <div className={styles.description} key={index}>
                    <InputControl
                      placeholder={"Type something..."}
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
