import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Link, scroller } from "react-scroll";
import styled from 'styled-components';
import React, { useEffect, useState, useRef } from 'react';

const NavList = [
  { name: 'Home', path: '/', scroll:false},
  { name: 'About Me', path: 'about-me', scroll: true },
  { name: 'My Projects', path: 'projects', scroll: true },
  { name: 'Contact', path: '/contact', scroll: false },
  { name: 'Resume', path: '/resume', scroll: false }
];


const NavBar = () => {
  const [showNav, setShowNav] = useState(true);
  const [lastYValue, setLastYValue] = useState(0);
  const lockScroll = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = () => {
    if (lockScroll.current) return;

    const currentY = window.scrollY;

    if (currentY < 50) {
      setShowNav(true);
      return;
    }

    if (currentY < lastYValue) {
      setShowNav(true); // scroll up
    } else {
      setShowNav(false);
    }

    setLastYValue(currentY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastYValue]);

  const scrollToSection = (id) => {
    scroller.scrollTo(id, {
      smooth: true,
      duration: 500,

    });
  };

  const handleScrollLinkClick = (id) => {
    lockScroll.current = true;
    setShowNav(true); // ensure navbar is shown when clicked
    if (location.pathname !== '/') {
      // if we're on another page that's not main,
      // we navigate to it first, then scroll to it.
      navigate('/');
      setTimeout(() => {
        scrollToSection(id);
        lockScroll.current = false;
      }, 50);
    } else {
      scrollToSection(id);
      setTimeout(() => {
        lockScroll.current = false;
      }, 800);
    }
  };


  return (
    <NavContainer show={showNav}>
    <Nav>
      <ul>
      {NavList.map((item) => (
  <li key={item.name}>
    {item.name === "Home" ? (
          <ActiveLink
            to="/"
            onClick={(e) => {      
              if (location.pathname === '/') {
                e.preventDefault(); // prevent double navigation
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                navigate('/');
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 50);

              }
            }}
          >
            {item.name}
          </ActiveLink>
        ) : item.scroll ? (
          <ScrollLink
            as="span"
            onClick={() => handleScrollLinkClick(item.path)}
          >
            {item.name}
          </ScrollLink>
        ) : (
          <ActiveLink to={item.path}
          onClick={(e) => { // no matter where you are, scroll to the top when you click a new link
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 50);
          }}
          >
          {item.name}
          
          </ActiveLink>
        )}
      </li>
    ))}
      </ul>
    </Nav>
    </NavContainer>

  )
}

const NavContainer = styled.div`
  position: fixed;
  top: ${(props) => (props.show ? '0' : '-8rem')};
  left: 0;
  right: 0;
  background: rgb(25, 43, 77);
  transition: top 0.3s ease;
  z-index: 1000;
  padding: 10px 0;

`;

const ScrollLink = styled(Link)`
  text-decoration: none;
  color: white;
  position: relative;
  font-weight: normal;
  cursor: pointer;
  transition: color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 0;
    height: 2px;
    background-color: transparent;
    transition: width 0.3s ease, background-color 0.3s ease;
  }

  &:hover::after {
    width: 100%;
    background-color: white;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  width: 100%;

  ul {
    display: flex;
    padding: 0;
    flex-wrap: wrap;
    list-style-type: none;
    gap: 1.6rem;
  }
  
  li {
    margin: 0 10px;
    width: auto;
  }

`;

const ActiveLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  position: relative;
  font-weight: normal;
  transition: color 0.3s ease;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 0;
    height: 2px;
    background-color: transparent;
    transition: width 0.3s ease, background-color 0.3s ease;
  }

  &:hover::after {
    width: 100%;
    background-color: white;
  }

  &.active {
    color: #61dafb;
    font-weight: bold;
  }

  &.active:hover::after {
    background-color: #61dafb;
  }
  
`;
export default NavBar;