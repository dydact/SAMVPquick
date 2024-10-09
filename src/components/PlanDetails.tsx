import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { Button } from './ui/elements/button';

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

const DiscountBanner = styled.div`
  background-color: var(--accent);
  color: white;
  padding: 1rem;
  text-align: center;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const SubscriberCount = styled.div`
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const planDetails = {
  essentials: {
    title: 'SiteAware Essentials',
    description: 'Perfect for small to medium-sized businesses looking to enhance their site management capabilities.',
    price: '$1,500/mo',
    discount: 'First 3 months free',
    features: [
      'Basic Analytics: Get insights into your site\'s performance with easy-to-understand metrics.',
      'Real-time Alerts: Stay informed with up to 100 daily alerts for critical events.',
      'Employee & Client Time Tracking: Efficiently manage time and resources.',
      'HIPAA Compliant Tools: Ensure your data handling meets healthcare industry standards.',
      'Email Support: Get assistance when you need it via our dedicated support email.',
      'Up to 50 users: Ideal for small to medium teams.'
    ],
    additionalInfo: 'SiteAware Essentials provides a solid foundation for businesses looking to improve their site management. With our basic analytics and real-time alerts, you\'ll always be in the know about your site\'s performance and any critical events. Our HIPAA-compliant tools ensure that you can safely handle sensitive data, making this plan perfect for healthcare-related businesses.'
  },
  pro: {
    title: 'SiteAware Pro',
    description: 'Ideal for growing businesses that need advanced features and increased capacity.',
    price: '$3,000/mo',
    discount: '10% off first year',
    features: [
      'Advanced Analytics: Dive deep into your data with customizable reports and dashboards.',
      'Unlimited Alerts: Never miss a beat with our comprehensive alert system.',
      'Camera-based Time Tracking: Enhance security and accuracy in time management.',
      'Automated Documentation: Save time and improve consistency with AI-powered documentation.',
      'AI-Powered PBX (Lite): Streamline your communication with intelligent call routing.',
      '24/7 Support: Get help anytime, day or night.',
      'Up to 100 users: Perfect for medium to large organizations.'
    ],
    additionalInfo: 'SiteAware Pro takes your site management to the next level with advanced features designed for growing businesses. Our AI-powered tools and unlimited alerts ensure you\'re always on top of your site\'s performance and security.'
  },
  enterprise: {
    title: 'SiteAware Enterprise',
    description: 'Designed for large enterprises requiring customized solutions and high-level support.',
    price: '$5,000/mo',
    discount: '5% off first year',
    features: [
      'Custom Analytics: Tailor your analytics to your specific business needs.',
      'Unlimited Alerts: Comprehensive monitoring for even the largest operations.',
      'Full AI-Powered PBX: Advanced communication system with AI-driven insights.',
      'Local LLM Deployment: Leverage the power of language models on your own infrastructure.',
      'Dedicated Support Team: Get personalized assistance from our expert support staff.',
      'Up to 200 users: Suitable for large enterprises with complex needs.'
    ],
    additionalInfo: 'SiteAware Enterprise offers a fully customizable solution for large organizations. With local LLM deployment and a dedicated support team, you\'ll have all the tools and assistance you need to manage your site at scale.'
  },
  custom: {
    title: 'SiteAware Custom',
    description: 'Tailored solutions for organizations with specific requirements and the need for complete customization.',
    price: 'Starting at $15,000/mo',
    discount: 'Custom pricing available',
    features: [
      'Custom On-site Deployment: We bring SiteAware directly to your infrastructure.',
      'Hardware & Software Solutions: Comprehensive, end-to-end systems tailored to your needs.',
      'Airgapped RAG Solution: Secure, isolated systems for the highest level of data protection.',
      'Full Data Control: Maintain complete ownership and control over your data.',
      'Tailored Enterprise Features: We build the features you need, specific to your organization.',
      'Up to 250 users: Flexible scaling for the largest and most complex organizations.'
    ],
    additionalInfo: 'SiteAware Custom is our most flexible offering, designed for organizations with unique requirements. From custom on-site deployment to airgapped solutions, we work closely with you to create a tailored system that meets your exact needs.'
  }
};

const PlanDetails: React.FC = () => {
  const { planId } = useParams<{ planId: string }>();
  const plan = planDetails[planId as keyof typeof planDetails] || planDetails.essentials;
  const [subscriberCount, setSubscriberCount] = useState(0);
  const maxSubscribers = 1000; // Set the maximum number of subscribers for the offer

  useEffect(() => {
    // Simulating subscriber count update
    const interval = setInterval(() => {
      setSubscriberCount(prevCount => {
        const newCount = prevCount + Math.floor(Math.random() * 10);
        return newCount > maxSubscribers ? maxSubscribers : newCount;
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const remainingSpots = maxSubscribers - subscriberCount;

  return (
    <PlanDetailsContainer>
      <DiscountBanner>
        50% off for the first 6 months! Limited time offer.
        <SubscriberCount>
          {remainingSpots > 0
            ? `Only ${remainingSpots} spots left!`
            : "Offer fully claimed. Stay tuned for future promotions!"}
        </SubscriberCount>
      </DiscountBanner>
      <PlanTitle>{plan.title}</PlanTitle>
      <PlanDescription>{plan.description}</PlanDescription>
      <h2>Price: {plan.price}</h2>
      <h2>Features:</h2>
      <FeatureList>
        {plan.features.map((feature, index) => (
          <FeatureItem key={index}>{feature}</FeatureItem>
        ))}
      </FeatureList>
      <h2>Why Choose {plan.title}?</h2>
      <p>{plan.additionalInfo}</p>
      <Button>Start Your Free Trial</Button>
      <BackLink to="/signup">Back to Plans</BackLink>
    </PlanDetailsContainer>
  );
};

export default PlanDetails;