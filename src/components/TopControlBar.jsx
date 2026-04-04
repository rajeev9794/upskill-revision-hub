import React from 'react';
import styled from 'styled-components';
import { useFilter } from '../context/FilterContext';

const ControlBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  flex-wrap: wrap;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    gap: ${props => props.theme.spacing.sm};
    width: 100%;
  }
`;

const FilterToggleBtn = styled.button`
  background: none;
  border: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: 6px;
  cursor: pointer;
  font-size: ${props => props.theme.fonts.base};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.surface};
    border-color: ${props => props.theme.colors.primary};
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
    font-size: ${props => props.theme.fonts.sm};
  }
`;

const ResultsInfo = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fonts.sm};
  white-space: nowrap;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 0.75rem;
  }
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    gap: 4px;
  }
`;

const SortLabel = styled.label`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fonts.sm};
  white-space: nowrap;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: none;
  }
`;

const SortSelect = styled.select`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 6px;
  background-color: ${props => props.theme.colors.cardBg};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fonts.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.xs} 6px;
    font-size: 0.75rem;
  }
`;

const ViewToggleGroup = styled.div`
  display: flex;
  gap: 4px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 6px;
  padding: 2px;
  background-color: ${props => props.theme.colors.surface};
  margin-left: auto;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-left: 0;
  }
`;

const ViewButton = styled.button`
  background: none;
  border: none;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  cursor: pointer;
  border-radius: 4px;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fonts.base};
  font-weight: ${props => props.active ? '600' : '400'};
  background-color: ${props => props.active ? props.theme.colors.cardBg : 'transparent'};
  border: 1px solid ${props => props.active ? props.theme.colors.primary : 'transparent'};
  transition: all 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &:focus {
    outline: none;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.xs} 6px;
    font-size: 0.875rem;
  }
`;

const Spacer = styled.div`
  flex: 1;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex: initial;
    width: 100%;
  }
`;

const TopControlBar = ({ filteredCount = 0, totalCount = 0 }) => {
  const { viewMode, setViewMode, sidebarOpen, setSidebarOpen, sortBy, setSortBy } = useFilter();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleViewChange = (newMode) => {
    setViewMode(newMode);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <ControlBar>
      <FilterToggleBtn onClick={toggleSidebar} title={sidebarOpen ? 'Hide filters' : 'Show filters'}>
        <span>≡</span>
        <span>Filter</span>
      </FilterToggleBtn>

      <ResultsInfo>
        Showing {filteredCount}
        {totalCount > filteredCount && ` of ${totalCount}`}
      </ResultsInfo>

      <Spacer />

      <SortContainer>
        <SortLabel htmlFor="sort-select">Sort:</SortLabel>
        <SortSelect id="sort-select" value={sortBy} onChange={handleSortChange}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="difficulty-easy">Difficulty (Easy→Hard)</option>
          <option value="difficulty-hard">Difficulty (Hard→Easy)</option>
        </SortSelect>
      </SortContainer>

      <ViewToggleGroup role="group" aria-label="View mode">
        <ViewButton
          active={viewMode === 'grid'}
          onClick={() => handleViewChange('grid')}
          title="Grid view"
          aria-pressed={viewMode === 'grid'}
        >
          ◧
        </ViewButton>
        <ViewButton
          active={viewMode === 'list'}
          onClick={() => handleViewChange('list')}
          title="List view"
          aria-pressed={viewMode === 'list'}
        >
          ▦
        </ViewButton>
        <ViewButton
          active={viewMode === 'compact'}
          onClick={() => handleViewChange('compact')}
          title="Compact view"
          aria-pressed={viewMode === 'compact'}
        >
          ≡
        </ViewButton>
      </ViewToggleGroup>
    </ControlBar>
  );
};

export default TopControlBar;
