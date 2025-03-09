import React from "react";
import "./spinner.css";
const Spinner = () => (
  <div className="spinner">
    <svg
      height="64"
      width="64"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="32" cy="8" fill="#000" r="8">
        <animateMotion
          begin="0s"
          calcMode="linear"
          dur="1s"
          keyPoints="0; 0.02; 0.1; 0.21; 0.35; 0.5; 0.65; 0.79; 0.9; 0.98; 1"
          keyTimes="0; 0.1; 0.2; 0.3; 0.4; 0.5; 0.6; 0.7; 0.8; 0.9; 1"
          path="M0,0 a24,24 0 1,1 0,48 a 24,24 0 1,1 0,-48"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="32" cy="8" fill="#000" r="7">
        <animateMotion
          begin="0s"
          calcMode="linear"
          dur="1s"
          keyPoints="0; 0; 0.03; 0.12; 0.25; 0.41; 0.59; 0.75; 0.88; 0.97; 1"
          keyTimes="0; 0.1; 0.2; 0.3; 0.4; 0.5; 0.6; 0.7; 0.8; 0.9; 1"
          path="M0,0 a24,24 0 1,1 0,48 a 24,24 0 1,1 0,-48"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="32" cy="8" fill="#000" r="6">
        <animateMotion
          begin="0s"
          calcMode="linear"
          dur="1s"
          keyPoints="0; 0; 0; 0.04; 0.15; 0.31; 0.5; 0.69; 0.85; 0.96; 1"
          keyTimes="0; 0.1; 0.2; 0.3; 0.4; 0.5; 0.6; 0.7; 0.8; 0.9; 1"
          path="M0,0 a24,24 0 1,1 0,48 a 24,24 0 1,1 0,-48"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="32" cy="8" fill="#000" r="5">
        <animateMotion
          begin="0s"
          calcMode="linear"
          dur="1s"
          keyPoints="0; 0; 0; 0; 0.05; 0.19; 0.39; 0.61; 0.81; 0.95; 1"
          keyTimes="0; 0.1; 0.2; 0.3; 0.4; 0.5; 0.6; 0.7; 0.8; 0.9; 1"
          path="M0,0 a24,24 0 1,1 0,48 a 24,24 0 1,1 0,-48"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="32" cy="8" fill="#000" r="4">
        <animateMotion
          begin="0s"
          calcMode="linear"
          dur="1s"
          keyPoints="0; 0; 0; 0; 0; 0.07; 0.25; 0.5; 0.75; 0.93; 1"
          keyTimes="0; 0.1; 0.2; 0.3; 0.4; 0.5; 0.6; 0.7; 0.8; 0.9; 1"
          path="M0,0 a24,24 0 1,1 0,48 a 24,24 0 1,1 0,-48"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="32" cy="8" fill="#000" r="3">
        <animateMotion
          begin="0s"
          calcMode="linear"
          dur="1s"
          keyPoints="0; 0; 0; 0; 0; 0; 0.1; 0.35; 0.65; 0.9; 1"
          keyTimes="0; 0.1; 0.2; 0.3; 0.4; 0.5; 0.6; 0.7; 0.8; 0.9; 1"
          path="M0,0 a24,24 0 1,1 0,48 a 24,24 0 1,1 0,-48"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="32" cy="8" fill="#000" r="2">
        <animateMotion
          begin="0s"
          calcMode="linear"
          dur="1s"
          keyPoints="0; 0; 0; 0; 0; 0; 0; 0.15; 0.5; 0.85; 1"
          keyTimes="0; 0.1; 0.2; 0.3; 0.4; 0.5; 0.6; 0.7; 0.8; 0.9; 1"
          path="M0,0 a24,24 0 1,1 0,48 a 24,24 0 1,1 0,-48"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </div>
);
export default Spinner;
