function Deposit(props){
    const [show, setShow]      =React.useState(true);
    const [status, setStatus]  =React.useState('');
    const [user, setUser]      = React.useState('');
    const [amount, setAmount]  =React.useState('');
    const [data, setData]       =React.useState('');
    const ctx = React.useContext(UserContext);

    return(
      <Card
      bgcolor="dark"
      header="Deposit"
      status={status}
      body={show ? 
        (<>
        <DepositForm user={props.user} setShow={setShow} setStatus={setStatus} setAmount={setAmount}/> 
       </> ):
       <> <DepositMsg setShow={setShow} setStatus={setStatus} amount={amount}/>
    </> }
    />
  )
}

function DepositMsg(props){
  const [amount, setAmount]  =React.useState('');
  const [user, setUser]      = React.useState('');
  const cash = user.amount;
  const ctx = React.useContext(UserContext);
  return(
  <>
  <h4>Successful Deposit!</h4>
    <button 
    type="submit"
    className="btn btn-light"
    onClick={() => {
      props.setShow(true);
      props.setStatus('');
  }}>
    Make another Deposit
  </button>
  </>);
}

function DepositForm(props) {
  const [amount, setAmount]   = React.useState('');
  const [email, setEmail] = React.useState('');
  const ctx = React.useContext(UserContext);
 
<br></br>

function handle() {
  console.log(email, amount);
      fetch(`/account/update/${email}/${amount}`)
      .then(response => response.json())
      .then(text => {
        try {
            const data = JSON.parse(amount);
            ctx.balance += amount;
            props.setStatus(data.amount);
            props.setShow(false);
            props.setAmount(data.amount);
            window.alert(`You deposited ${amount}!`);
            console.log("JSON:", data)
      } catch(err) {
          props.setStatus('Deposit failed')
          console.log('err:', text);
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

Amount<br/>
<input 
type="input"
className='form-control'
placeholder='Enter amount'
value={amount}
onChange={e=> setAmount(e.currentTarget.value)}/><br/>

<button type='submit'
 className='btn btn-light'
 onClick={handle}>Deposit</button> 
</div>);
}

