import * as admin from "firebase-admin";
import { serviceAccount } from "../service-account";

console.log(serviceAccount);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: "https://backend-ebuddy-a11db-default-rtdb.firebaseio.com/"
});

const db = admin.firestore();

export default db;
