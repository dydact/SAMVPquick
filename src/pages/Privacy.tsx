import React from 'react';
import styled from 'styled-components';

const PrivacyContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: var(--primary);
  margin-bottom: 1rem;
`;

const Privacy: React.FC = () => {
  return (
    <PrivacyContainer>
      <Title>Privacy Policy</Title>
      <p>At SiteAware, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines our practices concerning the collection, use, and disclosure of your data.</p>
      <h2>Information We Collect</h2>
      <p>We collect information that you provide directly to us, such as when you create an account, use our services, or contact our support team. This may include your name, email address, and usage data.</p>
      <h2>How We Use Your Information</h2>
      <p>We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to comply with legal obligations.</p>
      <h2>Data Security</h2>
      <p>We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.</p>
      <h2>Your Rights</h2>
      <p>You have the right to access, correct, or delete your personal information. You may also have additional rights depending on your jurisdiction.</p>
      <p>For more detailed information about our privacy practices, please contact our privacy officer.</p>
    </PrivacyContainer>
  );
};

export default Privacy;