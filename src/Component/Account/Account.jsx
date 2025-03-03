import React from "react";
import styles from "./account.module.css";
import { IoLogOutOutline } from "react-icons/io5";
import { IoCameraOutline } from "react-icons/io5";
import InputControl from "../InputControl/InputControl";
import { useForm } from "react-hook-form";

const Account = () => {
  const { register, handleSubmit } = useForm();

  const mySubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.heading}>
          Welcome <span style={{ color: "black" }}>User</span>
        </p>
        <div className={styles.logout}>
          <IoLogOutOutline /> Logout
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.title}>Your profile</div>
        <div className={styles.profile}>
          <div className={styles.left}>
            <div className={styles.image}>
              <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQjl3X3QecVwXnMQYLd6ZQfecKfsxGHKK_BJqq0hL6RbvDf64qbPKq7PXVhviV4r3Lbi9VoULPVVIPXRrFRNqWRZMsTeN8ba8NI06oRR9I" />
              <IoCameraOutline
                className="camera"
                style={{ color: "white", fontSize: "25px" }}
              />
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.row}>
              <form onSubmit={handleSubmit(mySubmit)} className="form">
                <InputControl
                  label={"Name"}
                  isPassword={false}
                  placeholder={"Enter your name"}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
