import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: ${props => props.theme.colors.cardBg};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: ${props => props.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.2s ease;
  height: 100%;
  cursor: pointer;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1);
    transform: translateY(-2px);
  }

  &:focus-within {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }
`;

const Icon = styled.span`
  font-size: 4.5rem;
  margin-bottom: ${props => props.theme.spacing.md};
  display: inline-block;
`;

const Title = styled.h3`
  font-size: ${props => props.theme.fonts.md};
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.sm} 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
`;

const MetaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.md};
  flex-grow: 1;
  justify-content: center;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: ${props => props.theme.fonts.sm};
  font-weight: 500;
  background-color: ${props => {
    switch (props.difficulty) {
      case 'Beginner':
        return '#c6f6d5';
      case 'Intermediate':
        return '#fef3c7';
      case 'Advanced':
        return '#fca5a5';
      default:
        return props.theme.colors.surface;
    }
  }};
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
    background-color: ${props => {
      switch (props.difficulty) {
        case 'Beginner':
          return '#22543d';
        case 'Intermediate':
          return '#78350f';
        case 'Advanced':
          return '#7f1d1d';
        default:
          return props.theme.colors.surface;
      }
    }};
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
  font-size: ${props => props.theme.fonts.sm};
  color: ${props => props.theme.colors.textSecondary};
  margin-top: ${props => props.theme.spacing.sm};
`;

const CTAButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: 6px;
  cursor: pointer;
  font-size: ${props => props.theme.fonts.sm};
  font-weight: 600;
  transition: all 0.2s ease;
  width: 100%;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    transform: scale(1.02);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.3);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const GridCard = ({ topic }) => {
  return (
    <Card>
      <Icon>{topic.icon}</Icon>
      <Title>{topic.title}</Title>
      <MetaContainer>
        <Badge>{topic.category}</Badge>
        <Badge difficulty={topic.difficulty}>{topic.difficulty}</Badge>
        <Rating>⭐ {(4.5 + Math.random()).toFixed(1)}</Rating>
      </MetaContainer>
      <CTAButton>View More →</CTAButton>
    </Card>
  );
};

export default GridCard;
