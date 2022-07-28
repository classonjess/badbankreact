
// credential grants access to Firebase service
initializeApp({
    credential: _credential.cert(serviceAccount),
    databaseURL: "https://badbank-e02d7-default-rtdb.firebaseio.com"
  });

export default admin;
