![](https://res.cloudinary.com/dknw3mf6e/image/upload/v1750844722/Screenshot_300_iaz4vu.png)
![](https://res.cloudinary.com/dknw3mf6e/image/upload/v1750844870/Screenshot_301_tcpwxd.png)
![](https://res.cloudinary.com/dknw3mf6e/image/upload/v1750844895/Screenshot_302_ecsl6x.png)


# 📋 Project Manager – Centralized Project Management Platform

**Project Manager** is a web application built with **React**, **Firebase**, and **Cloudinary**, enabling users to create and manage personalized profiles. Users can store, edit, and delete projects, including descriptions, GitHub repository links, and deployed URLs, all in one centralized platform.

---

## 🚀 Features

- 🧑‍💼 **User Profiles** – Create and manage personalized user profiles.
- 📚 **Project Management** – Add, edit, and delete projects with descriptions, GitHub links, and deployed URLs.
- ☁️ **Cloudinary Integration** – Upload and manage project images or assets.
- 🔥 **Firebase Backend** – Real-time database and authentication for secure data storage.
- ✅ **Form Validation** – Robust input validation using React Hook Form and Zod.
- 📱 **Responsive Design** – Intuitive and mobile-friendly UI with React Router for seamless navigation.

---

## 🛠️ Tech Stack

| Layer       | Tech                         |
|-------------|------------------------------|
| **Frontend** | React, React Router, React Hook Form, Zod |
| **Backend**  | Firebase (Authentication, Firestore) |
| **Storage**  | Cloudinary (Image and asset management) |
| **Icons**    | React Icons |
| **Tooling**  | Dotenv for environment variables |

### Library Used
- @hookform/resolvers
- firebase
- react-hook-form
- react-router-dom
- zod

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/project-manager.git
cd project-manager
```

### 2. Install dependencies

```bash
npm install
```

### ⚙️ Configuration

Create a `.env` file in the root directory and add the following environment variables:

```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_API_KEY=your_cloudinary_api_key
VITE_CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 🏃 Run the App

```bash
npm run dev
```

This will start the development server, typically accessible at `http://localhost:5173`.

---

## 🔐 Security

- **Firebase Authentication**: Secure user login and profile management.
- **Zod Validation**: Ensures safe and validated form inputs.
- **Environment Variables**: Securely stored using `dotenv`.

---

## 🌍 Deployment

You can deploy the app using:

### Vercel / Netlify
- Connect the repository to Vercel or Netlify.
- Add the environment variables in the deployment platform’s dashboard.
- Deploy the app for a live, hosted version.

### Firebase Hosting
- Use Firebase CLI to deploy:
  ```bash
  firebase deploy
  ```
- Configure Firebase Hosting in the `firebase.json` file.

---

## 🤝 Contributing

We welcome contributions! Follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make changes and commit:
   ```bash
   git commit -m 'Added a new feature'
   ```
4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Submit a Pull Request.

Ensure your code adheres to the project’s coding standards.

---

## 🧭 Future Improvements

- 🔔 Real-time notifications for project updates.
- 📊 Dashboard for project analytics.
- 🔍 Search functionality for projects.
- 🌐 Support for multiple languages.
- 📱 PWA support for offline access.
