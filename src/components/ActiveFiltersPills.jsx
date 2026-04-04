import React from 'react';
import styled from 'styled-components';
import { useFilter } from '../context/FilterContext';

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.surface};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  align-items: center;
`;

const FilterPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  background-color: #ebf8ff;
  color: #2c5282;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: 20px;
  border: 1px solid #4299e1;
  font-size: ${props => props.theme.fonts.sm};
  font-weight: 500;

  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    background-color: #1a365d;
    color: #90cdf4;
    border-color: #4299e1;
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  padding: 0;
  font-weight: bold;
  font-size: ${props => props.theme.fonts.sm};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }

  &:focus {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
    border-radius: 50%;
  }
`;

const ClearAllButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  padding: 0;
  font-size: ${props => props.theme.fonts.sm};
  font-weight: 500;
  text-decoration: underline;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }

  &:focus {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 20px;
  background-color: ${props => props.theme.colors.border};
`;

const ActiveFiltersPills = () => {
  const {
    selectedCategories,
    selectedDifficulties,
    sortBy,
    removeFilter,
    resetFilters,
  } = useFilter();

  const hasActiveFilters = selectedCategories.length > 0 || selectedDifficulties.length > 0 || sortBy !== 'newest';

  if (!hasActiveFilters) {
    return null;
  }

  const getDifficultyLabel = (diff) => {
    const labels = {
      Beginner: 'Beginner',
      Intermediate: 'Intermediate',
      Advanced: 'Advanced',
    };
    return labels[diff] || diff;
  };

  const getSortLabel = (sort) => {
    const labels = {
      newest: 'Newest',
      oldest: 'Oldest',
      alphabetical: 'A-Z',
      'difficulty-easy': 'Easy→Hard',
      'difficulty-hard': 'Hard→Easy',
    };
    return labels[sort] || sort;
  };

  return (
    <FiltersContainer>
      {selectedCategories.map(category => (
        <FilterPill key={`cat-${category}`}>
          {category}
          <RemoveButton
            onClick={() => removeFilter('category', category)}
            title={`Remove ${category} filter`}
            aria-label={`Remove ${category} filter`}
          >
            ✕
          </RemoveButton>
        </FilterPill>
      ))}

      {selectedDifficulties.map(difficulty => (
        <FilterPill key={`diff-${difficulty}`}>
          {getDifficultyLabel(difficulty)}
          <RemoveButton
            onClick={() => removeFilter('difficulty', difficulty)}
            title={`Remove ${difficulty} filter`}
            aria-label={`Remove ${difficulty} filter`}
          >
            ✕
          </RemoveButton>
        </FilterPill>
      ))}

      {sortBy !== 'newest' && (
        <FilterPill>
          {getSortLabel(sortBy)}
          <RemoveButton
            onClick={() => removeFilter('sort', sortBy)}
            title={`Remove sort filter`}
            aria-label={`Remove sort filter`}
          >
            ✕
          </RemoveButton>
        </FilterPill>
      )}

      {hasActiveFilters && (
        <>
          <Divider />
          <ClearAllButton onClick={resetFilters} title="Clear all filters">
            Clear All
          </ClearAllButton>
        </>
      )}
    </FiltersContainer>
  );
};

export default ActiveFiltersPills;
