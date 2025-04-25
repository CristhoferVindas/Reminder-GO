# 📱 Reminder GO

Aplicación móvil para la gestión de recordatorios académicos e institucionales. Desarrollada con React Native y Expo, integrada con Firebase y Google Sign-In. Permite a estudiantes y administradores gestionar eventos, recibir notificaciones y visualizar recordatorios desde un calendario interactivo.

---

### 🧰 Tecnologías Utilizadas

- ⚛️ Expo + React Native  
- 🧭 React Navigation  
- 🔐 Google Sign-In + Firebase Authentication  
- 🧠 Zustand (manejo de estado global)  
- 🌐 Integración con plataforma web (Next.js)

---

### 🚀 Instalación

1. Clona el repositorio y entra en el proyecto:

    ```bash
    git clone https://github.com/tuusuario/reminder-go.git
    cd reminder-go
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Configura el entorno:

    - Crea un proyecto en [Firebase](https://console.firebase.google.com/).
    - Habilita **Google Sign-In** y copia el **Web Client ID**.
    - Crea un archivo `.env` en la raíz del proyecto y agrega:

      ```env
      EXPO_WEB_CLIENT_ID=YOUR_WEB_CLIENT_ID
      ```

4. Inicia la aplicación:

    ```bash
    npx expo start
    ```

---

### ✨ Funcionalidades

- 🔐 **Inicio de sesión con Google**
- 📬 **Notificaciones push para eventos importantes**
- 📅 **Visualización de recordatorios en calendario interactivo**
- 👥 **Una cuenta para múltiples instituciones**

---

### 🔍 Código Destacado

```js
// Configuración de Google Sign-In
GoogleSignin.configure({
  webClientId: process.env.EXPO_WEB_CLIENT_ID,
});

// Autenticación con Firebase
const handleGoogleSignIn = async () => {
  const { idToken } = await GoogleSignin.signIn();
  const googleCredential = GoogleAuthProvider.credential(idToken);
  await signInWithCredential(auth, googleCredential);
};
