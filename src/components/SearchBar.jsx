import React from 'react';
import styled from 'styled-components';
import { MdClear, MdSearch } from 'react-icons/md';
import { useFilter } from '../context/FilterContext';

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto ${props => props.theme.spacing.lg};
`;

const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled(MdSearch)`
  position: absolute;
  left: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.3rem;
  pointer-events: none;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.md} ${props => props.theme.spacing.md} 2.8rem;
  font-size: ${props => props.theme.fonts.base};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  background-color: ${props => props.theme.colors.cardBg};
  color: ${props => props.theme.colors.text};
  transition: all 0.3s ease;

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.sm} ${props => props.theme.spacing.sm} 2.5rem;
    font-size: ${props => props.theme.fonts.sm};
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: ${props => props.theme.spacing.md};
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  padding: 0;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &:active {
    transform: scale(0.95);
  }
`;

const SearchBar = () => {
  const { searchTerm, setSearchTerm, resetFilters } = useFilter();

  const handleClear = () => {
    setSearchTerm('');
  };

  const handleReset = () => {
    resetFilters();
  };

  return (
    <SearchContainer>
      <SearchInputWrapper>
        <SearchIcon />
        <SearchInput
          type="text"
          placeholder="Search topics by title or keywords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && <ClearButton onClick={handleClear}><MdClear /></ClearButton>}
      </SearchInputWrapper>
    </SearchContainer>
  );
};

export default SearchBar;
