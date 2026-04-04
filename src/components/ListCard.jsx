import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background-color: ${props => props.theme.colors.cardBg};
  border: 1px solid ${props => props.theme.colors.border};
  border-bottom: none;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.md};
  transition: all 0.2s ease;
  cursor: pointer;

  &:first-child {
    border-radius: 12px 12px 0 0;
  }

  &:last-child {
    border-bottom: 1px solid ${props => props.theme.colors.border};
    border-radius: 0 0 12px 12px;
  }

  &:only-child {
    border-radius: 12px;
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }

  &:hover {
    background-color: ${props => props.theme.colors.surface};
    padding-left: calc(${props => props.theme.spacing.lg} + 4px);
  }

  &:focus-within {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: -2px;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.sm};
  }
`;

const Icon = styled.span`
  font-size: 2rem;
  flex-shrink: 0;
  margin-top: ${props => props.theme.spacing.xs};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1.5rem;
    margin-top: 0;
  }
`;

const Content = styled.div`
  flex-grow: 1;
  text-align: left;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.sm};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const TitleAndCategory = styled.div`
  flex-grow: 1;
`;

const Title = styled.h3`
  font-size: ${props => props.theme.fonts.md};
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.xs} 0;
`;

const Category = styled.span`
  display: inline-block;
  font-size: ${props => props.theme.fonts.sm};
  color: ${props => props.theme.colors.textSecondary};
  margin-right: ${props => props.theme.spacing.sm};

  &::after {
    content: ' |';
    margin-left: ${props => props.theme.spacing.xs};
  }
`;

const Description = styled.p`
  font-size: ${props => props.theme.fonts.sm};
  color: ${props => props.theme.colors.text};
  margin: ${props => props.theme.spacing.sm} 0 0 0;
  line-height: 1.5;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
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

  white-space: nowrap;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fonts.sm};
  color: ${props => props.theme.colors.textSecondary};
  margin-top: ${props => props.theme.spacing.sm};
  flex-wrap: wrap;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    gap: ${props => props.theme.spacing.sm};
  }
`;

const CTAButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  padding: 0;
  font-size: ${props => props.theme.fonts.sm};
  font-weight: 600;
  white-space: nowrap;
  text-decoration: underline;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
    text-decoration: none;
  }

  &:focus {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

const ListCard = ({ topic }) => {
  const formatDate = (date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  };

  return (
    <CardContainer>
      <Icon>{topic.icon}</Icon>
      <Content>
        <Header>
          <TitleAndCategory>
            <Title>{topic.title}</Title>
            <Category>{topic.category}</Category>
            <span>{topic.description}</span>
          </TitleAndCategory>
          <Badge difficulty={topic.difficulty}>{topic.difficulty}</Badge>
        </Header>
        <Description>{topic.description.substring(0, 100)}...</Description>
        <Meta>
          <span>Added: {formatDate(topic.dateAdded)}</span>
          <span>⭐ {(4.5 + Math.random()).toFixed(1)}/5</span>
          <span>({Math.floor(Math.random() * 300)}) reviews</span>
          <CTAButton title="View full details">View More →</CTAButton>
        </Meta>
      </Content>
    </CardContainer>
  );
};

export default ListCard;
