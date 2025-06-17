import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC_G8Z6CuxDfc2zgUr9kSU8V-cqkX30FeA",
  authDomain: "esp32-19cea.firebaseapp.com",
  databaseURL:
    "https://esp32-19cea-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "esp32-19cea",
  storageBucket: "esp32-19cea.firebasestorage.app",
  messagingSenderId: "970460918317",
  appId: "1:970460918317:web:6203094464ba3de234bea4",
  measurementId: "G-QQVESWV4TS",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };
