import React, { useEffect, useState } from 'react';
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text
} from 'react-native';
import Config from 'react-native-config';
import Geolocation from 'react-native-geolocation-service';

import { Watch } from './Watch';

type Coords = {
  lat?: number;
  lon?: number;
};

const App = () => {
  const [coords, setCoords] = useState<Coords>({
    lat: undefined,
    lon: undefined
  });
  const [city, setCity] = useState();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords?.latitude,
          lon: position.coords?.longitude
        });
      },
      () => {
        // See error code charts below.
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

  const getFromApiAsync = async () => {
    try {
      // Get city name
      const responseCity = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${coords.lat}&lon=${coords.lon}&limit=1&appid=${Config.OPENWEATHER_API_KEY}`
      );
      const cityToJSon = await responseCity.json();
      setCity(cityToJSon?.[0]?.name);

      // Get data from current location
      const responseData = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${Config.OPENWEATHER_API_KEY}&lang=fr`
      );
      const dataToJson = await responseData.json();
      console.log('dataToJson', dataToJson);
    } catch (error) {
      // console.error(error);
    }
  };

  useEffect(() => {
    if (coords?.lat) {
      getFromApiAsync();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coords]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>lat : {coords?.lat}</Text>
      <Text>lon : {coords?.lon}</Text>
      <Text>city : {city}</Text>
      <Text>OPENWEATHER_API_KEY: {Config.OPENWEATHER_API_KEY}</Text>
      <Watch />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;
