function Withdraw(props){
    const [show, setShow]    =React.useState(true);
    const [status, setStatus]=React.useState('');
    const [amount, setAmount] = React.useState('');
    
    return(
      <Card
      bgcolor="dark"
      header="Withdraw"
      status={status}
      body={show ? 
        (<>
        <WithdrawForm user={props.user} setShow={setShow} setStatus={setStatus} setAmount={setAmount}/> 
       </> ):
       <> <WithdrawMsg setShow={setShow} setStatus={setStatus} amount={amount}/>
    </> }
    />
  )
}


function WithdrawMsg(props){
  return (<>
    <h5>Successful withdraw</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
          props.setShow(true);
          props.setStatus('');
      }}>
        Make another withdraw
    </button>
  </>);
} 

function WithdrawForm(props) {
    const [email, setEmail]   = React.useState('');
    const [amount, setAmount] = React.useState('');
    const [balance, setBalance] =React.useState('');
    const ctx = React.useContext(UserContext);

// Push new user into the ctx
function handle() {
  fetch(`/account/update/${email}/-${amount}`)
  .then(response => response.text())
  .then(text => {
    try {
      const data = JSON.parse(amount);
      ctx.balance -= amount;
      props.setStatus(data.amount);
      props.setShow(false);
      props.setAmount(data.amount);
      window.alert(`You withdrew ${amount}!`);
      console.log("JSON:", data)
  } catch(err) {
      props.setStatus('Withdrew failed')
      console.log('err:', text);
  }
});
}

return(
<div>
Email Address:<br/>
<input type="input" 
className="form-control" 
placeholder="Enter email" 
value={email} 
onChange={e => setEmail(e.currentTarget.value)}/><br/>

Amount<br/>
<input type='Number'
  className='form-control'
  placeholder='Enter amount'
  value={amount}
  onChange={e=> setAmount(e.currentTarget.value)}/><br/>

<button type='submit'
   className='btn btn-light'
   onClick={handle}>Withdraw</button> 
</div>);
}
