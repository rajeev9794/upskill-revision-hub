import React from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import topicsData from '../data/topicsData';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xxl} ${props => props.theme.spacing.lg};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fonts.large};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: ${props => props.theme.fonts.xlarge};
  }
`;

const Subtitle = styled.p`
  font-size: ${props => props.theme.fonts.md};
  color: ${props => props.theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.8;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: ${props => props.theme.fonts.base};
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: ${props => props.theme.spacing.md};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.md};
  }
`;

const HomePage = () => {
  return (
    <Container>
      <Header>
        <Title>Welcome to UpSkill Revision Hub 🎓</Title>
        <Subtitle>
          Your one-stop destination to master core computer science concepts. Curated resources for Data Structures,
          System Design, Object-Oriented Programming, and SOLID Principles.
        </Subtitle>
      </Header>

      <CardsGrid>
        {topicsData.map(topic => (
          <Card
            key={topic.id}
            icon={topic.icon}
            title={topic.title}
            description={topic.description}
            links={topic.links}
          />
        ))}
      </CardsGrid>
    </Container>
  );
};

export default HomePage;
