import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    font-family: 'Kanit', sans-serif;
    background-color: rgba(241, 236, 236, 0.24);
  }
`;

export default GlobalStyle;