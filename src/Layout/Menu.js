import { NavLink } from "react-router-dom";
import styled from 'styled-components';

const NavList = [
  { name: 'Home', path: '/' },
  { name: 'About Me', path: '/about-me' },
  { name: 'My Projects', path: '/my-projects' },
  { name: 'Contact', path: '/contact' },
  { name: 'Resume', path: '/resume' }
]


const Menu = () => {
  return (
    <Nav>
      <ul>
      {NavList.map((item) => (
        <li key={item.name}>
          <NavLink to={item.path}>
            {item.name}
          </NavLink>
        </li>
      ))}
      </ul>

    </Nav>
  )
}


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

  a {
    text-decoration: none;
    color: white;
    position: relative;
  }

  a.no-underline {
    text-decoration: none;
    color: white;
    padding-right: 1rem;
  }

  a:not(.no-underline)::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 0;
    height: 2px;
    background-color: #f1f1f1;
    transition: width 0.3s ease;
  }

  a:not(.no-underline):hover::after {
    width: 100%; /* Expands the underline on hover */
  }

`;

export default Menu;