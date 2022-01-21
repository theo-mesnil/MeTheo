import React from 'react';

import { CoordinatesProvider } from 'contexts/Coordinates';

import { Home } from 'screens/Home';

// @ts-ignore: apple watch application
import { Watch } from './components/Watch';

export function App() {
  return (
    <CoordinatesProvider>
      <Home />
      <Watch />
    </CoordinatesProvider>
  );
}
