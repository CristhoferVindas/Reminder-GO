# 📱 Reminder GO

Mobile application for managing academic and institutional reminders. Built with React Native and Expo, integrated with Firebase and Google Sign-In. Allows students and administrators to manage events, receive push notifications, and view reminders on an interactive calendar.

---

### 🧰 Technologies Used

- ⚛️ Expo + React Native  
- 🧭 React Navigation  
- 🔐 Google Sign-In + Firebase Authentication  
- 🧠 Zustand (global state management)  
- 🌐 Integration with web platform (Next.js)

---

### 🚀 Installation

1. Clone the repository and navigate into the project:

    ```bash
    git clone https://github.com/CristhoferVindas/Reminder-GO.git
    cd reminder-go
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Set up the environment:

    - Create a project in [Firebase](https://console.firebase.google.com/).
    - Enable **Google Sign-In** and copy the **Web Client ID**.
    - Create a `.env` file in the root directory and add:

      ```env
      EXPO_WEB_CLIENT_ID=YOUR_WEB_CLIENT_ID
      ```

4. Start the application:

    ```bash
    npx expo start
    ```

---

### ✨ Features

- 🔐 **Google Sign-In authentication**
- 📬 **Push notifications for important events**
- 📅 **Reminder display in an interactive calendar**
- 👥 **Single account for multiple institutions**

---

### 🔍 Code Highlights

```js
// Google Sign-In configuration
GoogleSignin.configure({
  webClientId: process.env.EXPO_WEB_CLIENT_ID,
});

// Firebase authentication
const handleGoogleSignIn = async () => {
  const { idToken } = await GoogleSignin.signIn();
  const googleCredential = GoogleAuthProvider.credential(idToken);
  await signInWithCredential(auth, googleCredential);
};
