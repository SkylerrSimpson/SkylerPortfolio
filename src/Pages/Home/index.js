import styled from "styled-components";
import { useEffect, useState } from "react";
import AboutMe from "../AboutMe";
import MyProjects from "../MyProjects";

const Home =  () => {
  const [displayedText, setDisplayedText] = useState('');
  const [displayedText2, setDisplayedText2] = useState('');
  const [isTypingTop, setIsTypingTop] = useState(false);
  const [isTypingBottom, setIsTypingBottom] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const intro_text = "Hello, I'm Skyler.";
    let index = 0;

    const timer = setInterval( () => {
      if (index <= intro_text.length) {
        setDisplayedText(intro_text.slice(0, index)); // after every interation, take the beginning letter to the current letter
        index++;
        setIsTypingTop(true);
      } else {
        clearInterval(timer);
        setIsTypingTop(false);

        setTimeout(() => {
          const sub_text = "Welcome to my website.";
          let index2 = 0;
          const timer2 = setInterval(() => {
            setIsTypingBottom(true);

            if (index2 <= sub_text.length) {
              setDisplayedText2(sub_text.slice(0, index2));
              index2++;
            } else {
              setTimeout(() => {
                setIsTypingBottom(false);
              }, 6000); // after 6000 ms, the cursor will go away
              setFadeIn(true);

              clearInterval(timer2);

            }
          }, 100); // types in 100ms intervals
        }, 400);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>

    <AlignCenter>
      <HomeBox>

        <HomeTextGroup>

        <HomeTextBox>
          <span>
          {displayedText}
          {isTypingTop && <Cursor>|</Cursor>}
          </span>
        </HomeTextBox>
        
        <HomeTextBox style={{paddingTop: 0, fontSize: 50}}>
          <span>
          {displayedText2}
          {isTypingBottom && <Cursor>|</Cursor>}
          </span>
        </HomeTextBox>

        </HomeTextGroup>

    </HomeBox>
    <ArrowBox $fadeIn={fadeIn}>

      <span style={{marginBottom: "10px", fontWeight: 'bold', fontFamily: "sans-serif" }}> About me </span>
      <Arrow></Arrow>
    </ArrowBox>
    </AlignCenter>
    <AboutMe/>
    <MyProjects/>

  </div>
  )

}

const AlignCenter = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 2rem 0rem 2rem;
  background:rgb(26, 39, 65);
  height: 95vh;
  justify-content: space-between;
  position: relative;
  
  @media (max-height: 820px) {
      height: 125vh;
  }
`;

const HomeBox = styled.div`
  padding: 2rem 5rem 5rem 5rem;
  display: flex;
  flex-direction:row;
  justify-content: space-between;

`;

const HomeTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  align-items: center;
`;

const HomeTextBox = styled.div`
  font-family: "Kanit", sans-serif;
  color: white;
  font-size: 5rem;
  padding: 2.5rem 2.5rem 0.5rem 2rem;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Cursor = styled.span`
  font-weight: bold;
  color: white;
  animation: blink 1.5s step-end infinite;

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
`;

const Arrow = styled.div`
  color: white;
  height:50px;
  width:1px;
  background-color:white;

`
const ArrowBox = styled.div`
  display: flex;
    position: absolute;
  flex-direction: column;
  align-items: center;
   transform: translateX(-50%);
  bottom: 0rem;
  color: white;  
  font-family: "Kanit", sans-serif;
  opacity: ${(props) => (props.$fadeIn ? 1 : 0)};
  transition: opacity 1.5s ease-in;
  @media (max-width: 768px) {
    transform: translateX(5px);
  }
`

export default Home;