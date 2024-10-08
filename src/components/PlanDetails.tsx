import React from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';

const PlanDetailsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const PlanTitle = styled.h1`
  font-size: 2.5rem;
  color: var(--primary);
  margin-bottom: 1rem;
`;

const PlanDescription = styled.p`
  font-size: 1.2rem;
  color: var(--text-muted);
  margin-bottom: 2rem;
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-top: 2rem;
  color: var(--primary);
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const planDetails = {
  essentials: {
    title: 'SiteAware Essentials',
    description: 'Perfect for small to medium-sized businesses looking to enhance their site management capabilities.',
    features: [
      'Basic Analytics: Get insights into your site\'s performance with easy-to-understand metrics.',
      'Real-time Alerts: Stay informed with up to 100 daily alerts for critical events.',
      'Employee & Client Time Tracking: Efficiently manage time and resources.',
      'HIPAA Compliant Tools: Ensure your data handling meets healthcare industry standards.',
      'Email Support: Get assistance when you need it via our dedicated support email.',
      'Up to 50 users: Ideal for small to medium teams.'
    ]
  },
  pro: {
    title: 'SiteAware Pro',
    description: 'Ideal for growing businesses that need advanced features and increased capacity.',
    features: [
      'Advanced Analytics: Dive deep into your data with customizable reports and dashboards.',
      'Unlimited Alerts: Never miss a beat with our comprehensive alert system.',
      'Camera-based Time Tracking: Enhance security and accuracy in time management.',
      'Automated Documentation: Save time and improve consistency with AI-powered documentation.',
      'AI-Powered PBX (Lite): Streamline your communication with intelligent call routing.',
      '24/7 Support: Get help anytime, day or night.',
      'Up to 100 users: Perfect for medium to large organizations.'
    ]
  },
  enterprise: {
    title: 'SiteAware Enterprise',
    description: 'Designed for large enterprises requiring customized solutions and high-level support.',
    features: [
      'Custom Analytics: Tailor your analytics to your specific business needs.',
      'Unlimited Alerts: Comprehensive monitoring for even the largest operations.',
      'Full AI-Powered PBX: Advanced communication system with AI-driven insights.',
      'Local LLM Deployment: Leverage the power of language models on your own infrastructure.',
      'Dedicated Support Team: Get personalized assistance from our expert support staff.',
      'Up to 200 users: Suitable for large enterprises with complex needs.'
    ]
  },
  custom: {
    title: 'SiteAware Custom',
    description: 'Tailored solutions for organizations with specific requirements and the need for complete customization.',
    features: [
      'Custom On-site Deployment: We bring SiteAware directly to your infrastructure.',
      'Hardware & Software Solutions: Comprehensive, end-to-end systems tailored to your needs.',
      'Airgapped RAG Solution: Secure, isolated systems for the highest level of data protection.',
      'Full Data Control: Maintain complete ownership and control over your data.',
      'Tailored Enterprise Features: We build the features you need, specific to your organization.',
      'Up to 250 users: Flexible scaling for the largest and most complex organizations.'
    ]
  }
};

const PlanDetails: React.FC = () => {
  const { planId } = useParams<{ planId: keyof typeof planDetails }>();
  const plan = planDetails[planId || 'essentials'];

  return (
    <PlanDetailsContainer>
      <PlanTitle>{plan.title}</PlanTitle>
      <PlanDescription>{plan.description}</PlanDescription>
      <h2>Features:</h2>
      <FeatureList>
        {plan.features.map((feature, index) => (
          <FeatureItem key={index}>{feature}</FeatureItem>
        ))}
      </FeatureList>
      <BackLink to="/signup">Back to Plans</BackLink>
    </PlanDetailsContainer>
  );
};

export default PlanDetails;