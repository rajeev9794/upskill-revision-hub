import { renderHook, act } from '@testing-library/react';
import { FilterProvider, useFilter } from './FilterContext';

describe('FilterContext', () => {
  const mockTopics = [
    {
      id: 'dsa',
      title: 'Data Structures & Algorithms',
      description: 'Master DSA',
      category: 'Core CS',
      difficulty: 'Intermediate',
      dateAdded: new Date(2024, 0, 15),
    },
    {
      id: 'system-design',
      title: 'System Design',
      description: 'Learn scalable systems',
      category: 'Backend',
      difficulty: 'Advanced',
      dateAdded: new Date(2024, 0, 20),
    },
    {
      id: 'oops',
      title: 'Object-Oriented Programming',
      description: 'OOP concepts',
      category: 'Core CS',
      difficulty: 'Beginner',
      dateAdded: new Date(2024, 0, 10),
    },
  ];

  const wrapper = ({ children }) => <FilterProvider>{children}</FilterProvider>;

  test('should initialize with default values', () => {
    const { result } = renderHook(() => useFilter(), { wrapper });

    expect(result.current.searchTerm).toBe('');
    expect(result.current.selectedCategory).toBe('All');
    expect(result.current.selectedDifficulty).toBe('All');
    expect(result.current.sortBy).toBe('alphabetical');
  });

  test('should filter topics by search term', () => {
    const { result } = renderHook(() => useFilter(), { wrapper });

    act(() => {
      result.current.setSearchTerm('Data');
    });

    const filtered = result.current.filterTopics(mockTopics);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe('dsa');
  });

  test('should filter topics by category', () => {
    const { result } = renderHook(() => useFilter(), { wrapper });

    act(() => {
      result.current.setSelectedCategory('Backend');
    });

    const filtered = result.current.filterTopics(mockTopics);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe('system-design');
  });

  test('should filter topics by difficulty', () => {
    const { result } = renderHook(() => useFilter(), { wrapper });

    act(() => {
      result.current.setSelectedDifficulty('Advanced');
    });

    const filtered = result.current.filterTopics(mockTopics);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe('system-design');
  });

  test('should sort topics alphabetically', () => {
    const { result } = renderHook(() => useFilter(), { wrapper });

    act(() => {
      result.current.setSortBy('alphabetical');
    });

    const filtered = result.current.filterTopics(mockTopics);
    expect(filtered[0].title).toBe('Data Structures & Algorithms');
    expect(filtered[1].title).toBe('Object-Oriented Programming');
    expect(filtered[2].title).toBe('System Design');
  });

  test('should sort topics by newest first', () => {
    const { result } = renderHook(() => useFilter(), { wrapper });

    act(() => {
      result.current.setSortBy('newest');
    });

    const filtered = result.current.filterTopics(mockTopics);
    expect(filtered[0].id).toBe('system-design');
    expect(filtered[1].id).toBe('dsa');
    expect(filtered[2].id).toBe('oops');
  });

  test('should sort topics by oldest first', () => {
    const { result } = renderHook(() => useFilter(), { wrapper });

    act(() => {
      result.current.setSortBy('oldest');
    });

    const filtered = result.current.filterTopics(mockTopics);
    expect(filtered[0].id).toBe('oops');
    expect(filtered[1].id).toBe('dsa');
    expect(filtered[2].id).toBe('system-design');
  });

  test('should apply multiple filters together', () => {
    const { result } = renderHook(() => useFilter(), { wrapper });

    act(() => {
      result.current.setSelectedCategory('Core CS');
      result.current.setSelectedDifficulty('Beginner');
    });

    const filtered = result.current.filterTopics(mockTopics);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe('oops');
  });

  test('should reset all filters', () => {
    const { result } = renderHook(() => useFilter(), { wrapper });

    act(() => {
      result.current.setSearchTerm('Data');
      result.current.setSelectedCategory('Backend');
      result.current.setSelectedDifficulty('Advanced');
      result.current.setSortBy('newest');
    });

    act(() => {
      result.current.resetFilters();
    });

    expect(result.current.searchTerm).toBe('');
    expect(result.current.selectedCategory).toBe('All');
    expect(result.current.selectedDifficulty).toBe('All');
    expect(result.current.sortBy).toBe('alphabetical');
  });

  test('should search case-insensitively', () => {
    const { result } = renderHook(() => useFilter(), { wrapper });

    act(() => {
      result.current.setSearchTerm('SYSTEM');
    });

    const filtered = result.current.filterTopics(mockTopics);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe('system-design');
  });

  test('should search in description', () => {
    const { result } = renderHook(() => useFilter(), { wrapper });

    act(() => {
      result.current.setSearchTerm('concepts');
    });

    const filtered = result.current.filterTopics(mockTopics);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe('oops');
  });
});
