import styled from "styled-components";
import resumePreview from "./Resume-Website.jpg";
import resumeDownload from "./Resume-Website.pdf";
import { useState } from "react";
import { HiDownload } from "react-icons/hi";

const Resume = () => {
const [isModalOpen, setModalOpen] = useState(false);

  return (
  <>
    <ResumeWrapper>
       <PreviewContainer>
        <PreviewImage
          src={resumePreview}
          alt="Resume Preview"
          onClick={() => setModalOpen(true)}
        />
        <OverlayText>Click to Zoom</OverlayText>
      </PreviewContainer>

      <DownloadLink href={resumeDownload} download>
        <div style={{display:'flex', flexDirection: 'row'}}>
          Download Resume (PDF)
          <HiDownload style={{
            width:'50px',
            height:'20px'
          }}/>
        </div>

      </DownloadLink>

      {isModalOpen && (
        <Modal onClick={() => setModalOpen(false)}>
          <ModalImage src={resumePreview} alt="Zoomed Resume" />
        </Modal>
      )}


    </ResumeWrapper>
  </>
  )


}
const ResumeWrapper = styled.div`
  padding: 2rem;
  text-align: center;
  color: white;
  height: 95vh;
  background-color: rgb(26, 39, 65);
  @media (max-width: 520px) {
    display:flex;
    justify-content: center;
    flex-direction: column;

  }
`;

const PreviewContainer = styled.div`
  position: relative;
  width: 500px;
  margin: auto;
  cursor: pointer;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 565px) {
    width:250px;
  }
`;

const PreviewImage = styled.img`
  width: 100%;
  border: 2px solid white;
  border-radius: 8px;
`;

const OverlayText = styled.div`
  position: absolute;
  bottom: 8px;
  left: 0;
  right: 0;
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
  font-size: 0.9rem;
  padding: 0.5rem;
  border-radius: 0 0 8px 8px;
`;

const DownloadLink = styled.a`
  display: inline-block;
  margin-top: 1.5rem;
  color: white;
  background-color: #007bff;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(78, 71, 71, 0.65);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  border: 2px solid white;
  border-radius: 8px;
`;
export default Resume;