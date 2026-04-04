import React from 'react';
import styled from 'styled-components';

const MergedHeaderContainer = styled.div`
  background-color: ${props => props.theme.colors.cardBg};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  transition: all 0.3s ease;
  position: sticky;
  top: 0;
  z-index: 99;
`;

const TopBarContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.lg};
  padding: ${props => props.isCollapsed ? props.theme.spacing.xs : props.theme.spacing.sm} ${props => props.theme.spacing.md};
  flex-wrap: wrap;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${props => props.theme.spacing.md};
  }
`;

const BrandSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  min-width: fit-content;
`;

const ToggleButton = styled.button`
  appearance: none;
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.primary};
  font-size: 1.25rem;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
  
  &:hover {
    opacity: 0.7;
  }

  &:focus {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 4px;
    border-radius: 4px;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const Title = styled.h1`
  font-size: ${props => props.isCollapsed ? '1.25rem' : '1.5rem'};
  color: ${props => props.theme.colors.primary};
  margin: 0;
  font-weight: 700;
  transition: font-size 0.3s ease;
  white-space: nowrap;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: ${props => props.theme.fonts.lg};
  }
`;

const ControlsSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  flex: 1;
  justify-content: flex-end;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    gap: ${props => props.theme.spacing.sm};
  }
`;

const SubtitleBar = styled.div`
  width: 100%;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.surface};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  flex-wrap: wrap;
  font-size: ${props => props.theme.fonts.sm};
  color: ${props => props.theme.colors.textSecondary};

  &:empty {
    display: none;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SubtitleText = styled.p`
  margin: 0;
  flex: 1;
  min-width: 300px;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fonts.sm};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    min-width: auto;
    width: 100%;
  }
`;

const MergedTopBar = ({ 
  isCollapsed, 
  onToggleCollapse, 
  filteredCount, 
  totalCount,
  children // TopControlBar content
}) => {
  return (
    <>
      <MergedHeaderContainer>
        <TopBarContent isCollapsed={isCollapsed}>
          <BrandSection>
            <ToggleButton 
              onClick={onToggleCollapse}
              title={isCollapsed ? 'Expand' : 'Collapse'}
              aria-label={isCollapsed ? 'Expand header' : 'Collapse header'}
            >
              {isCollapsed ? '▼' : '▲'}
            </ToggleButton>
            <Title isCollapsed={isCollapsed}>
              UpSkill Hub
            </Title>
          </BrandSection>

          <ControlsSection>
            {children}
          </ControlsSection>
        </TopBarContent>
      </MergedHeaderContainer>

      {!isCollapsed && (
        <SubtitleBar>
          <SubtitleText>
            Master CS fundamentals with curated learning resources
          </SubtitleText>
        </SubtitleBar>
      )}
    </>
  );
};

export default MergedTopBar;
