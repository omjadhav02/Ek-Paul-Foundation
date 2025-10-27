import admin from "firebase-admin";
// ^ This JSON file you download from Firebase console (Service Account > Admin SDK)

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)),
  });
}

export default admin;
