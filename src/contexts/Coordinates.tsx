import React, { createContext, useContext, useEffect, useState } from 'react';

import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export const STORAGE_LAT = 'METHEO_STORAGE_LAT';
export const STORAGE_LON = 'METHEO_STORAGE_LON';

export type LatType = number | null;
export type LonType = number | null;
export type AuthorizeType = boolean;

export interface CoordinatesProviderProps {
  children: React.ReactNode;
}
export interface CoordinatesProvidersValues {
  lat: LatType;
  lon: LonType;
  authorize: AuthorizeType;
}

const CoordinatesContext = createContext<CoordinatesProvidersValues>({
  lon: null,
  lat: null,
  authorize: false
});

export function CoordinatesProvider({ children }: CoordinatesProviderProps) {
  const [lat, setLat] = useState<LatType>(null);
  const [lon, setLon] = useState<LonType>(null);
  const [authorize, setAuthorize] = useState<AuthorizeType>(false);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setAuthorize(true);
        setLat(position.coords?.latitude);
        setLon(position.coords?.longitude);
      },
      () => {
        setAuthorize(false);
        if (Platform.OS === 'ios') {
          Geolocation.requestAuthorization('always');
        }
        if (Platform.OS === 'android') {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
        }
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  return (
    <CoordinatesContext.Provider
      value={{
        lat,
        lon,
        authorize
      }}
    >
      {children}
    </CoordinatesContext.Provider>
  );
}

export function useCoordinates() {
  return useContext(CoordinatesContext);
}
