import React, { createContext, useContext, useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';

import Geolocation from 'react-native-geolocation-service';

import { errorLog } from 'utils/logger';

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

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setAuthorize(true);
        } else {
          setAuthorize(false);
        }
      } catch (error) {
        errorLog(error);
      }
    }

    if (Platform.OS === 'ios') {
      try {
        const granted = await Geolocation.requestAuthorization('always');
        if (granted === 'granted') {
          setAuthorize(true);
        } else {
          setAuthorize(false);
        }
      } catch (error) {
        errorLog(error);
      }
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    if (authorize) {
      Geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords?.latitude);
          setLon(position.coords?.longitude);
        },
        (error) => {
          errorLog(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  }, [authorize]);

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
