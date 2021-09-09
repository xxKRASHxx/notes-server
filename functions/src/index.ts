import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as user from 'firebase/app'
import { getAuth, connectAuthEmulator } from "firebase/auth";
import firebaseConfig from './firebase-config'

import onApiRequest from './api';

admin.initializeApp()
user.initializeApp(firebaseConfig)

/*
This is required for signing in using firebase emulation.
*/
if (process.env.FIREBASE_AUTH_EMULATOR_HOST) {
    console.log(`Firebase Auth emulation enabled on Host: ${process.env.FIREBASE_AUTH_EMULATOR_HOST}`)
    connectAuthEmulator(getAuth(), `http://${process.env.FIREBASE_AUTH_EMULATOR_HOST}`)
}

export const helloWorld = functions.https.onRequest((_request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});

export const api = functions.https.onRequest(onApiRequest);
