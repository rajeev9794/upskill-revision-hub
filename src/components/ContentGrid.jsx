import React from 'react';
import styled from 'styled-components';
import { useFilter } from '../context/FilterContext';
import GridCard from './GridCard';
import ListCard from './ListCard';
import CompactCard from './CompactCard';

const Container = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.md};
    padding: ${props => props.theme.spacing.md};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    gap: ${props => props.theme.spacing.sm};
    padding: ${props => props.theme.spacing.sm};
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.spacing.lg};
  gap: 0;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.md};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.sm};
  }
`;

const CompactGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(4, 1fr);
    gap: ${props => props.theme.spacing.sm};
    padding: ${props => props.theme.spacing.md};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${props => props.theme.spacing.xs};
    padding: ${props => props.theme.spacing.sm};
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
  padding: ${props => props.theme.spacing.xl};

  h3 {
    color: ${props => props.theme.colors.text};
    margin-bottom: ${props => props.theme.spacing.md};
  }

  p {
    margin: 0;
    font-size: ${props => props.theme.fonts.sm};
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.lg};
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const PaginationButton = styled.button`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.primary};
  background-color: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.primary};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 600;
  font-size: ${props => props.theme.fonts.sm};

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.primary};
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }
`;

const ContentGrid = ({ topics, loading = false }) => {
  const { viewMode } = useFilter();
  const [currentPage, setCurrentPage] = React.useState(1);

  const itemsPerPage = viewMode === 'grid' ? 12 : viewMode === 'list' ? 5 : 24;
  const totalPages = Math.ceil(topics.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTopics = topics.slice(startIndex, endIndex);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [viewMode, topics.length]);

  if (loading) {
    return (
      <Container>
        <EmptyState>
          <p>Loading topics...</p>
        </EmptyState>
      </Container>
    );
  }

  if (topics.length === 0) {
    return (
      <Container>
        <EmptyState>
          <h3>No topics found</h3>
          <p>Try adjusting your filters to see more results.</p>
        </EmptyState>
      </Container>
    );
  }

  const renderContent = () => {
    switch (viewMode) {
      case 'list':
        return (
          <ListContainer>
            {currentTopics.map(topic => (
              <ListCard key={topic.id} topic={topic} />
            ))}
          </ListContainer>
        );

      case 'compact':
        return (
          <CompactGridContainer>
            {currentTopics.map(topic => (
              <CompactCard key={topic.id} topic={topic} />
            ))}
          </CompactGridContainer>
        );

      case 'grid':
      default:
        return (
          <GridContainer>
            {currentTopics.map(topic => (
              <GridCard key={topic.id} topic={topic} />
            ))}
          </GridContainer>
        );
    }
  };

  return (
    <Container>
      {renderContent()}
      {totalPages > 1 && (
        <PaginationContainer>
          <PaginationButton
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            ◄ Prev
          </PaginationButton>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <PaginationButton
                key={pageNum}
                active={currentPage === pageNum}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </PaginationButton>
            );
          })}

          <PaginationButton
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next ►
          </PaginationButton>
        </PaginationContainer>
      )}
    </Container>
  );
};

export default ContentGrid;
