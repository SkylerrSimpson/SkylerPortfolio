import styled from 'styled-components';
// import placeholder from '../Pages/Home/placeholder.png';
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram, FaXTwitter } from "react-icons/fa";

const links = [
  {
    icon: <FaGithub />,
    url: "https://github.com/SkylerrSimpson"
  },
  {
    icon: <FaLinkedin />,
    url: "https://www.linkedin.com/in/skyler-simpson1/"
  },
  {
    icon: <FaInstagram />,
    url:  "https://www.instagram.com/skyler_simpson/"
  },
  {
    icon: <FaEnvelope  />,
    url:  "mailto:skylerrsimpson@gmail.com"
  },

];

const Footer = () => {
  return (
    <div>
      <span style={{display: 'flex', justifyContent: 'center'}}>
       © Copyright 2025 - Skyler Simpson
      </span>
      <LinksWrapper>
      {links.map((link, index) => (
        <IconLink href={link.url} target="_blank" rel="noopener noreferrer" key={index}>
          {link.icon}
        </IconLink>
      ))}

      </LinksWrapper>


    </div>
  )
};


const IconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: white;
  color: black;
  height: 4rem;
  width: 4rem;
  font-size: 2rem;
  transition: transform 0.2s ease, background-color 0.2s ease;

  &:hover {
    transform: scale(1.1);
    background-color: #e0e0e0;
  }
`;


const LinksWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
  gap: 1rem;
`;

export default Footer;