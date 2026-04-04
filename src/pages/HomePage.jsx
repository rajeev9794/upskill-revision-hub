import React, { useEffect } from 'react';
import styled from 'styled-components';
import FilterPanel from '../components/FilterPanel';
import TopControlBar from '../components/TopControlBar';
import ActiveFiltersPills from '../components/ActiveFiltersPills';
import ContentGrid from '../components/ContentGrid';
import topicsData from '../data/topicsData';
import { useFilter } from '../context/FilterContext';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const Header = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.surface};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fonts.xlarge};
  color: ${props => props.theme.colors.primary};
  margin: 0 0 ${props => props.theme.spacing.sm} 0;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: ${props => props.theme.fonts.lg};
  }
`;

const Subtitle = styled.p`
  font-size: ${props => props.theme.fonts.base};
  color: ${props => props.theme.colors.textSecondary};
  margin: 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: ${props => props.theme.fonts.sm};
  }
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const SidebarBackdrop = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: ${props => props.isOpen ? 'block' : 'none'};
  }
`;

const FilterSidebar = styled.div`
  width: 280px;
  background-color: ${props => props.theme.colors.cardBg};
  border-right: 1px solid ${props => props.theme.colors.border};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  transition: all 0.3s ease;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    display: ${props => props.shouldShow ? 'flex' : 'none'};
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 280px;
    z-index: 200;
    border-right: 1px solid ${props => props.theme.colors.border};
    border-top: none;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    position: fixed;
    left: 0;
    right: 0;
    top: auto;
    bottom: 0;
    width: 100%;
    max-height: 60vh;
    border-top: 1px solid ${props => props.theme.colors.border};
    border-right: none;
    margin-top: auto;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding-bottom: 60vh;
  }
`;

const HomePage = () => {
  const { filterTopics, sidebarOpen, setSidebarOpen } = useFilter();
  const filteredTopics = filterTopics(topicsData);

  // Close sidebar when clicking backdrop on tablet/mobile
  const handleBackdropClick = () => {
    setSidebarOpen(false);
  };

  // Handle resize to hide sidebar on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setSidebarOpen]);

  return (
    <PageContainer>
      {/* Header */}
      <Header>
        <Title>UpSkill Revision Hub</Title>
        <Subtitle>Master CS fundamentals with curated learning resources</Subtitle>
      </Header>

      {/* Control Bar */}
      <TopControlBar filteredCount={filteredTopics.length} totalCount={topicsData.length} />

      {/* Active Filters */}
      <ActiveFiltersPills />

      {/* Main Content Area */}
      <MainContent>
        {/* Sidebar Backdrop (for mobile/tablet) */}
        <SidebarBackdrop isOpen={sidebarOpen} onClick={handleBackdropClick} />

        {/* Sidebar */}
        <FilterSidebar shouldShow={sidebarOpen}>
          <FilterPanel allTopics={topicsData} />
        </FilterSidebar>

        {/* Content Grid */}
        <ContentArea>
          <ContentGrid topics={filteredTopics} />
        </ContentArea>
      </MainContent>
    </PageContainer>
  );
};

export default HomePage;
