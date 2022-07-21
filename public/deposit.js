function Deposit(){
    const [show, setShow]    =React.useState(true);
    const [status, setStatus]=React.useState('');
    const [amount, setAmount]=React.useState('');
    const [balance,setBalance]=React.useState('');
    const ctx = React.useContext(UserContext);

    return(
      <Card
         bgcolor="dark"
         header="Deposit"
         status={status}
         body={show ? 
         <DepositForm setShow={setShow} setStatus={setStatus}/> :
         <DepositMsg setShow={setShow} />}
     
      />
  )
}


function DepositMsg(props){
  const ctx = React.useContext(UserContext);
  return(
  <>
    <h5> Successful deposit </h5>
    Balance: {ctx.users[0].balance}
    <br></br>
    <button 
    type="submit"
    className="btn btn-light"
    onClick={() => props.setShow(true)}>
       Make another Deposit
  </button>
  </>);
}

function DepositForm(props) {
  const [amount, setAmount]   = React.useState('');
  const [email, setEmail]     = React.useState('');
  const [balance, setBalance] = React.useState(0);
  const ctx = React.useContext(UserContext);
 
<br></br>
// Push new user into the ctx
function handle() {
  fetch(`/account/deposit/${email}/${amount}`)
  .then(response => response.text())
  .then(text => {
    try {
    ctx.balance += amount;
    const data = JSON.parse(text);
    console.log('JSON:', data);
  } catch(err) {
    props.setStatus('Deposit failed')
    console.log('err:', text);
    window.alert(`You deposited $${amount}!`);
      }
    });
}

return(
<div>
Email<br/>
<input 
type="input" 
className="form-control" 
placeholder="Enter email" 
value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>

Amount<br/>
<input 
type='Number'
className='form-control'
id="amount"
placeholder='Enter amount'
value={amount}
onChange={e=> setAmount(e.currentTarget.value)}/><br/>


<button type='submit'
 className='btn btn-light'
 onClick={handle}>Deposit</button> 
</div>);
}

