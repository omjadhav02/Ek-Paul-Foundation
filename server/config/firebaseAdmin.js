import admin from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json" assert { type: "json" }; 
// ^ This JSON file you download from Firebase console (Service Account > Admin SDK)

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
