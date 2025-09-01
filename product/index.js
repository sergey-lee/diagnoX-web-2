// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyATnF_m9h3VWabnfEqu2KY5g8lszBqcogo",
  authDomain: "diagnox-web.firebaseapp.com",
  projectId: "diagnox-web",
  storageBucket: "diagnox-web.firebasestorage.app",
  messagingSenderId: "1014420872794",
  appId: "1:1014420872794:web:fb781219a491a1e7114263",
  measurementId: "G-F42KFG9JG6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Функция для проверки уникальности email
async function isEmailUnique(email) {
  try {
    const q = query(collection(db, "newsletter_emails"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty;
  } catch (error) {
    console.error("Error checking email uniqueness:", error);
    throw error;
  }
}

// Функция для сохранения email
async function saveEmail(email) {
  try {
    const docRef = await addDoc(collection(db, "newsletter_emails"), {
      email: email,
      timestamp: new Date(),
      source: "DiagnoX Newsletter",
      status: "subscribed",
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error saving email:", error);
    return { success: false, error: error.message };
  }
}

// Обработка кнопки сохранения email
const saveEmailBtn = document.getElementById("saveEmailBtn");
const emailModal = document.getElementById("emailInputModal");

saveEmailBtn.addEventListener("click", async () => {
  const buyerEmail = document.getElementById("buyerEmail");
  const email = buyerEmail.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const { success } = await saveEmail(email);
  if (success) {
    alert("Saved.");
  }

  buyerEmail.value = "";
  emailModal.style.display = "none";
});
