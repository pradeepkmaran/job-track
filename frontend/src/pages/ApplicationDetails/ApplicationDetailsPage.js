import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ApplicationDetailsPage.css';

function ApplicationDetailsPage() {
  const { id } = useParams();
  const [application, setApplication] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_API_ENDPOINT}/application/${id}`)
      .then(res => {
        console.log(res);
        setApplication(res.data);
        setLoading(false);
      })
      .catch(error => console.log(error))
  }, []);

  const handleEdit = (id) => {
    navigate('/application/' + id + '/edit')
  }


  return (
    <div className="applicationDetailsPage">
      {loading && <h1>Loading...</h1>}
      {!loading && application && (
        <div className="box details">
          <h2>{application.company_name}</h2>
          <p><strong>Status:</strong> {application.status}</p>
          <p><strong>Location:</strong> {application.location}</p>
          <p><strong>Date Applied:</strong> {application.date_applied}</p>
          <p><strong>Role:</strong> {application.role}</p>
          <p><strong>Career Site:</strong>
            <a href={application.career_site_link} target="_blank" rel="noopener noreferrer">
              {application.career_site_link}
            </a>
          </p>
          <p><strong>Pay:</strong> ${application.pay}</p>
          <p><strong>Deadline to Apply:</strong> {application.deadline_to_apply || 'N/A'}</p>
          <p><strong>Source:</strong> {application.source}</p>
          <p><strong>Notes:</strong> {application.notes}</p>

          <button onClick={() => handleEdit(application.id)}>Edit</button>
        </div>
      )}
      {!loading && !application && <h2>Application not found.</h2>}
    </div>
  );
}

export default ApplicationDetailsPage;

