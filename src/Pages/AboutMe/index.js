import styled from "styled-components";
import pic from './skyler guy.jpg';

const AboutMe = () => {
  return (
    <>
    <section id="about-me">
      <AlignCenter>
        <AboutMeWrapper>

            <AboutMeHeader>
                About Me
            </AboutMeHeader>

            <HeaderWrapper>
                <ImageTextBox>
                 <PersonalPhoto src={pic}/>


                  <TextBox>
                    <span style={{ paddingBottom: 25 }}>
                    Hi, I'm Skyler Simpson — a student at Western Washington University (WWU) with a passion for programming, health & fitness, technology, and anything that challenges my brain.
                    </span>
                   <span style={{ paddingBottom: 25 }}>
                    I’ve always been drawn to creating things, and programming gives me the freedom to build whatever I imagine — limited only by my current understanding. The endless opportunities for learning in this field have completely captivated me, turning programming into one of my favorite hobbies.
                  </span>
                  </TextBox>


                </ImageTextBox>
                <TextBox>
                  
               
                  <span style={{ paddingBottom: 25 }}>
                    My journey into computer science started in June 2023, when I took my first programming course in Python. I was immediately hooked by the creative freedom that coding allows. Since then, I’ve pursued the major intensely, focusing entirely on computer science and math, and I’m on track to complete it in just two years. Along the way, I’ve learned Java, C, C++, and more.
                  </span>

                  <span style={{ paddingBottom: 25 }}>
                    The most pivotal point in my academic path was a web development bootcamp I took through WWU. There, I mastered the fundamentals of HTML, CSS, and JavaScript. I also got hands-on experience with frameworks like React.js and backend technologies like Node.js. That course confirmed my passion for web development, and I’ve been honing my skills ever since in my free time.
                  </span>


                </TextBox>
                
              



            </HeaderWrapper>
          
        </AboutMeWrapper>
       


      </AlignCenter>

    </section>


    </>
  )
}
const PersonalPhoto = styled.img`
  margin: 0rem 3rem 1rem 0rem;
  border-radius: 5rem;
  width: 25rem;
  height: 25rem;
  align-self: center;
  max-width: 100%;
  @media (max-width: 980px) {
    width: 15rem;
    height: 15rem;
    margin: 0 1rem 1rem 1rem;
  }
`;

const ImageTextBox = styled.div`
  display: flex;
  color: rgb(26, 39, 65);
  font-family: "Kanit", sans-serif;
  font-size: large;
  width: 100%;
  flex-direction: row;

  @media (max-width: 1520px) {
    font-size: medium;
    flex-direction: column;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;



const AboutMeWrapper = styled.div`
  position: relative;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  width: 100%;
  margin-bottom: 2rem;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const AlignCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem;
  @media (max-width: 768px) {
    padding: 2rem;
  }

  background-color: rgba(241, 236, 236, 0.24);
`;

const AboutMeHeader = styled.div`
  background-color: rgba(241, 236, 236, 0.24);
  font-family: "Kanit", sans-serif;
  font-weight: bold;
  font-size: xx-large;
  color: rgb(26, 39, 65);
  margin-bottom: 2rem;
  align-self: flex-start;

  @media (max-width: 768px) {
    font-size: x-large;
    align-self: center;
  }
`;

const TextBox = styled.div`
  display: flex;
  color: rgb(26, 39, 65);
  font-family: "Kanit", sans-serif;
  font-size: large;
  width: 100%;
  flex-direction: column;

  @media (max-width: 768px) {
    font-size: medium;
  }
`;

export default AboutMe;