import * as functions from "firebase-functions";
import onApiRequest from './api';

export const helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});

export const api = functions.https.onRequest(onApiRequest);
