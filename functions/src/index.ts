import * as functions from "firebase-functions";
import api from './api';

export const HelloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});

export const Api = functions.https.onRequest(api);
