let db = null;
let auth = null;

try {
  const { initializeApp } = await import("https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js");
  const { getFirestore } = await import("https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js");
  const { getAuth } = await import("https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js");

  const firebaseConfig = {
    apiKey: "AIzaSyB0yFSUVKKyfuhTw6d6RkOgmznT9de9_3M",
    authDomain: "studysphere-9476e.firebaseapp.com",
    projectId: "studysphere-9476e",
    storageBucket: "studysphere-9476e.firebasestorage.app",
    messagingSenderId: "389941237979",
    appId: "1:389941237979:web:6062629518982729e5d4fe"
  };

  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
} catch (error) {
  console.warn("Firebase failed to initialize (using offline local fallback database):", error);
}

export { db, auth };