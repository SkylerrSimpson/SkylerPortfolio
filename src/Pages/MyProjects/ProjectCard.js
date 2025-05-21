import styled from "styled-components";
import placeholder from "../Home/placeholder.png"

const ProjectCard = ( {title, description, github, demo, backgroundColor, devTools, preview} ) => {


  return (
    <>

    <ProjectWrapper backgroundColor={backgroundColor} >
      <ProjectDetails>
        <div>
        <ProjectHeader>{title}</ProjectHeader>
        <MobileImageContainer>
          <ProjectPicture src={preview}/>

        </MobileImageContainer>
        <ProjectDesc>{description}</ProjectDesc>

        <ButtonWrapper>
            {github && (
              <StyledLink href={github} target="_blank" rel="noopener noreferrer">
                GitHub
              </StyledLink>
            )}
            {demo && (
              <StyledLink href={demo} target="_blank" rel="noopener noreferrer">
                Live Demo
              </StyledLink>
            )}

        </ButtonWrapper>



        </div>
        <div style={{paddingTop:'2rem'}}>
          <DevToolsHeader>Development Tools</DevToolsHeader>

          <Tools>

            {devTools.map((tool, index) =>(
                <ToolTag key={index}>+ {tool}</ToolTag>
            ))}
          </Tools>
        </div>


      </ProjectDetails>

      <DesktopImageContainer>
        <ProjectPicture src={preview}/>
      </DesktopImageContainer>



    </ProjectWrapper>

    </>
  )
}

const ProjectWrapper = styled.div`
  background-color: ${(props) => props.backgroundColor || '#ffffff'};
  display: flex;
  flex-direction: row;
  width:100%;
  @media (max-width: 1000px) {
    justify-content: center;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding:0rem 5rem 0rem 5rem;

`

const ProjectHeader = styled.header`
  font-weight: bolder;
  color: white;
    padding: 3.5rem 5rem 1rem 5rem;

  font-size: 2.5rem ;
`

const ProjectDesc = styled.p`
  color: white;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  padding:0rem 5rem 0rem 5rem;

`;

const DevToolsHeader = styled.header`
  font-weight: bolder;
  color: white;
  padding:0rem 5rem 1rem 5rem;
  font-size: 1.3rem ;

`;

const ProjectDetails = styled.div`
  flex-basis: 35%;
  display: flex;
  flex-direction: column;
  padding: 0rem 0rem 0rem 2rem
`;

const ProjectPictureContainer = styled.div`
    padding-top: 2rem;
    flex-basis: 65%;
    justify-content: center;
    align-items: center;
`;

const ProjectPicture = styled.img`
  width: 100%;
  max-width: 1000px;
  min-width: 250px;

  height: auto;
  max-height: 90%;
  object-fit: contain;
  @media (max-width: 390px) {
    transform: translateX(-15px);
  }
`;

const StyledLink = styled.a`
  background-color: transparent;
  color: white;
  padding: 0.75rem 1.5rem;
  border: 1px solid white;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  margin-right: 1rem;
  transition: all 0.3s ease;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    border: 1px solid wheat;
    color: wheat;
    box-shadow: 0 0 10px 3px rgba(255, 255, 255, 0.6);
    text-shadow: none;
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.4);
  }
`;


const Tools = styled.div`

  display: flex;
  flex-wrap: wrap;
  gap:0rem;
  padding:0rem 5rem 2.5rem 5rem;
  color:white;
  flex-direction: column;
  width: 25%;
  font-size: 1.05rem;

`

const ToolTag = styled.span`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0.3rem 0.6rem;
  white-space: nowrap;
`;

const DesktopImageContainer = styled(ProjectPictureContainer)`
  display: flex;
  @media (max-width: 1000px) {
    display: none;
    
  }
`;

const MobileImageContainer = styled(ProjectPictureContainer)`
  display: none;

  @media (max-width: 1000px) {
    display: flex;

  }
`;

export default ProjectCard;