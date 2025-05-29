import React, { useState, useEffect} from 'react';
import ApplicationCard from './ApplicationCard';

function ApplicationList( { applications } ) {
    console.log(typeof(applications));
    console.log("Here", applications);
    return (
        <div className = "ApplicationList" >
            {applications.map((application) => <ApplicationCard key = {application.id} application= {application}/>)}
        </div>
    )
}

export default ApplicationList;
