import React from 'react';
import './Price.scss';

const stats = [
  { value: '15,000+', label: 'Vehicles Available' },
  { value: '2,500+', label: 'Verified Dealers' },
  { value: '$2.5B+', label: 'Transactions Processed' },
  { value: '99.8%', label: 'Transaction Success Rate' },
];

const Price = () => {
  return (
    <div className="price-stats-wrapper">
      {stats.map((stat, idx) => (
        <div className="price-stat" key={idx}>
          <div className="price-value">{stat.value}</div>
          <div className="price-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Price;
