import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function ApplicationCard( { application } ) {

    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate("/application/"+id);
    }
    
    return ( 
        <div className = "box card" id = {application.id} onClick={() => handleClick(application.id)} >
            <h3> {application.company_name} </h3>
            <h4> {application.status} </h4>
            { application.status === 'Interested' &&  <h4> {application.deadline} </h4> } 
            { application.notes && <h5> {application.notes} </h5> }
        </div>
    )
}

export default ApplicationCard;

