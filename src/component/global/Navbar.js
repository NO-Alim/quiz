import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { userLoggedOut } from '../../features/auth/authSlice';
import { resetPoint } from '../../features/rannking/rankingSlice';
import { FiLogOut } from 'react-icons/fi';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import close from '../../assets/images/close.png';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  list: {
    width: 'auto',
  },
  fullList: {
    width: 'auto',
  },
  drawerPaper: {
    width: 'auto',
    background: '#0b162a',
    color: '#e9e9e9',
  },
});
const Navbar = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [userDrawer, setUserDrawer] = useState(false);
  const [menuDrawer, setMenuDrawer] = useState(false);

  const menuBtnRef = useRef(null);
  const menuDrawerRef = useRef(null);

  const toggleUserDrawer = () => {
    setUserDrawer(!userDrawer);
  };

  const toggleMenuDrawer = () => {
    setMenuDrawer(!menuDrawer);
  };

  const handleClick = (e) => {
    if (!menuBtnRef.current.contains(e.target)) {
      if (!menuDrawerRef.current.contains(e.target)) {
        setMenuDrawer(false);
      }
    }
  };
  const logout = () => {
    dispatch(userLoggedOut());
    dispatch(resetPoint());
    localStorage.clear();
  };

  useEffect(() => {
    document.addEventListener('keydown', toggleMenuDrawer);
    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', toggleMenuDrawer);
      document.removeEventListener('click', handleClick);
    };
  });
  return (
    <>
      <div className="section py-2 bg-background text-textPrimary flex justify-between items-center shadow-sm border-b border-borderPrimary/10">
        <div>
          <Link to="/">
            <img src={logo} alt="mralim" className="w-20" />
          </Link>
        </div>
        <div className="">
          <div className="hidden md:flex gap-5">
            <Link to="/" className="rounded-md px-3 py-2 hover:bg-brand/10 all">
              Home
            </Link>
            <Link
              to="/controlPanel"
              className="bg-brand/10 rounded-md px-3 py-2 hover:bg-brand/10 all"
            >
              Control Panel
            </Link>
            <Link
              to="/dashboard"
              className="bg-brand/10 rounded-md px-3 py-2 hover:bg-brand/10 all"
            >
              Dashboard
            </Link>
            <Link
              to="/ranking"
              className="rounded-md px-3 py-2 hover:bg-brand/10 all"
            >
              Leader Board
            </Link>
            <button onClick={logout}>
              <FiLogOut size={24} />
            </button>
          </div>
          <div className="menu md:hidden cursor-pointer flex gap-5 items-center">
            <div
              className={`w-[30px] h-[30px] flex flex-col justify-around`}
              onClick={() => toggleMenuDrawer()}
              ref={menuBtnRef}
            >
              <span
                className={`all menu-bar bg-textPrimary block h-[2px] ${
                  menuDrawer ? 't -rotate-45 translate-y-2' : ''
                }`}
              ></span>
              <span
                className={`all menu-bar bg-textPrimary block h-[2px] ${
                  menuDrawer ? 'hidden' : ''
                }`}
              ></span>
              <span
                className={`all menu-bar bg-textPrimary block h-[2px] ${
                  menuDrawer ? 'rotate-45 -translate-y-[7px]' : ''
                }`}
              ></span>
            </div>
          </div>
        </div>
      </div>
      <Drawer
        className={classes.list}
        palette="secondary"
        variant="persistent"
        open={menuDrawer}
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
        ref={menuDrawerRef}
      >
        <div className="p-2 w-screen sm:w-[400px] flex flex-col gap-10 md:hidden">
          <div className="flex justify-between items-center">
            <NavLink to="/">
              <img className="w-16" src={logo} alt="mralim" />
            </NavLink>
            <img
              className="w-5 h-5"
              src={close}
              alt="close"
              onClick={() => setMenuDrawer(false)}
            />
          </div>
          <div>
            <ul className="list-none flex flex-col gap-5">
              <Link
                to="/"
                className="rounded-md px-3 py-2 hover:bg-brand/10 all text-center"
                onClick={toggleMenuDrawer}
              >
                Home
              </Link>
              <Link
                to="/controlPanel"
                className="bg-brand/10 rounded-md px-3 py-2 hover:bg-brand/10 all text-center"
                onClick={toggleMenuDrawer}
              >
                Control Panel
              </Link>
              <Link
                to="/dashboard"
                className="bg-brand/10 rounded-md px-3 py-2 hover:bg-brand/10 all text-center"
                onClick={toggleMenuDrawer}
              >
                Dashboard
              </Link>
              <Link
                to="/ranking"
                className="rounded-md px-3 py-2 hover:bg-brand/10 all text-center"
                onClick={toggleMenuDrawer}
              >
                Leader Board
              </Link>
              <button
                className="rounded-md px-3 py-2 bg-brand text-background hover:bg-brand/10 all text-center"
                onClick={() => {
                  logout();
                  toggleMenuDrawer();
                }}
              >
                Logout
              </button>
            </ul>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
