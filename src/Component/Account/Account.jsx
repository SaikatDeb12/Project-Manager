import React, { useEffect, useRef, useState } from "react";
import styles from "./account.module.css";
import { IoLogOutOutline, IoCameraOutline } from "react-icons/io5";
import InputControl from "../InputControl/InputControl";
import {
  auth,
  fetchProjectDetails,
  getAllProjects,
  updateUserDb,
  uploadImage,
} from "../../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Project from "../Projects/Project";
import Modal from "../Modal/Modal";
import ProjectForm from "../projectForm/ProjectForm";

const Account = ({ userDetails }) => {
  const navigate = useNavigate();
  const imagePicker = useRef();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setErrors] = useState(null);
  const [userProfileDetails, setUserProfileDetails] = useState({
    name: userDetails.name,
    designation: userDetails.designation || "",
    github: userDetails.github || "",
    linkedin: userDetails.linkedin || "",
  });
  const [saveDetails, setSaveDetails] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isProjectLoaded, setIsProjectLoaded] = useState(false);
  const [projectList, setProjectList] = useState([]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    console.log("File selected: ", file.name, file.type, file.size);
    setErrors(null);
    setUploadProgress(0);
    setImageUrl(null);

    uploadImage(
      file,
      (progress) => {
        console.log("Upload progress: ", progress);
        setUploadProgress(progress);
      },
      (url) => {
        console.log("Upload complete. URL: ", url);
        setImageUrl(url);
        setUploadProgress(0);
        updatedProfileImage(url);
      },
      (err) => {
        console.error("Upload error: ", err);
        setErrors(err);
        setUploadProgress(0);
      }
    );
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    console.log("Saving profile details:", userProfileDetails);
    setSaveDetails(true);
  };

  const saveDetailstoDb = async () => {
    if (!userProfileDetails.name) {
      setErrors("Name required!");
      return;
    }

    await updateUserDb(
      { ...userProfileDetails, email: userDetails.email },
      userDetails.uid
    );
    setSaveDetails(true);
  };

  const updatedProfileImage = (url) => {
    updateUserDb({ ...userProfileDetails, profileImage: url }, userDetails.uid);
  };

  const fetchAllProjects = async () => {
    const res = await getAllProjects();
    if (!res) {
      return;
    }
    console.log("response", res);
    setIsProjectLoaded(true);
    const tempProjects = [];
    res.forEach((doc) => tempProjects.push({ ...doc.data(), pid: doc.id }));
    setProjectList(tempProjects);
    console.log("project list: ", tempProjects);
  };

  const projectDetails = async () => {
    try {
      const snapshot = await fetchProjectDetails(userDetails.uid);

      if (!snapshot || snapshot.empty) {
        console.log("No matching documents found.");
        return;
      }

      const docs = snapshot.docs;
      console.log("Data present: ");
      docs.forEach((doc) => console.log(doc.data()));
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  const [editProjectModal, setEditProjectModal] = useState(false);
  const [editableProject, setEditableProject] = useState({});
  const handleEditClick = (project) => {
    setEditProjectModal(true);
    setEditableProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditProjectModal(false);
    setEditableProject({});
  };

  const handleAddProjectClick = () => {
    handleCloseModal();
    setShowModal(true);
  };

  useEffect(() => {
    fetchAllProjects();
  }, []);

  return (
    <div className={styles.container}>
      {showModal && (
        <ProjectForm
          setShowModal={setShowModal}
          uid={userDetails.uid}
          onSubmission={fetchAllProjects}
          isEdit={editProjectModal}
          initValue={editableProject}
          pid={editableProject.pid}
        />
      )}
      <div className={styles.header}>
        <p className={styles.heading}>
          Welcome{" "}
          <span style={{ color: "black" }}>
            {userProfileDetails.name || userDetails.name}
          </span>
        </p>
        <div className={styles.logout} onClick={handleLogout}>
          <IoLogOutOutline /> Logout
        </div>
      </div>
      <input
        type="file"
        ref={imagePicker}
        style={{ display: "none" }}
        onChange={handleImageChange}
        accept="image/*"
      />
      <div className={styles.profileSection}>
        <div className={styles.title}>Your profile</div>
        <div className={styles.profile}>
          <div className={styles.left}>
            <div className={styles.image}>
              <img
                src={imageUrl || userDetails.profileImage}
                alt="Profile"
                onError={(e) => console.log("Image load error: ", e)}
              />
              <IoCameraOutline
                className={styles.camera}
                onClick={() => imagePicker.current.click()}
              />
            </div>
            {uploadProgress > 0 && uploadProgress < 100 && (
              <p>Uploading: {uploadProgress}%</p>
            )}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {imageUrl && uploadProgress === 0 && (
              <p style={{ color: "rgb(3, 227, 3)" }}>
                Image uploaded successfully!
              </p>
            )}
          </div>
          <div className={styles.right}>
            <form onSubmit={handleSaveChanges} className="form">
              <div className={styles.row}>
                <InputControl
                  label={"Name"}
                  isPassword={false}
                  placeholder={"Enter your name"}
                  name={"name"}
                  value={userProfileDetails.name}
                  onChange={(event) => {
                    setSaveDetails(false);
                    setUserProfileDetails((prevVal) => ({
                      ...prevVal,
                      name: event.target.value,
                    }));
                  }}
                />
                <InputControl
                  label={"Title"}
                  isPassword={false}
                  placeholder={"eg. Full stack developer"}
                  name={"designation"}
                  value={userProfileDetails.designation}
                  onChange={(event) => {
                    setSaveDetails(false);
                    setUserProfileDetails((prevVal) => ({
                      ...prevVal,
                      designation: event.target.value,
                    }));
                  }}
                />
              </div>
              <div className={styles.row}>
                <InputControl
                  label={"GitHub"}
                  isPassword={false}
                  placeholder={"Enter your github link"}
                  name={"github"}
                  value={userProfileDetails.github}
                  onChange={(event) => {
                    setSaveDetails(false);
                    setUserProfileDetails((prevVal) => ({
                      ...prevVal,
                      github: event.target.value,
                    }));
                  }}
                />
                <InputControl
                  label={"LinkedIn"}
                  isPassword={false}
                  placeholder={"Enter your LinkedIn link"}
                  name={"linkedin"}
                  value={userProfileDetails.linkedin}
                  onChange={(event) => {
                    setSaveDetails(false);
                    setUserProfileDetails((prevVal) => ({
                      ...prevVal,
                      linkedin: event.target.value,
                    }));
                  }}
                />
              </div>
              <div className={styles.save}>
                <button
                  type="submit"
                  disabled={saveDetails}
                  onClick={saveDetailstoDb}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className={styles.projectSection}>
        <div className={styles.projectHeading}>
          <p>Your Projects</p>
          <button className={styles.addProject} onClick={handleAddProjectClick}>
            Add Projects
          </button>
        </div>
        <div className={styles.projects}>
          {isProjectLoaded ? (
            projectList.length > 0 ? (
              projectList.map((item, index) => (
                <div className={styles.project} key={index}>
                  <Project
                    name={item.title}
                    link={item.link}
                    github={item.github}
                    showModal={setShowModal}
                    projectDetails={projectDetails}
                    handleEditClick={() => handleEditClick(item)}
                    pid={item.pid}
                  />
                </div>
              ))
            ) : (
              <p style={{ color: "black" }}>No projects found!</p>
            )
          ) : (
            <p>Projects not loaded!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
