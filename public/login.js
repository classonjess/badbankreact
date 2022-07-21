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

function callOpenRoute(){
  firebase.auth().currentUser.getIdToken()
      .then(idToken => {
        console.log('idToken', idToken);

        (async () => {
          let response = await fetch('/auth', {
            method: "GET",
            headers: {
              'Authorization': idToken
            }
          });
          let text = await response.text();
          console.log('response', response);
          routeMsg.innerHTML = text;
        })();
      }).catch(e => console.log('e', e));
}

function Login(){
    const [show, setShow]    = React.useState(true);
    const [status, setStatus]= React.useState('');
    const [user, setUser]    = React.useState('');
    const ctx = React.useContext(UserContext);
   
    return(
        <Card
           bgcolor="dark"
           header="Login"
           status={status}
           body={show ? 
           <LoginForm setShow={setShow} setStatus={setStatus} setUser={setUser} /> :
           <LoginMsg setShow={setShow} setStatus={setStatus} user={user} />}
        />
    )
}

function LoginMsg(props){
    const auth = firebase.auth();
    return(
    <div>
      <h5>{`Successful login `} </h5>
      <br></br>
      <button 
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}>Log out</button>    
    </div>);
}

function LoginForm(props) {
    const [email, setEmail]       = React.useState('');
    const [password, setPassword] = React.useState('');
    const ctx = React.useContext(UserContext);

// Push new user into the ctx
function handle(){
  const auth = firebase.auth();
  fetch(`/account/login/${email}/${password}`)
  .then(response => response.text())
  .then((text) => {
      try {
          const data = JSON.parse(text);
          props.setStatus('');
          ctx.users.push({email,password,balance:100})
          props.setShow(false);
          console.log('JSON:', data);   
      } catch(err) {
          props.setStatus(email)
          console.log('err:', email);
      }
  });
}

return(
<div>
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
   onClick={handle}>Log in
  </button> 
</div>);
 }
