import React from 'react';
import styled from 'styled-components';

const LegalContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: var(--primary);
  margin-bottom: 1rem;
`;

const Legal: React.FC = () => {
  return (
    <LegalContainer>
      <Title>Legal Information</Title>
      <h2>Terms of Service</h2>
      <p>By using SiteAware, you agree to comply with and be bound by the following terms and conditions of use. Please review these terms carefully.</p>
      <h2>Acceptable Use Policy</h2>
      <p>SiteAware services may be used for lawful purposes only. You agree not to use SiteAware to conduct any unlawful activity or to violate any applicable local, state, national, or international law or regulation.</p>
      <h2>Intellectual Property</h2>
      <p>The SiteAware platform, including its original content, features, and functionality, is owned by SiteAware and is protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
      <h2>Disclaimer of Warranties</h2>
      <p>SiteAware is provided "as is" without any warranties, expressed or implied. We do not warrant that the service will be error-free or uninterrupted.</p>
      <p>For full legal documentation, please contact our legal department.</p>
    </LegalContainer>
  );
};

export default Legal;