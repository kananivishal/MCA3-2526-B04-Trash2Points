# Trash2Points

Trash2Points is a mobile and web-based application that allows users to report garbage or unclean areas in their surroundings. The project is designed with **two panels**:  
- **User Panel (Android App – Kotlin)** for reporting issues  
- **Admin Panel (Web – MERN Stack)** for managing and updating reports  

All data is stored in **MongoDB**, ensuring secure and scalable cloud-based storage.  

---

## 🚀 Features

### 👤 User (Android App – Kotlin)  
- Register and login securely  
- Submit reports with image, location, and description  
- View history of submitted reports  
- Track the status of each report  
- Edit profile details  

### 🛠️ Admin (Web – MERN Stack)  
- Login to admin dashboard  
- View all user-submitted reports  
- Update report status (Pending, Rejected, Cleaned)  
- View single report details (image, location, user, date)  
- Delete reports if required  

---

## 🗂️ Tech Stack

- **Frontend (Admin Panel):** React.js, Tailwind CSS / Material UI  
- **Mobile App (User Panel):** Kotlin, Android Studio  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB with Mongoose  
- **Others:** GitHub (Version Control), Postman (API Testing), Retrofit (API Calls in Android)  

---

## ⚙️ Installation & Setup

### 🔹 Clone Repository
```
git clone https://github.com/kananivishal/MCA3-2526-B04-Trash2Points.git
```

### 🔹 Backend Setup
```
cd backend
npm install
npm start
```

### 🔹 Admin Panel Setup
```
cd admin-panel
npm install
npm run dev
```

### 🔹 Android App Setup

- Open the android-app folder in Android Studio  
- Sync Gradle and run the app on an emulator or physical device

---

## 📊 Database Design

- **Users Collection:** Stores user details (name, email, phone, password, role)  
- **Reports Collection:** Stores reports with image, location, description, status, and reference to the user

---

## ✅ Future Enhancements

- Reward system for active users  
- Push notifications for report updates
- Multi-language support
- Offline reporting support

