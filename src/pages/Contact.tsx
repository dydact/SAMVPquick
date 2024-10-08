import React from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: var(--primary);
  margin-bottom: 1rem;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid var(--border);
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  min-height: 150px;
`;

const SubmitButton = styled.button`
  background-color: var(--primary);
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: var(--primary-dark);
  }
`;

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
  };

  return (
    <ContactContainer>
      <Title>Contact Us</Title>
      <p>We'd love to hear from you. Please fill out the form below and we'll get back to you as soon as possible.</p>
      <ContactForm onSubmit={handleSubmit}>
        <Input type="text" placeholder="Your Name" required />
        <Input type="email" placeholder="Your Email" required />
        <Input type="text" placeholder="Subject" required />
        <TextArea placeholder="Your Message" required />
        <SubmitButton type="submit">Send Message</SubmitButton>
      </ContactForm>
      <div style={{ marginTop: '2rem' }}>
        <h2>Other Ways to Reach Us</h2>
        <p><a href="mailto:noreply@dydact.io">Email</a></p>
        <p>Phone: 202-255-1624</p>
        <p>Address: 10715 Charter Drive, Suite 105, Columbia MD, 21044</p>
      </div>
    </ContactContainer>
  );
};

export default Contact;