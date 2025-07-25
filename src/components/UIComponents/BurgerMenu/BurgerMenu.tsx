// BurgerMenu/BurgerMenu.tsx
import React from 'react';
import './BurgerMenu.scss';
import Link from 'next/link';

interface BurgerMenuProps {
  isOpen: boolean;
  toggle: () => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ isOpen, toggle }) => {
  return (
    <div className="burger-wrapper">
      <button className={`burger-menu ${isOpen ? 'open' : ''}`} onClick={toggle}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`burger-dropdown ${isOpen ? 'show' : ''}`}>
        <Link href="/" onClick={toggle}>Home</Link>
        <Link href="/buy" onClick={toggle}>Buy</Link>
        <Link href="/sell" onClick={toggle}>Sell</Link>
        <Link href="/valuation" onClick={toggle}>Valuation</Link>
        <Link href="/insights" onClick={toggle}>Insights</Link>
        <Link href="/login" onClick={toggle}>Login</Link>
      </div>
    </div>
  );
};

export default BurgerMenu;
