import { Box } from '@mui/material';
import { useLargeScreen, useSmallScreen } from '../functions/common';
import { ReactNode } from 'react';

interface PageContainerProps {
  name: string;
  children: ReactNode;
}

interface PageConfig {
  name: string;
  horizontalPadding: number;
}

export const PageContainer: React.FC<PageContainerProps> = ({ name, children }) => {
  const isLargeScreen = useLargeScreen();
  const isSmallScreen = useSmallScreen();

  const index: PageConfig[] = [
    { name: "Changelog", horizontalPadding: isSmallScreen ? 0 : 5 },
    { name: "Q&A", horizontalPadding: isSmallScreen ? 2 : 5 },
    { name: "Home", horizontalPadding: 1 },
    { name: "Contributors", horizontalPadding: isSmallScreen ? 2 : 5 },
    { name: "About", horizontalPadding: isLargeScreen ? 2 : 0 },
    { name: "Articles", horizontalPadding: isLargeScreen ? 2 : 0 },
  ];

  const config = index.find(item => item.name === name);
  const padding = config ? config.horizontalPadding : 0;

  return (
    <Box padding={padding}>
      {children}
    </Box>
  )
}
