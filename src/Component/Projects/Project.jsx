import React from "react";
import styles from "./project.module.css";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import { Link } from "react-router-dom";

const Project = ({
  name,
  link,
  github,
  showModal,
  projectDetails,
  handleEditClick,
  handleDeleteClick,
  pid,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.project}>
        <div className={styles.name}>{name}</div>
        <div className={styles.connect}>
          <MdEdit
            className={styles.icons}
            onClick={() => (
              showModal(true), projectDetails(), handleEditClick()
            )}
          />
          <MdDelete
            className={styles.icons}
            onClick={() => handleDeleteClick()}
          />
          {github && (
            <a
              href={github.includes("http") ? github : `https://${github}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className={styles.icons} />
            </a>
          )}
          {link && (
            <a
              href={link.includes("http") ? link : `https://${link}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLink className={styles.icons} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
