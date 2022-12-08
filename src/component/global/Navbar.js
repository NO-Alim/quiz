import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
const Navbar = () => {
  return (
    <div className="section py-2 bg-background text-textPrimary flex justify-between items-center shadow-sm border-b border-borderPrimary/10">
      <div>
        <Link to="/">
          <img src={logo} alt="mralim" className="w-20" />
        </Link>
      </div>
      <div className="flex item-center gap-5">
        <Link to="/" className="rounded-md px-3 py-2 hover:bg-brand/10 all">
          Home
        </Link>
        <Link
          to="/dashboard"
          className="bg-brand/10 rounded-md px-3 py-2 hover:bg-brand/10 all"
        >
          Dash Board
        </Link>
        <Link
          to="/leaderboard"
          className="rounded-md px-3 py-2 hover:bg-brand/10 all"
        >
          Leader Board
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
