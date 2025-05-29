import React from 'react';
import { getSortedOffers } from '../../../utils/chartUtils'; 

const OfferPayList = ({ data }) => {
  const offers = getSortedOffers(data);

  if (!offers || offers.length === 0) {
    return <p>No offers available.</p>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {offers.map((offer, index) => (
          <li
            key={index}
            style={{
              padding: '12px 16px',
              borderBottom: '1px solid #ddd',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff',
            }}
          >
            <div>
              <strong>{offer.companyName || offer.source || 'Unknown Company'}</strong>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                Position: {offer.role || 'N/A'}
              </div>
            </div>
            <div style={{ fontWeight: 'bold', color: '#2a9d8f' }}>
              ₹{offer.pay?.toLocaleString() || 'N/A'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OfferPayList;
