import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as user from 'firebase/app'
import firebaseConfig from './firebase-config'

import onApiRequest from './api';

console.log(process.env)

if (process.env.FIREBASE_AUTH_EMULATOR_HOST) {
    console.log(`Firebase Auth emulation enabled on Host: ${process.env.FIREBASE_AUTH_EMULATOR_HOST}`)
}

admin.initializeApp()
user.initializeApp(firebaseConfig)

export const helloWorld = functions.https.onRequest((_request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});

export const api = functions.https.onRequest(onApiRequest);
