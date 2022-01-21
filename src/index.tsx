import React from 'react';

import { Setup } from 'Setup';

import { CoordinatesProvider } from 'contexts/Coordinates';

export function App() {
  return (
    <CoordinatesProvider>
      <Setup />
    </CoordinatesProvider>
  );
}
