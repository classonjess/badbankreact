function AllData(){
    const [data, setData] = React.useState('');

    React.useEffect(() => {
        // Fetch all accounts from API
        fetch('/account/all')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(JSON.stringify(data));
            });
    }, []);
   
    return (
        <div>
        <h5> Account members data</h5>
        {data}
        </div>);
}
 