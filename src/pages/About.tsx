import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: var(--primary);
  margin-bottom: 1rem;
`;

const About: React.FC = () => {
  return (
    <AboutContainer>
      <Title>About SiteAware</Title>
      <p>SiteAware is a cutting-edge site management platform designed to empower businesses of all sizes. Our mission is to provide comprehensive, user-friendly tools that enhance site performance, security, and productivity.</p>
      <h2>Our Story</h2>
      <p>Founded in 2023, SiteAware emerged from a vision to simplify complex site management tasks. Our team of experienced developers and industry experts came together with a shared goal: to create a platform that makes advanced site management accessible to everyone.</p>
      <h2>Our Values</h2>
      <ul>
        <li>Innovation: We constantly push the boundaries of what's possible in site management.</li>
        <li>Reliability: Our customers depend on us, and we take that responsibility seriously.</li>
        <li>Security: We prioritize the protection of our clients' data and infrastructure.</li>
        <li>User-Centric Design: We believe powerful tools should also be easy to use.</li>
      </ul>
    </AboutContainer>
  );
};

export default About;