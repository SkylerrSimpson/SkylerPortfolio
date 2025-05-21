import styled from "styled-components";
import { useState } from "react";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
  <>
    <AlignCenter>
      <ContactWrapper as="form" onSubmit={(e) => 
      {e.preventDefault();
      setIsSubmitted(true);  
      }}>
        <ContactHeader>
            Let's Talk
        </ContactHeader>
        <InputGroup>
          <InputWrapper>
            <Input name="firstname"
            type="text"
            placeholder="First Name *"
            required/>
          </InputWrapper>
          <InputWrapper>
            <Input name="lastname"
            type="text"
            placeholder="Last Name *"
            required/>
          </InputWrapper>
        </InputGroup>
          <InputWrapper>
              <Input name="email"
              type="email"
              placeholder="Email *"
              required/>
            </InputWrapper>

        <InputWrapper>
          <InputGroup>
            <Message name="message"
            type="text"
            placeholder="Message *"
            required/>
          </InputGroup>
        </InputWrapper>


        <SubmitButton 
          name="submit"
          type="submit"
        >
        Send Message

        </SubmitButton>

      </ContactWrapper>
      
      {isSubmitted && (
        <Submitted onClick={() => setIsSubmitted(false)}>
          <SubmitMessage onClick={() => setIsSubmitted(false)}>
           <p>Your message was sent! I will get back to you as quickly as possible. Thank you!</p>
          </SubmitMessage>
        </Submitted>

      )}

    </AlignCenter>
  </>
  )
}

const ContactWrapper = styled.div`
  display: flex;
  width:50%;
  flex-direction: column;
  @media (max-width: 900px) {
      width: 100%;
  }

`;

const SubmitMessage = styled.div`
  background-color: white;
  display:flex;
  align-self:center;
  color: black;
  padding: 1rem;
  font-family: "Kanit", sans-serif;
  font-size:1.1rem;
`

const Submitted = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  display:flex;
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const AlignCenter = styled.div`
  display:flex;
  align-items: center;
  flex-direction: column;
  padding: 5rem 2rem 2rem 2rem;
  background:rgb(26, 39, 65);
  height: 100vh;
`;

const ContactHeader = styled.div`
  display: flex;
  color: white;
  font-weight: bold;
  font-size: x-large;
  font-family: "Kanit", sans-serif;
  padding: 2rem 2rem 2rem 0.2rem;
`;

const SubmitButton = styled.button`
  border: 0.1rem solid white;
  color:white;
  background-color:rgb(24, 32, 48);
  font-weight: bold;
  height: 3rem;
  width: 200px;
  max-width:100%;
  font-family: "Kanit", sans-serif;
  cursor: pointer;
  opacity: 0.3;
  &:hover {
    opacity: 1;

  }
`

const InputWrapper = styled.div`
  padding: 0.2rem;
  border: 0.2rem white;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
`;

const InputGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  ${InputWrapper} {
    width: 49%;
  }
`;

const Message = styled.textarea`
  width: 100%;
  line-height: 1.6;
  min-height: 150px;
  background:rgb(26, 39, 65);
  color: white;
  padding:1rem;
  font-family: "Kanit", sans-serif;

  &::placeholder {
    color: white;
    opacity: 1;
    font-family: "Kanit", sans-serif;

  }
`

const Input = styled.input`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  border-radius: 0;
  background:rgb(26, 39, 65);
  border: none;
  color: white;
  border-bottom: 1px solid rgba(255, 255, 255, 0.6);
  outline: none;
  padding:1rem;
  font-family: "Kanit", sans-serif;
  
  &::placeholder {
    color: white;
    font-family: "Kanit", sans-serif;
    opacity: 1;
  }
  &:focus {
    border-bottom: 1px solid white;
  }
`;

export default Contact;