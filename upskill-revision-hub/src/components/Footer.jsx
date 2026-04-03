import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.surface};
  border-top: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.xxl};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const SectionTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fonts.md};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Link = styled.a`
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: ${props => props.theme.fonts.sm};

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: ${props => props.theme.spacing.xl};
  padding-top: ${props => props.theme.spacing.lg};
  border-top: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fonts.sm};
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <Section>
          <SectionTitle>📚 About UpSkill</SectionTitle>
          <p>A curated revision hub for developers to master DSA, System Design, OOP, and SOLID principles.</p>
        </Section>

        <Section>
          <SectionTitle>Quick Links</SectionTitle>
          <Link href="#dsa">Data Structures & Algorithms</Link>
          <Link href="#system-design">System Design</Link>
          <Link href="#oops">Object-Oriented Programming</Link>
          <Link href="#solid">SOLID Principles</Link>
        </Section>

        <Section>
          <SectionTitle>Resources</SectionTitle>
          <Link href="https://leetcode.com" target="_blank" rel="noopener noreferrer">
            LeetCode
          </Link>
          <Link href="https://www.geeksforgeeks.org" target="_blank" rel="noopener noreferrer">
            GeeksforGeeks
          </Link>
          <Link href="https://medium.com" target="_blank" rel="noopener noreferrer">
            Medium
          </Link>
        </Section>
      </FooterContent>

      <Copyright>
        <p>&copy; {currentYear} UpSkill Revision Hub. All rights reserved.</p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
