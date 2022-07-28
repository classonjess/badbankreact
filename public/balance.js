function Balance(props){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const [user, setUser]     = React.useState('');
  const [balance, setBalance] = React.useState('');

  return (
    <Card
      bgcolor='dark'
      header='Balance'
      status={status}
      body={
        show ? (
          <>
            <BalanceForm
              user={props.user}
              setShow={setShow}
              setStatus={setStatus}
              setBalance={setBalance}
            />
          </>
        ) : (
          <>
            {' '}
            <BalanceMsg setShow={setShow} setStatus={setStatus} />
            <p>Current Bank account balance is ${balance}</p>
          </>
        )
      }
    />
  )
}

function BalanceMsg(props) {
  return (
    <>

    </>
  )
}

function BalanceForm(props){
  const [email, setEmail]   = React.useState('');
  const [balance, setBalance] = React.useState(0);  
  const ctx = React.useContext(UserContext);
  const user = ctx.user;
  
    function handle(){
    console.log(email,balance);
    fetch(`/account/findOne/${email}`)
    .then(response => response.text())
    .then(text => {
        try {
          const data = JSON.parse(text)
          props.setStatus('')
          props.setShow(false)
          props.setBalance(data.balance)
          console.log('JSON:', data)
        } catch(err) {
          props.setStatus(text)
            console.log('err:', text);
        }
    });
  }

  return (<>

    Email Address:<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Check Balance
    </button>

  </>);
  }
