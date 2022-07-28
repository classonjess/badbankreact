const firebaseConfig = {
  apiKey: "AIzaSyAQ31MPlj8slq_5E5LVtwUK7BA3zQMgAiY",
  authDomain: "badbank-e02d7.firebaseapp.com",
  databaseURL: "https://badbank-e02d7-default-rtdb.firebaseio.com",
  projectId: "badbank-e02d7",
  storageBucket: "badbank-e02d7.appspot.com",
  messagingSenderId: "787228376615",
  appId: "1:787228376615:web:c61389bea3e8dba253d802"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function Login(){
  const [show, setShow]    = React.useState(true);
  const [status, setStatus]= React.useState('');
  const [user, setUser]    = React.useState(' ');
  const UserContext = React.createContext('');
  const ctx = React.useContext(UserContext);

 
  return(
      <Card
         bgcolor="dark"
         header="Login"
         status={status}
         body={show ? 
         <LoginForm setShow={setShow} setStatus={setStatus} setUser={setUser} /> :
         <LoginMsg setShow={setShow} setStatus={setStatus} user={user}/>}
      />
  )
}

function LoginMsg(props){
  const bankUser = props.user.email;
     return(
     <div>
         <h5>{` Successful login for:  ${bankUser} `}</h5>
         <br></br>
         <button  type='submit' className='btn btn-light'  onClick={logout} >Log out</button>
         <br></br>
         <br></br>
         <button type="submit" className="btn btn-light" onClick={() => props.setShow(true)}>Log into another account </button>
     </div>);
 }

 function logout() {
  firebase
  .auth()
  .signOut()
  .then(() => {
   console.log('Sign-out successful.');
   window.alert('You have been logged out');
  })
  .catch((error) => {
    console.log('An error happened');
  });
 }

function LoginForm(props) {
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName]         = React.useState('');
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState(true);
  const ctx = React.useContext(UserContext);
  const user = ctx.user;

function handle(){
  console.log(email, password);
  firebase
  .auth()
  .signInWithEmailAndPassword(email, password)
  .then((userMade) => {
          const user = userMade.user;
          console.log(`user: ${user.email}`);
          props.setShow(false);
          props.setUser(user);
          props.setStatus('');
          ctx.user = user;
      })
      .catch((err) => {
        const errCode = err.code;
        const errMsg = err.message;
        console.log(`err:  ${errMsg}`);
      });
    }

    function google() {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/cloud-platform');

        firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            console.log(`You are logged in using the following email: ${result.user.email}`);
            props.setShow(false);
            props.setStatus(true);
            props.setUser(user);
          
        fetch(`/account/login/${user.email}/${user.password}`)
            .then((response) => response.text())
            .then((text) => {
          try {
               const data = JSON.parse(text);
               props.setStatus('');
               ctx.user.push({email,password,balance:100})
               props.setShow(false);
          } catch (err) {
            const use = firebase.auth().bankUser;
            const bbUser = user.bbUser;
            const bbEmail = user.bbEmail;
            const bbkPassword = user.bbPassword;
            const url = `/account/create/${user.bbUser}/${user.bbEmail}/${user.bbPassword}`;
            (async () => {
              var res = await fetch(url);
              var data = await res.json();
              console.log(data);
            })();
          }
        });
      })
      .catch((err) => {
      console.log(err.message);
      props.setStatus('Issues');
      }); 
     }   
 


return(
<>
Email Address<br/>
<input 
  type='input'
  className='form-control'
  placeholder='Enter email'
  value={email}
  onChange={e=> setEmail(e.currentTarget.value)}/><br/>

Password<br/>
<input 
  type='password'
  className='form-control'
  placeholder='Enter password'
  value={password}
  onChange={e=> setPassword(e.currentTarget.value)}/><br/>

<button
   type='submit'
   className='btn btn-light'
   onClick={handle}>Login
</button> 
<br></br>
<br></br>
<button
   type='submit'
   className='btn btn-light'
   onClick={google}>Google Login
</button> 
</>);
 }
