const admin = require('firebase-admin');

var serviceAccount = require("path/to/serviceAccountKey.json");

const type: "service_account",
const project_id: "badbank-e02d7",
const private_key_id: 
const private_key: "-----BEGIN PRIVATE KEY-----\
const client_email: "firebase-adminsdk-jjovm@badbank-e02d7.iam.gserviceaccount.com",
const client_id: "
const auth_uri: "https://accounts.google.com/o/oauth2/auth",
const token_url: "https://oauth2.googleapis.com/token",
const auth_provider_x509_cert_url: 
const client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jjovm%40badbank-e02d7.iam.gserviceaccount.com"

  
// credential grants access to Firebase service
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://badbank-e02d7-default-rtdb.firebaseio.com"
  });

module.exports = admin;