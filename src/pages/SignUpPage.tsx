import React from 'react';
import styled from 'styled-components';
import { Button } from '../components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: 5rem;
  padding-top: 4rem; // Add padding to push content below the banner
`;

const Title = styled.h1`
  font-size: 3rem;
  color: var(--primary);
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: var(--text-muted);
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const FeatureBox = styled.div`
  background-color: var(--background-light);
  padding: 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--primary);
  font-weight: bold;
`;

const FeatureDescription = styled.p`
  color: var(--text);
  font-weight: 500;
`;

const PlansContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
`;

const PlanCard = styled.div<{ featured?: boolean }>`
  background-color: ${props => props.featured ? 'var(--primary)' : 'var(--background-light)'};
  color: ${props => props.featured ? 'white' : 'var(--text)'};
  padding: 2rem;
  border-radius: 8px;
  width: 300px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const PlanTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const PlanPrice = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const PlanFeatures = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 1.5rem;
`;

const PlanFeature = styled.li<{ featured?: boolean }>`
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: ${props => props.featured ? 'white' : 'var(--text)'};
`;

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Only destructure the user

  const features = [
    { 
      icon: '📊', 
      title: 'Advanced Analytics', 
      description: 'Gain deep insights into your site performance with real-time data visualization, custom reports, and predictive analytics.',
      details: 'Our advanced analytics suite provides comprehensive insights into user behavior, conversion rates, and site performance. Customize dashboards, set up automated reports, and leverage machine learning for predictive analysis.',
      path: '/features/advanced-analytics'
    },
    { 
      icon: '🔔', 
      title: 'Real-time Alerts', 
      description: 'Stay informed with instant notifications for critical events, security threats, and performance issues.',
      details: 'Set up customizable alerts for various triggers including traffic spikes, security breaches, server downtime, and more. Receive notifications via email, SMS, or push notifications to your mobile device.',
      path: '/features/real-time-alerts'
    },
    { icon: '🔒', title: 'Enhanced Security', description: 'Protect your site with cutting-edge security measures' },
    { icon: '🚀', title: 'Performance Optimization', description: 'Boost your site speed and efficiency' },
    { icon: '👥', title: 'Time Tracking', description: 'Automated employee and client time tracking' },
    { icon: '📝', title: 'Automated Documentation', description: 'Schedule-based automated documentation' },
    { icon: '🏥', title: 'HIPAA Compliance', description: 'Suite of HIPAA-compliant administrative tools' },
    { icon: '📞', title: 'AI-Powered PBX', description: 'Intelligent phone system with real-time customer interaction' },
  ];

  const plans = [
    { 
      title: 'SiteAware Essentials', 
      price: '$1,500/mo', 
      features: [
        'Basic Analytics',
        'Real-time Alerts (up to 100/day)',
        'Employee & Client Time Tracking',
        'HIPAA Compliant Tools',
        'Email Support',
        'Up to 50 users'
      ],
      details: 'Perfect for small to medium-sized businesses looking to enhance their site management capabilities.',
      path: '/plans/essentials',
      discount: 'First 3 months free'
    },
    { 
      title: 'SiteAware Pro', 
      price: '$3,000/mo', 
      features: [
        'Advanced Analytics',
        'Unlimited Alerts',
        'Camera-based Time Tracking',
        'Automated Documentation',
        'AI-Powered PBX (Lite)',
        '24/7 Support',
        'Up to 100 users'
      ],
      details: 'Ideal for growing businesses that need advanced features and increased capacity.',
      path: '/plans/pro',
      discount: '10% off first year'
    },
    { 
      title: 'SiteAware Enterprise', 
      price: '$5,000/mo', 
      features: [
        'Custom Analytics',
        'Unlimited Alerts',
        'Full AI-Powered PBX',
        'Local LLM Deployment',
        'Dedicated Support Team',
        'Up to 200 users'
      ],
      details: 'Designed for large enterprises requiring customized solutions and high-level support.',
      path: '/plans/enterprise',
      discount: '5% off first year'
    },
    { 
      title: 'SiteAware Custom', 
      price: 'Starting at $15,000/mo', 
      features: [
        'Custom On-site Deployment',
        'Hardware & Software Solutions',
        'Airgapped RAG Solution',
        'Full Data Control',
        'Tailored Enterprise Features',
        'Up to 250 users'
      ],
      details: 'Tailored solutions for organizations with specific requirements and the need for complete customization.',
      path: '/plans/custom',
      discount: 'Custom pricing available'
    },
  ];

  return (
    <>
      <PageContainer>
        <Hero>
          <Title>Elevate Your Enterprise with SiteAware</Title>
          <Subtitle>Comprehensive monitoring, powerful analytics, and unmatched security for your business</Subtitle>
        </Hero>

        <FeaturesGrid>
          {features.map((feature, index) => (
            <Popover key={index}>
              <PopoverTrigger asChild>
                <FeatureBox onClick={() => navigate(feature.path)}>
                  <FeatureIcon>{feature.icon}</FeatureIcon>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </FeatureBox>
              </PopoverTrigger>
              <PopoverContent>
                <p>{feature.details}</p>
              </PopoverContent>
            </Popover>
          ))}
        </FeaturesGrid>

        <PlansContainer>
          {plans.map((plan, index) => (
            <Popover key={index}>
              <PopoverTrigger asChild>
                <PlanCard 
                  featured={plan.title === 'SiteAware Pro'}
                  onClick={() => navigate(plan.path)}
                >
                  <PlanTitle>{plan.title}</PlanTitle>
                  <PlanPrice>{plan.price}</PlanPrice>
                  <PlanFeatures>
                    {plan.features.map((feature, featureIndex) => (
                      <PlanFeature key={featureIndex} featured={plan.title === 'SiteAware Pro'}>{feature}</PlanFeature>
                    ))}
                  </PlanFeatures>
                  <Button 
                    variant={plan.title === 'SiteAware Pro' ? 'default' : 'outline'}
                  >
                    {plan.title === 'SiteAware Custom' ? 'Contact Us' : `Choose ${plan.title}`}
                  </Button>
                  <p>{plan.discount}</p>
                </PlanCard>
              </PopoverTrigger>
              <PopoverContent>
                <p>{plan.details}</p>
              </PopoverContent>
            </Popover>
          ))}
        </PlansContainer>
      </PageContainer>
      <Footer 
        isSignedIn={!!user}
        onSignIn={() => navigate('/signin')}
        onSignUp={() => navigate('/signup')}
      />
    </>
  );
};

export default SignUpPage;