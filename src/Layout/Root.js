import { Outlet } from "react-router-dom";
import styled from 'styled-components';
import Menu from "./Menu";

const Root = () => {
  return (
    <>
    <MenuWrapper>
      <Container>
        <Menu/>
      </Container>
    </MenuWrapper>
    <Outlet/>
    </>

  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;  
`;

const MenuWrapper = styled.div`
  background: #282c34; /* Dark background for the menu */
  padding: 10px;
  height: 3.5rem;

  color: white;
  display: flex;
  justify-content: center;
`;



export default Root;