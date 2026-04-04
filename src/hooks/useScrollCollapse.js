import { useState, useEffect } from 'react';

/**
 * Hook to detect scroll position and manage collapse state
 * Returns: { isCollapsed, toggleCollapse, manualToggle }
 */
export const useScrollCollapse = (collapseThreshold = 100) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [manualToggle, setManualToggle] = useState(null); // null, true, or false

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      clearTimeout(scrollTimeout);

      // If user manually toggled, respect their choice while scrolling
      if (manualToggle !== null) {
        return;
      }

      // Auto-collapse based on scroll position
      if (window.scrollY > collapseThreshold) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }

      // Reset manual toggle after user stops scrolling
      scrollTimeout = setTimeout(() => {
        setManualToggle(null);
      }, 3000);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [manualToggle, collapseThreshold]);

  // User manually clicked toggle button
  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
    setManualToggle(!isCollapsed); // Remember user's choice
  };

  // Determine final state (manual toggle takes precedence)
  const finalIsCollapsed = manualToggle !== null ? manualToggle : isCollapsed;

  return {
    isCollapsed: finalIsCollapsed,
    toggleCollapse: handleToggle,
    isManuallyToggled: manualToggle !== null,
  };
};
