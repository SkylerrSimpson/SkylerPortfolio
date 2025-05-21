import { Outlet } from "react-router-dom";
import styled from 'styled-components';
import NavBar from "./NavBar";
import Footer from "./Footer";

const Root = () => {
  return (
    <>
    <NavWrapper>
      <NavBar/>
    </NavWrapper>
    <Outlet/>
    <FooterWrapper>
      <Footer />
    </FooterWrapper>
    </>

  )
}


const NavWrapper = styled.div`
  background:rgb(25, 43, 77); /* Dark background for the Nav */
  padding: 10px;
  height: 3.5rem;

  color: white;
  display: flex;
  justify-content: center;
`;

const FooterWrapper = styled.div`
  display: flex;
  background:rgb(25, 43, 77); /* Dark background for the Nav */
  color: white;
  justify-content: center;
  padding: 50px;
`;



export default Root;