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
        <Link href="/cars" onClick={toggle}>Cars</Link>
        <Link href="/about" onClick={toggle}>About Us</Link>
        <Link href="/contact" onClick={toggle}>Contact</Link>
        <Link href="/login" onClick={toggle}>Login</Link>
      </div>
    </div>
  );
};

export default BurgerMenu;
