function Withdraw(){
    const [show, setShow]    =React.useState(true);
    const [status, setStatus]=React.useState('');
    const [balance, setBalance] =React.useState('');
    
    return(
        <Card
           bgcolor="dark"
           header="Withdraw"
           status={status}
           body={show ? 
           <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
           <WithdrawMsg setShow={setShow} setStatus={setStatus}/>}
        />
    )
}

function WithdrawMsg(props){
  const ctx = React.useContext(UserContext);
    return(
    <>
      <h5> Successful withdraw</h5>
      Balance: {ctx.users[0].balance}
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
    const [email, setEmail]       =React.useState('');
    const [amount, setAmount] = React.useState('');
    const ctx = React.useContext(UserContext);

// Push new user into the ctx
function handle() {
  fetch(`/account/withdraw/${email}/-${amount}`)
  .then(response => response.text())
  .then(text => {
      try {
        const data = JSON.parse(text);
        props.setShow(false);
        console.log('JSON:', data);
      } catch(err) {
          props.setStatus('Withdraw failed')
          console.log('err:', text);
      }
  });
}

return(
<div>
Email<br/>
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
   balance={ctx.users[0].balance} 
   onClick={handle}>Withdraw</button> 
</div>);
}