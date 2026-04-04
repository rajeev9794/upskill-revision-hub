import React from 'react';
import styled from 'styled-components';
import { MdOpenInNew } from 'react-icons/md';

const CardContainer = styled.div`
  background-color: ${props => props.theme.colors.cardBg};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: ${props => props.theme.spacing.lg};
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    background-color: ${props => props.theme.colors.cardHover};
    border-color: ${props => props.theme.colors.primary};
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.md};
  }
`;

const Icon = styled.div`
  font-size: 3rem;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.fonts.lg};
`;

const Description = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.lg};
  flex-grow: 1;
  font-size: ${props => props.theme.fonts.sm};
  line-height: 1.6;
`;

const LinksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const LinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: 8px;
  font-size: ${props => props.theme.fonts.sm};
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  cursor: pointer;
  width: fit-content;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    transform: translateX(4px);
  }

  svg {
    width: 16px;
    height: 16px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: center;
  }
`;

const Card = ({ icon, title, description, links }) => {
  return (
    <CardContainer>
      <Icon>{icon}</Icon>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <LinksList>
        {links.map((link, index) => (
          <LinkButton
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Open ${link.platform}`}
          >
            {link.platform}
            <MdOpenInNew />
          </LinkButton>
        ))}
      </LinksList>
    </CardContainer>
  );
};

export default Card;
