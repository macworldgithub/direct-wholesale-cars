// Breadcrumbs/Breadcrumbs.tsx
import React from 'react';
import './Breadcrumbs.scss';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Breadcrumb[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav className={`breadcrumbs ${className}`} aria-label="breadcrumb">
      {items.map((item, index) => (
        <span key={index} className="breadcrumb-item">
          {item.href ? <a href={item.href}>{item.label}</a> : item.label}
          {index < items.length - 1 && ' / '}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;