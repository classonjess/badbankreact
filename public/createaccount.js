function CreateAccount(){
const [show, setShow]    =React.useState(true);
const [status, setStatus]=React.useState('');

return(
    <Card
       bgcolor="dark"
       header="Create Account"
       status={status}
       body={show ? 
       <CreateForm setShow={setShow}/> :
       <CreateMsg setShow={setShow}/>}
    />
)
}

function CreateMsg(props){
return(
<div>
  <h5>Success</h5>
  <button type="submit"
    className="btn btn-light"
    onClick={() => props.setShow(true)}>Add Another Account</button>    
</div>);
}

function CreateForm(props) {
const [name, setName]         =React.useState('');
const [email, setEmail]       =React.useState('');
const [password, setPassword] =React.useState('');


// Push new user into the ctx
function handle() {
console.log(name,email,password);
const url = `/account/create/${name}/${email}/${password}`;
( async () => {
  var res  = await fetch(url);
  var data = await res.json();
  console.log(data)
})();
props.setShow(false);
}

return(
<div>
Name<br/>
<input type='input'
className='form-control'
placeholder='Enter name'
value={name}
onChange={e=> setName(e.currentTarget.value)}/><br/>

Email Address<br/>
<input type='input'
className='form-control'
placeholder='Enter email'
value={email}
onChange={e=> setEmail(e.currentTarget.value)}/><br/>

Password<br/>
<input type='password'
className='form-control'
placeholder='Enter password'
value={password}
onChange={e=> setPassword(e.currentTarget.value)}/><br/>

<button type='submit'
className='btn btn-light'
onClick={handle}>Create Account</button> 
</div>);
}
