function Spa(){
    return (
     <HashRouter>
     <div>
        <NavBar/> 
        <UserContext.Provider value={{users:[{name:'peter',email:'peter@mit.edu',password:'secret', balance: 0}]}}>

           <div className="container" style={{padding: '20px'}}>
             <Route path="/" exact component={Home} />
             <Route path="/CreateAccount/" component={CreateAccount} />
             <Route path="/alldata/" component={AllData} /> 
             <Route path="/balance/" component={Balance} />
             <Route path="/deposit/" component={Deposit} />
             <Route path="/withdraw/" component={Withdraw} />
             <Route path="/login/" component={Login} />   
           </div>
         </UserContext.Provider>
      </div>
      </HashRouter>
   )
}

ReactDOM.render(<Spa/>,
    document.getElementById('root')
);