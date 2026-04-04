import React, { useState } from 'react';
import styled from 'styled-components';
import { useFilter } from '../context/FilterContext';

const PanelContainer = styled.div`
  width: 280px;
  background-color: ${props => props.theme.colors.cardBg};
  border-right: 1px solid ${props => props.theme.colors.border};
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 280px;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
    transition: transform 0.3s ease;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: auto;
    border-right: none;
    border-top: 1px solid ${props => props.theme.colors.border};
    max-height: 60vh;
    transform: translateY(${props => props.isOpen ? '0' : '100%'});
    transition: transform 0.3s ease;
  }
`;

const SearchBox = styled.div`
  padding: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  position: sticky;
  top: 0;
  background-color: ${props => props.theme.colors.cardBg};
  z-index: 10;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 6px;
  background-color: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fonts.sm};
  
  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const FiltersContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${props => props.theme.spacing.md};
`;

const FilterSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding-bottom: ${props => props.theme.spacing.md};

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const SectionHeader = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  margin-bottom: ${props => props.isOpen ? props.theme.spacing.md : '0'};
  transition: all 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &:focus {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

const SectionTitle = styled.h3`
  font-size: ${props => props.theme.fonts.md};
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const ToggleIcon = styled.span`
  font-size: ${props => props.theme.fonts.base};
  transition: transform 0.2s ease;
  transform: rotate(${props => props.isOpen ? '0deg' : '-90deg'});
`;

const SectionContent = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  animation: ${props => props.isOpen ? 'slideDown' : 'slideUp'} 0.25s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      max-height: 0;
    }
    to {
      opacity: 1;
      max-height: 500px;
    }
  }

  @keyframes slideUp {
    from {
      opacity: 1;
      max-height: 500px;
    }
    to {
      opacity: 0;
      max-height: 0;
    }
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  cursor: pointer;
  user-select: none;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.surface};
  }

  &:focus-within {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${props => props.theme.colors.primary};
  border-radius: 3px;

  &:focus {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }
`;

const LabelText = styled.span`
  flex: 1;
  font-size: ${props => props.theme.fonts.sm};
  color: ${props => props.theme.colors.text};
`;

const Count = styled.span`
  font-size: ${props => props.theme.fonts.sm};
  color: ${props => props.theme.colors.textSecondary};
  font-weight: 500;
  min-width: 24px;
  text-align: right;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md};
  border-top: 1px solid ${props => props.theme.colors.border};
  margin-top: auto;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  flex: 1;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.primary ? 'transparent' : props.theme.colors.border};
  border-radius: 6px;
  background-color: ${props => props.primary ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.primary ? 'white' : props.theme.colors.text};
  font-weight: 600;
  font-size: ${props => props.theme.fonts.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    ${props => props.primary
      ? `background-color: ${props.theme.colors.secondary};`
      : `border-color: ${props.theme.colors.primary}; color: ${props.theme.colors.primary};`
    }
  }

  &:focus {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const CATEGORIES = ['Core CS', 'Backend', 'Frontend', 'DevOps', 'Full Stack', 'Tools', 'Design Patterns'];
const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];

const FilterPanel = ({ allTopics = [] }) => {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategories,
    toggleCategory,
    selectedDifficulties,
    toggleDifficulty,
    resetFilters,
    sidebarOpen,
  } = useFilter();

  const [expandedSections, setExpandedSections] = useState({
    category: true,
    difficulty: true,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Count topics by category and difficulty
  const getCategoryCount = (category) => {
    return allTopics.filter(t => t.category === category).length;
  };

  const getDifficultyCount = (difficulty) => {
    return allTopics.filter(t => t.difficulty === difficulty).length;
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleReset = () => {
    resetFilters();
    setExpandedSections({ category: true, difficulty: true });
  };

  return (
    <PanelContainer isOpen={sidebarOpen}>
      <SearchBox>
        <SearchInput
          type="text"
          placeholder="Search topics..."
          value={searchTerm}
          onChange={handleSearchChange}
          aria-label="Search topics"
        />
      </SearchBox>

      <FiltersContent>
        {/* Category Filter Section */}
        <FilterSection>
          <SectionHeader
            onClick={() => toggleSection('category')}
            aria-expanded={expandedSections.category}
          >
            <SectionTitle>📂 Category</SectionTitle>
            <ToggleIcon isOpen={expandedSections.category}>▼</ToggleIcon>
          </SectionHeader>
          <SectionContent isOpen={expandedSections.category}>
            <CheckboxGroup>
              {CATEGORIES.map(category => (
                <CheckboxLabel key={category}>
                  <Checkbox
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    aria-label={`Filter by ${category}`}
                  />
                  <LabelText>{category}</LabelText>
                  <Count>{getCategoryCount(category)}</Count>
                </CheckboxLabel>
              ))}
            </CheckboxGroup>
          </SectionContent>
        </FilterSection>

        {/* Difficulty Filter Section */}
        <FilterSection>
          <SectionHeader
            onClick={() => toggleSection('difficulty')}
            aria-expanded={expandedSections.difficulty}
          >
            <SectionTitle>📊 Difficulty</SectionTitle>
            <ToggleIcon isOpen={expandedSections.difficulty}>▼</ToggleIcon>
          </SectionHeader>
          <SectionContent isOpen={expandedSections.difficulty}>
            <CheckboxGroup>
              {DIFFICULTIES.map(difficulty => (
                <CheckboxLabel key={difficulty}>
                  <Checkbox
                    type="checkbox"
                    checked={selectedDifficulties.includes(difficulty)}
                    onChange={() => toggleDifficulty(difficulty)}
                    aria-label={`Filter by ${difficulty}`}
                  />
                  <LabelText>{difficulty}</LabelText>
                  <Count>{getDifficultyCount(difficulty)}</Count>
                </CheckboxLabel>
              ))}
            </CheckboxGroup>
          </SectionContent>
        </FilterSection>
      </FiltersContent>

      <ActionButtons>
        <Button onClick={handleReset}>Reset</Button>
      </ActionButtons>
    </PanelContainer>
  );
};

export default FilterPanel;
