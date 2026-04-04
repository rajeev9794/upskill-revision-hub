import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};

export const FilterProvider = ({ children }) => {
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [sortBy, setSortBy] = useState('newest');

  // UI states
  const [viewMode, setViewMode] = useState('grid'); // grid, list, compact
  const [sidebarOpen, setSidebarOpen] = useState(true); // desktop sidebar visibility
  const [showMobileFilters, setShowMobileFilters] = useState(false); // mobile filter modal

  // Track active filters for display
  const getActiveFilters = () => {
    const active = [];
    selectedCategories.forEach(cat => active.push({ type: 'category', value: cat }));
    selectedDifficulties.forEach(diff => active.push({ type: 'difficulty', value: diff }));
    active.push({ type: 'sort', value: sortBy });
    return active;
  };

  // Remove specific filter
  const removeFilter = (type, value) => {
    if (type === 'category') {
      setSelectedCategories(selectedCategories.filter(c => c !== value));
    } else if (type === 'difficulty') {
      setSelectedDifficulties(selectedDifficulties.filter(d => d !== value));
    }
  };

  // Toggle category selection (allow multiple)
  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  // Toggle difficulty selection (allow multiple)
  const toggleDifficulty = (difficulty) => {
    setSelectedDifficulties(prev =>
      prev.includes(difficulty) ? prev.filter(d => d !== difficulty) : [...prev, difficulty]
    );
  };

  const filterTopics = (topics) => {
    let filtered = topics.filter(topic => {
      // Search filter
      const matchesSearch =
        topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(topic.category);

      // Difficulty filter
      const matchesDifficulty =
        selectedDifficulties.length === 0 || selectedDifficulties.includes(topic.difficulty);

      return matchesSearch && matchesCategory && matchesDifficulty;
    });

    // Sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'difficulty-easy':
        {
          const diffOrder = { Beginner: 1, Intermediate: 2, Advanced: 3 };
          filtered.sort((a, b) => diffOrder[a.difficulty] - diffOrder[b.difficulty]);
        }
        break;
      case 'difficulty-hard':
        {
          const diffOrder = { Beginner: 1, Intermediate: 2, Advanced: 3 };
          filtered.sort((a, b) => diffOrder[b.difficulty] - diffOrder[a.difficulty]);
        }
        break;
      default:
        break;
    }

    return filtered;
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedDifficulties([]);
    setSortBy('newest');
  };

  const value = {
    // Filter states
    searchTerm,
    setSearchTerm,
    selectedCategories,
    setSelectedCategories,
    toggleCategory,
    selectedDifficulties,
    setSelectedDifficulties,
    toggleDifficulty,
    sortBy,
    setSortBy,
    
    // UI states
    viewMode,
    setViewMode,
    sidebarOpen,
    setSidebarOpen,
    showMobileFilters,
    setShowMobileFilters,
    
    // Filter operations
    filterTopics,
    resetFilters,
    removeFilter,
    getActiveFilters,
  };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};
