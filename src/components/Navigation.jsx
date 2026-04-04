import React from 'react';
import styled from 'styled-components';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { useTheme } from '../context/ThemeContext';

const Nav = styled.nav`
  background-color: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const Logo = styled.h1`
  font-size: ${props => props.theme.fonts.lg};
  color: ${props => props.theme.colors.primary};
  margin: 0;
  font-weight: 700;
  letter-spacing: -0.5px;
`;

const ThemeToggle = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: ${props => props.theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.fonts.md};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.xs};
  }
`;

const Navigation = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Nav>
      <Logo>📚 UpSkill</Logo>
      <ThemeToggle onClick={toggleTheme} aria-label="Toggle theme">
        {isDark ? <MdLightMode /> : <MdDarkMode />}
      </ThemeToggle>
    </Nav>
  );
};

export default Navigation;
