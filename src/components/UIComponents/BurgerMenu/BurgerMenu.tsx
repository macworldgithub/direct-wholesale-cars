// BurgerMenu/BurgerMenu.tsx
import React from 'react';
import './BurgerMenu.scss';

interface BurgerMenuProps {
  isOpen: boolean;
  toggle: () => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ isOpen, toggle }) => {
  return (
    <button className={`burger-menu ${isOpen ? 'open' : ''}`} onClick={toggle}>
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

export default BurgerMenu;