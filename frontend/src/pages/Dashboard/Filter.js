function Filter( {selectedStatuses, setSelectedStatuses, allStatuses} )
{

    function handleChange(e) {
        if (e.target.checked)
        {
            setSelectedStatuses(prev => [...prev,e.target.value]);
            console.log("ad"+selectedStatuses);
        
        }
        else if (!e.target.checked)
        {
            setSelectedStatuses(prev => prev.filter(status => status!=e.target.value));
            console.log(selectedStatuses);
        }
    }
    
    return (
        <div className = 'filter'>

            { allStatuses.map( (status) => (
                <div id={status} key={status}>
                <input type = "checkbox" name="status" value={status} onChange = {handleChange}/>
                <label  htmlFor={status}>{status}</label>
                </div>
            ))}

        </div>
    )

}

export default Filter;

