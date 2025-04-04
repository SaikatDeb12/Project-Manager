import React, { useRef, useState } from "react";
import Modal from "../Modal/Modal";
import styles from "./projectForm.module.css";
import InputControl from "../InputControl/InputControl";
import { RxCross2 } from "react-icons/rx";
import {
  addProjectInDb,
  updateProjectInDb,
  uploadImage,
} from "../../../firebase";

const ProjectForm = ({
  setShowModal,
  uid,
  onSubmission,
  isEdit,
  initValue,
  pid,
}) => {
  const defaultVal = initValue || {};
  const [values, setValues] = useState({
    thumbnail: defaultVal.thumbnail || "",
    title: defaultVal.title || "",
    overview: defaultVal.overview || "",
    github: defaultVal.github || "",
    link: defaultVal.link || "",
    points: defaultVal.points || ["", ""],
  });
  const editable = !!isEdit;

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
  const [errors, setErrors] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileUpload = (event) => {
    // console.log(event.target.files[0]);
    const file = event.target.files[0];
    if (!file) return;
    setErrors(null);
    setUploadProgress(0);
    setImageUrl(null);

    uploadImage(
      file,
      (progress) => {
        setUploadProgress(progress);
      },
      (url) => {
        setImageUrl(url);
        setUploadProgress(0);
        setValues((prevVal) => ({ ...prevVal, thumbnail: url }));
      },
      (error) => {
        setErrors(error);
        setUploadProgress(0);
      }
    );
  };

  const validateForm = () => {
    if (!values.title) {
      setErrors("Project tile is required!");
      return false;
    } else if (!values.overview) {
      setErrors("Project's overview required!");
      return false;
    } else if (!values.github) {
      setErrors("Project's GitHub url required!");
      return false;
    } else if (!values.link) {
      setErrors("Project's deployed link reuquired!");
      return false;
    } else if (!values.points.length) {
      setErrors("Please add description!");
      return false;
    } else if (values.points.length < 2) {
      setErrors("Minimum 2 description required!");
      return false;
    }
    return true;
  };

  const [modalSubmitDisabled, setModalSubmitDisabled] = useState(false);

  const handleModalSubmit = async () => {
    const result = validateForm();
    if (!result) return;
    setModalSubmitDisabled(true);
    try {
      if (isEdit && pid) {
        await updateProjectInDb({ ...values, refUser: uid }, pid);
      } else {
        await addProjectInDb({ ...values, refUser: uid });
      }
      setErrors("");
      setShowModal(false);
      onSubmission();
    } catch (error) {
      setErrors("Error saving project: " + error.message);
    } finally {
      setModalSubmitDisabled(false);
    }
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
                src={imageUrl || values.thumbnail}
                alt="click to add thumbnail"
                onClick={() => fileRef.current.click()}
              />
              {uploadProgress > 0 ? (
                <p>
                  <span>{uploadProgress}%</span>Uploaded
                </p>
              ) : (
                <p></p>
              )}
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
        <div className={styles.error}>{errors}</div>
        <div className={styles.footer}>
          <p className={styles.cancel} onClick={() => setShowModal(false)}>
            Cancel
          </p>
          <button
            className={styles.submit}
            onClick={() => handleModalSubmit()}
            disabled={modalSubmitDisabled}
          >
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectForm;
