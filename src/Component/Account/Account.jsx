import React from "react";
import styles from "./account.module.css";
import { IoLogOutOutline } from "react-icons/io5";
import { IoCameraOutline } from "react-icons/io5";
import InputControl from "../InputControl/InputControl";
import { useForm } from "react-hook-form";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { useRef } from "react";

const Account = ({ userDetails }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const mySubmit = (data) => {
    console.log(data);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const imagePicker = useRef();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.heading}>
          Welcome <span style={{ color: "black" }}>{userDetails.name}</span>
        </p>
        <div className={styles.logout}>
          <IoLogOutOutline onClick={handleLogout} /> Logout
        </div>
      </div>
      <input type="file" style={{ display: "none" }} ref={imagePicker} />
      <div className={styles.section}>
        <div className={styles.title}>Your profile</div>
        <div className={styles.profile}>
          <div className={styles.left}>
            <div className={styles.image}>
              <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQjl3X3QecVwXnMQYLd6ZQfecKfsxGHKK_BJqq0hL6RbvDf64qbPKq7PXVhviV4r3Lbi9VoULPVVIPXRrFRNqWRZMsTeN8ba8NI06oRR9I" />
              <IoCameraOutline
                className={styles.camera}
                onClick={() => imagePicker.current.click()}
              />
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.row}>
              <form onSubmit={handleSubmit(mySubmit)} className="form">
                <InputControl
                  label={"Name"}
                  isPassword={false}
                  placeholder={userDetails.name}
                  name={"name"}
                  register={register}
                />
                <InputControl
                  label={"Title"}
                  isPassword={false}
                  placeholder={"eg. Full stack developer"}
                  name={"title"}
                  register={register}
                />
              </form>
            </div>
            <div className={styles.row}>
              <form onSubmit={handleSubmit(mySubmit)} className="form">
                <InputControl
                  label={"GitHub"}
                  isPassword={false}
                  placeholder={"Enter your github link"}
                  name={"github"}
                  register={register}
                />
                <InputControl
                  label={"LinkedIn"}
                  isPassword={false}
                  placeholder={"Enter your LinkedIn link"}
                  name={"linkedin"}
                  register={register}
                />
              </form>
            </div>
            <div className={styles.save}>
              <button>Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
