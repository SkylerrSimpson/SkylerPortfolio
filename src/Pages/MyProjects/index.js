import styled from "styled-components";
import ProjectCard from "./ProjectCard";
import devfinderpic from "./devfinderlaptop.webp"
import dictapppic from "./dictapplaptop.webp"

import placeholder from "./../Home/placeholder.png"

const projects = [
  {
    title: "Dictionary",
    description: "A full-stack dictionary app using React, Node.js, and MongoDB.",
    github: 'https://github.com/SkylerrSimpson/DictionaryApp',
    demo: 'https://skylerdictionary.netlify.app/',
    devTools: ['React', 'Hooks', 'RestAPIs', 'Styled-Components', 'Context', 'Netlify', 'MongoDB'],
    backgroundColor: '#a445ed',
    preview: dictapppic
  },
  {
    title: "DevFinder",
    description: "Search, and store github accounts",
    github: 'https://github.com/SkylerrSimpson/Devfinder',
    devTools: ['React', 'Hooks', 'RestAPIs', 'Styled-Components', 'Context', 'MongoDB'],
    backgroundColor: ' #4b6a9b',
    preview: devfinderpic
  },

];

const MyProjects = () => {
  return (
    <>
    <section id="projects">
    <AlignCenter>
      <ProjectWrapper>
          <ProjectHeader>
          Recent Projects
          </ProjectHeader>
      </ProjectWrapper>
    {projects.map((project, index) => (
      <ProjectCard
        key={index}
        title={project.title}
        description={project.description}
        github={project.github}
        demo={project.demo}
        devTools={project.devTools}
        backgroundColor={project.backgroundColor}
        preview={project.preview}
      />
    ))}

    </AlignCenter>
    </section>

    </>

  )


}

const ProjectWrapper = styled.div`
  position: relative;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProjectHeader = styled.div`
  background-color: rgba(241, 236, 236, 0.24);
  font-family: "Kanit", sans-serif;
  font-weight: bold;
  font-size: xx-large;
  color: rgb(26, 39, 65);
  margin-bottom: 2rem;
  align-self: flex-start;
`;


const AlignCenter = styled.div`
  display:flex;
  flex-direction: column;
  padding: 5rem 0rem 0rem 0rem;
  background-color: white;
  align-items: center;
`;

export default MyProjects;