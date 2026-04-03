import React from 'react';
import styled from 'styled-components';
import { useFilter } from '../context/FilterContext';

const FilterContainer = styled.div`
  background-color: ${props => props.theme.colors.cardBg};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const FilterGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: inline-block;
    width: 48%;
    margin-right: 2%;
    margin-bottom: ${props => props.theme.spacing.md};

    &:nth-child(even) {
      margin-right: 0;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: block;
    width: 100%;
    margin-right: 0;
  }
`;

const FilterLabel = styled.label`
  display: block;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.fonts.sm};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SelectInput = styled.select`
  width: 100%;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fonts.base};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 6px;
  background-color: ${props => props.theme.colors.cardBg};
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
  }

  option {
    background-color: ${props => props.theme.colors.cardBg};
    color: ${props => props.theme.colors.text};
  }
`;

const FilterButtonsWrapper = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  flex-wrap: wrap;
  margin-top: ${props => props.theme.spacing.lg};
  padding-top: ${props => props.theme.spacing.lg};
  border-top: 1px solid ${props => props.theme.colors.border};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const ResetButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: ${props => props.theme.fonts.sm};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.textSecondary};
    color: white;
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const ResultsText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fonts.sm};
  margin-left: auto;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-left: 0;
  }
`;

const FilterPanel = ({ totalResults }) => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedDifficulty,
    setSelectedDifficulty,
    sortBy,
    setSortBy,
    resetFilters,
  } = useFilter();

  return (
    <FilterContainer>
      <FilterGroup>
        <FilterLabel htmlFor="category-select">Category</FilterLabel>
        <SelectInput
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Core CS">Core CS</option>
          <option value="Backend">Backend</option>
          <option value="Design Patterns">Design Patterns</option>
        </SelectInput>
      </FilterGroup>

      <FilterGroup>
        <FilterLabel htmlFor="difficulty-select">Difficulty Level</FilterLabel>
        <SelectInput
          id="difficulty-select"
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
        >
          <option value="All">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </SelectInput>
      </FilterGroup>

      <FilterGroup>
        <FilterLabel htmlFor="sort-select">Sort By</FilterLabel>
        <SelectInput
          id="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="alphabetical">Alphabetical (A-Z)</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </SelectInput>
      </FilterGroup>

      <FilterButtonsWrapper>
        <ResetButton onClick={resetFilters}>Reset All Filters</ResetButton>
        {totalResults !== undefined && (
          <ResultsText>{totalResults} topic{totalResults !== 1 ? 's' : ''} found</ResultsText>
        )}
      </FilterButtonsWrapper>
    </FilterContainer>
  );
};

export default FilterPanel;
