import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: ${props => props.theme.colors.cardBg};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  padding: ${props => props.theme.spacing.md};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 140px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.1);
  }

  &:focus-within {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    min-height: 120px;
  }
`;

const Icon = styled.span`
  font-size: 2.5rem;
  margin-bottom: ${props => props.theme.spacing.sm};
  display: inline-block;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

const Title = styled.h3`
  font-size: ${props => props.theme.fonts.sm};
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.xs} 0;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
  line-height: 1.2;
`;

const MetaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
  flex-grow: 1;
  justify-content: center;
`;

const MetaInfo = styled.span`
  font-size: 0.7rem;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.2;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 0.65rem;
  }
`;

const DifficultyLabel = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  color: ${props => {
    switch (props.difficulty) {
      case 'Beginner':
        return '#22543d';
      case 'Intermediate':
        return '#78350f';
      case 'Advanced':
        return '#7f1d1d';
      default:
        return props.theme.colors.text;
    }
  }};

  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    color: ${props => {
      switch (props.difficulty) {
        case 'Beginner':
          return '#9ae6b4';
        case 'Intermediate':
          return '#fcd34d';
        case 'Advanced':
          return '#fca5a5';
        default:
          return props.theme.colors.text;
      }
    }};
  }
`;

const Rating = styled.div`
  font-size: 0.7rem;
  color: ${props => props.theme.colors.textSecondary};
  font-weight: 600;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 0.65rem;
  }
`;

const CTAButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  padding: 0;
  font-size: 0.7rem;
  font-weight: 600;
  text-decoration: underline;
  margin-top: ${props => props.theme.spacing.xs};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
    text-decoration: none;
  }

  &:focus {
    outline: 1px solid ${props => props.theme.colors.primary};
    outline-offset: 1px;
    border-radius: 2px;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 0.65rem;
  }
`;

const getDifficultyAbbrev = (difficulty) => {
  const abbrevs = {
    Beginner: 'Beg',
    Intermediate: 'Int',
    Advanced: 'Adv',
  };
  return abbrevs[difficulty] || difficulty;
};

const getCategoryAbbrev = (category) => {
  const abbrevs = {
    'Core CS': 'Core',
    Backend: 'Back',
    Frontend: 'Front',
    DevOps: 'DevOps',
    'Full Stack': 'Stack',
    Tools: 'Tools',
  };
  return abbrevs[category] || category.substring(0, 4);
};

const CompactCard = ({ topic }) => {
  return (
    <Card>
      <Icon>{topic.icon}</Icon>
      <Title title={topic.title}>{topic.title.substring(0, 12)}...</Title>
      <MetaContainer>
        <DifficultyLabel difficulty={topic.difficulty}>
          {getDifficultyAbbrev(topic.difficulty)}
        </DifficultyLabel>
        <MetaInfo>{getCategoryAbbrev(topic.category)}</MetaInfo>
        <Rating>⭐ {(4.5 + Math.random()).toFixed(1)}</Rating>
        <CTAButton title="View more details">More→</CTAButton>
      </MetaContainer>
    </Card>
  );
};

export default CompactCard;
