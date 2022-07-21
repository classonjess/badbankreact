function Home(){
    const [show, setShow]    =React.useState(true);
    const [status, setStatus]=React.useState('');
    
    return(
        <Card
           bgcolor="dark"
           header="Welcome to Bad Bank"
           status={status}
           body={show ? 
           <HomeForm setShow={setShow}/> :
           <HomeMsg setShow={setShow}/>}
        />
    )
    }
    
    function HomeMsg(props){
    return(
    <div>
      <h5>Success</h5>
      <button type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}>Add Another Account</button>    
    </div>);
    }
    
    function HomeForm(props) {
    const [name, setName]         =React.useState('');
    const [email, setEmail]       =React.useState('');
    const [password, setPassword] =React.useState('');
    const ctx = React.useContext(UserContext);
    
    // Push new user into the ctx
    function handle() {
    console.log(name,email,password);
    ctx.users.push({name,email,password});
    props.setShow(false);
    }
    
    return(
      <div>
      <img src="bank_PNG24.png" className="img-fluid" alt="Responsive image"></img>
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
      