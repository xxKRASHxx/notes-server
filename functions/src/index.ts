import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as user from 'firebase/app'
import { getAuth, connectAuthEmulator } from "firebase/auth";
import firebaseConfig from './firebase-config'

import handleApiRequest from './api'
// import handleCreateUser from './auth'

admin.initializeApp()
user.initializeApp(firebaseConfig)

/*
This is required for signing in using firebase emulation.
*/
if (process.env.FIREBASE_AUTH_EMULATOR_HOST) {
    console.log(`Firebase Auth emulation enabled on Host: ${process.env.FIREBASE_AUTH_EMULATOR_HOST}`)
    connectAuthEmulator(getAuth(), `http://${process.env.FIREBASE_AUTH_EMULATOR_HOST}`)
}

export const api = functions.https.onRequest(handleApiRequest)

// export const didAuthUser = functions.auth.user().onCreate(handleCreateUser)