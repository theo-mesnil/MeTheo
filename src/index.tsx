import React from 'react';
import { ThemeProvider } from 'styled-components';

import { Box } from 'components/Box';
import { CoordinatesProvider } from 'contexts/Coordinates';
import { Navigation } from 'navigation';
import { coreTheme } from 'themes/core';

// @ts-ignore: apple watch application
import { Watch } from './components/Watch';

export function App() {
  return (
    <CoordinatesProvider>
      <ThemeProvider theme={coreTheme}>
        <Box backgroundColor="test" flex={1}>
          <Navigation />
        </Box>
        <Watch />
      </ThemeProvider>
    </CoordinatesProvider>
  );
}
